function getOrCreateDeviceID() {
    let deviceID = localStorage.getItem("deviceID");

    if (!deviceID) {
        deviceID = crypto.randomUUID(); // Generates a unique UUID
        localStorage.setItem("deviceID", deviceID);
    }

    return deviceID;
}

export default getOrCreateDeviceID;