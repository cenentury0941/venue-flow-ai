import os
import sys
import socket
import signal
import logging
import logging.handlers
import configparser
    
import socketio
import requests
try:
    http_session = requests.Session()
    http_session.verify = False
    sio = socketio.Client(http_session=http_session)
    sio.connect("https://localhost:10000")
    sio.emit("Postprocessor_Info" , "Venue Flow Postprocessor has connected")
except Exception as e:
    logger.info(str(e))

if getattr(sys, "frozen", False):
    script_location = os.path.dirname(sys.executable)
elif __file__:
    script_location = os.path.dirname(__file__)
sys.path.append(os.path.join(script_location, "../nxai-utilities/python-utilities"))
import communication_utils


CONFIG_FILE = os.path.join(script_location, "..", "etc", "socket.plugin.ini")

LOG_FILE = os.path.join(script_location, "..", "etc", "socket.plugin.log")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - example - %(message)s",
    filename=LOG_FILE,
    filemode="w",
)

Postprocessor_Name = "venueflow-Postprocessor"

Postprocessor_Socket_Path = "/tmp/venueflow-postprocessor.sock"

def config():
    logger.info("Reading configuration from:" + CONFIG_FILE)

    try:
        configuration = configparser.ConfigParser()
        configuration.read(CONFIG_FILE)

        configured_log_level = configuration.get(
            "common", "debug_level", fallback="INFO"
        )
        set_log_level(configured_log_level)

        for section in configuration.sections():
            logger.info("config section: " + section)
            for key in configuration[section]:
                logger.info("config key: " + key + " = " + configuration[section][key])

    except Exception as e:
        logger.error(e, exc_info=True)

    logger.debug("Read configuration done")


def set_log_level(level):
    try:
        logger.setLevel(level)
    except Exception as e:
        logger.error(e, exc_info=True)


def signal_handler(sig, _):
    logger.info("Received interrupt signal: " + str(sig))
    sys.exit(0)


def main():
    server = communication_utils.startUnixSocketServer(Postprocessor_Socket_Path)
    
    warn_timeout = 0
    alert_timeout = 0
    previous_count = 0
    previous_log = dict()

    while True:
        logger.debug("Waiting for input message")

        try:
            input_message, connection = communication_utils.waitForSocketMessage(server)
            logger.debug("Received input message")
        except socket.timeout:
            continue

        input_object = communication_utils.parseInferenceResults(input_message)

        if "BBoxes_xyxy" not in input_object:
            input_object["BBoxes_xyxy"] = {}
        
        try:
            number_of_people = len(input_object["BBoxes_xyxy"]["person"])//4
            warning_threshold = int(input_object["ExternalProcessorSettings"]["externalprocessor.warning"])
            alert_threshold = int(input_object["ExternalProcessorSettings"]["externalprocessor.alert"])
            camera_name = input_object["ExternalProcessorSettings"]["externalprocessor.camera"]
            
            if previous_log.get(camera_name) == None:
                previous_log[camera_name] = []
            
            if number_of_people > 0:
                sio.emit("Postprocessor_People_Count" , (number_of_people , warning_threshold , alert_threshold , camera_name))
            
            if number_of_people >= warning_threshold and number_of_people < alert_threshold and warn_timeout == 0:
                sio.emit("Postprocessor_Warn" , "Warning! Possible unsafe crowding at " + camera_name)
                warn_timeout = 300
            else:
                warn_timeout = (warn_timeout-1) if warn_timeout > 0 else 0
            
            
            if number_of_people >= alert_threshold and alert_timeout == 0:
                sio.emit("Postprocessor_Alert" , "Alert! Alert! Unsafe crowding at " + camera_name)
                alert_timeout = 150
            else:
                alert_timeout = (alert_timeout-1) if alert_timeout > 0 else 0
            
            previous_log[camera_name].insert(0, number_of_people)
            previous_log[camera_name] = previous_log[camera_name][:15]
            previous_count = number_of_people if number_of_people > 0 else previous_count
            
        except Exception as e:
            logger.info(str(e))

        output_message = communication_utils.writeInferenceResults(input_object)

        communication_utils.sendMessageOverConnection(connection, output_message)


if __name__ == "__main__":
    logger = logging.getLogger(__name__)

    config()

    logger.info("Initializing example plugin v0002")
    
    logger.debug("Input parameters: " + str(sys.argv))

    if len(sys.argv) > 1:
        Postprocessor_Socket_Path = sys.argv[1]
    signal.signal(signal.SIGINT, signal_handler)
    try:
        main()
    except Exception as e:
        logger.error(e, exc_info=True)
