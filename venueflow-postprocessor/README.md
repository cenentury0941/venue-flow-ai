VenueFlow-Postprocessor
==================

## Requirements to compile the postprocessor

These applications can be compiled on any architecture natively in a Linux environment.

To compile, some software packages are required. These can be installed by running:

```shell
sudo apt install cmake
sudo apt install g++
sudo apt install python3-pip
sudo apt install python3.12-venv
```

## Requirements to run the postprocessor

These applications can be run on any platform on which they can be compiled.

# How to use

cd into the directory.

Prepare the *build* directory in the project directory, and switch to the build directory.

```shell
mkdir -p build
cd build
```

Set up a python virtual environment in the newly created build directory (on recent ubuntu servers this is required).

```shell
python3 -m venv integrationsdk
source integrationsdk/bin/activate
pip install "python-socketio[client]"
```

Set up CMake configuration:

```shell
cmake ..
```

Build all targets:

```shell
cmake --build .
```

## Install the pre/postprocessors

Before installing make sure the target directory is writable.

```shell
sudo chmod 777 /opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/
sudo chmod 777 /opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/preprocessors/
```

To install the generated postprocessor to the default postprocessors folder:

```shell
cmake --build . --target install
```

## Defining the postprocessor

Create a configuration file at `/opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/external_postprocessors.json` and add the details of your the postprocessor to the root object of that file:

```json
{
    "externalPostprocessors": [
        {
            "Name":"venueflow-Postprocessor",
            "Command":"/opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/venueflow-postprocessor-python",
            "SocketPath":"/tmp/venueflow-postprocessor.sock",
            "ReceiveInputTensor": false,
            "Settings": [
                {
                    "type": "TextField",
                    "name": "externalprocessor.camera",
                    "caption": "Camera Name",
                    "description": "Name of the Camera",
                    "defaultValue": ""
                },
                {
		    "type": "SpinBox",
		    "name": "externalprocessor.warning",
		    "caption": "Warning Threshold",
		    "description": "Threshold to show warnings",
		    "defaultValue": 10,
		    "minValue": 0,
		    "maxValue": 300,
		    "isActive": false
		},
                {
		    "type": "SpinBox",
		    "name": "externalprocessor.alert",
		    "caption": "Alert Threshold",
		    "description": "Threshold to show alerts",
		    "defaultValue": 20,
		    "minValue": 0,
		    "maxValue": 300,
		    "isActive": false
		}
            ]
        }
    ]
}
```

## Restarting the server

Finally, to (re)load your new postprocessor, make sure to restart the NX Server with:

```shell
sudo service networkoptix-metavms-mediaserver restart
```

You also want to make sure the postprocessor can be used by the NX AI Manager (this is the mostly same command as earlier)

```shell
sudo chmod -R a+x /opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/
```

## Selecting to the postprocessor

If the postprocessor is defined correctly, its name should appear in the list of postprocessors in the NX Cloud Pipelines UI. If it is selected in the pipeline settings then the NxAI Manager will send data to the pre/postprocessor and wait for its output.

# Troubleshooting

## Failed to load Python shared library

If you encounter a bug similar to the following:

```
[PYI-1002328:ERROR] Failed to load Python shared library '/tmp/_MEIse5hvf/libpython3.x.so': dlopen: /tmp/_MEIse5hvf/libpython3.x.so: cannot open shared object file: No such file or directory
```

This is due to a bug in PyInstaller. PyInstaller is used in this repository only for demonstrative purposes, and is not strictly necessary or even the best tool for your project.

It is often sufficient to recompile the postprocessor by running:
```shell
cmake --build .
```
