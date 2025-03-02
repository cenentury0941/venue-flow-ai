import getCookie from "../cookie";
import { devices_url } from "../urls";

function getDevices(updateDevices) {
    console.log(document.cookie)
    fetch(devices_url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getCookie("x-runtime-guid")}`, 
            'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            updateDevices([])
            console.log('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            if(data.error)
                {  
                    console.log("Error")
                    updateDevices([])
                }
                else{            
                    console.log(data)
                    updateDevices(data)
                }
          console.log('Response data devices:', data);
        })
        .catch((error) => {
          updateDevices([])
          console.error('Error during POST request:', error);
        });
  }

export {getDevices}