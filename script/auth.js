// Funtion to login
async function login(formData = {}){
    
    if(Object.entries(formData).length === 0)                                               // Return if the object is empty
        return;

    
    try {                                                                                   // !! Try/catch block (exception handling) to send data to login enpoint
        const response = await fetch("http://localhost:8080/users/api/signin", {                                     // !! DONE: API call for Authentication
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
      
        if(response.ok){                                                                    // If response status == 200 (ok)
            const result = await response.json();
            const token = result.token;                                                   
            const user = decodeUser(token);                                                 // decode the token for the role 
            
            window.localStorage.setItem(_USERTOKEN, token);                                 // Store the string in localStorage with the key 'usertoken'
            
            const adminStatus = user.roles.some(role => role.authority === 'ADMIN');        // !! Find "ADMIN" authority from token's roles
            
            if(adminStatus)                                                                 // !! This example only look for "ADMIN" authority
                window.location = index.html;                                               // Redirect the user to adminpage
            else                                                                            // !! Other authority will be deemed as user
                window.location = index.html;                                               // Redirect the user to homepage
        }
        
        return;                                                                             // Else return false

    } catch (error) {
        console.log("Exception error gotten is: ", error.message);
        return;
    }
    
}

// Function to logout
function logout(logout){
    window.localStorage.removeItem(_USERTOKEN);                                             // Store the string in localStorage with the key 'token'
    window.location = _HOME_URL;                                                            // Redirect the user to homepage
}

async function register(formData = {}){

    if(Object.entries(formData).length == 0)
        return;

    /* We are are sending 
        - name
        - email
        - password
        - role (it must be passed only by our web site)
        - Spring Boot help us take care of CSRF Cross-site Referece Forgery
    */

    try {
        
        const response = await fetch(_ENDPOINT_REGISTER, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })

        if(response.ok){
            window.location = _LOGIN_URL;
        }

    } catch (error) {
        console.log("Exception error gotten is:", error.message);
    }

}