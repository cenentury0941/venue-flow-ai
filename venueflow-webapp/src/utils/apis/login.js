import { login_url , users_url } from "../urls";

function login(data, onLoginEvent){
    fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            onLoginEvent( { loginState : "ERROR" , errorString : "Sorry, there was a network error." } )
            console.log('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if(data.error)
            {
                onLoginEvent( { loginState : "ERROR" , errorString : data.errorString } )
            }
            else{
                onLoginEvent( { loginState : "SUCCESS" , loginData : data } )
                document.cookie = `x-runtime-guid=${data.token};  path=/`; 
                console.log("TOCKEN : " , data.token)
            }
            console.log('Response data login:', data);
        })
        .catch((error) => {
          onLoginEvent( { loginState : "ERROR" , errorString : "Sorry, there was an unexpected error." } )
          console.error('Error during POST request:', error);
        });
}

function isLoggedIn(onLoginEvent) {
    fetch(users_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            onLoginEvent( { loginState : "START" } )
            console.log('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            if(data.error)
                {
                    onLoginEvent( { loginState : "START" } )
                }
                else{
                    onLoginEvent( { loginState : "SUCCESS" , loginData : data } )
                }
          console.log('Response data isloggedin:', data);
        })
        .catch((error) => {
          onLoginEvent( { loginState : "START" } )
          console.log('Error during POST request:', error);
        });
  }

function logout(onLogout) {
    fetch(login_url+"/current", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            onLogout("FAIL")
            console.log('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            onLogout("SUCCESS")
            console.log('Response data logout:', data);
        })
        .catch((error) => {
            onLogout("FAIL")
          console.error('Error during POST request:', error);
        });
}
  

export { login , isLoggedIn, logout }