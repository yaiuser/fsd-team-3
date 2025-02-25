// Function to authenticate the user via site's JWT token
function isAuthenticated(){
    const token = window.localStorage.getItem(_USERTOKEN);

    const expired = isTokenExpired(token);

    if (expired) 
        return;

    return token;
    
}

// Function to check if the token has expired
function isTokenExpired(token) {                                    

    if (!token) return true;                                        // Return true if token passed in is undefined 

    const payload = JSON.parse(atob(token.split('.')[1]));          // Decode the JWT token (a base64-encoded JSON payload)

    const expirationTime = payload.exp;                             // Get the expiration time from the token payload

    const currentTime = Math.floor(Date.now() / 1000);              // Current time in seconds

    return expirationTime < currentTime;                            // Return true ONLY when currentTime is LESS THAN token's expirationTime
}

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
                window.location = _DASHBOARD_URL;                                               // Redirect the user to adminpage
            else                                                                            // !! Other authority will be deemed as user
                window.location = _DASHBOARD_URL;                                               // Redirect the user to homepage

            return true;
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
    window.location = _LOGOUT_URL;                                                            // Redirect the user to homepage
}

function decodeUser(token){                                         
    
    // Extract authenticated username from the token
    const arrToken = token.split(".");                              
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const username = decodedToken.sub;
    const roles = decodedToken.roles;
    return {username: username, roles: roles};

}

