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
            
            window.localStorage.setItem("usertoken", token);                                 // Store the string in localStorage with the key 'usertoken'
            
            const adminStatus = user.roles.some(role => role.authority === 'ADMIN');        // !! Find "ADMIN" authority from token's roles
            
            if(adminStatus)                                                                 // !! This example only look for "ADMIN" authority
                window.location = "dashboard.html";                                               // Redirect the user to adminpage
            else                                                                            // !! Other authority will be deemed as user
                window.location = "dashboard.html";                                               // Redirect the user to homepage

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
    window.localStorage.removeItem("usertoken");                                             // Store the string in localStorage with the key 'token'
    window.location = login.html;                                                            // Redirect the user to homepage
}

function decodeUser(token){                                         
    
    // Extract authenticated username from the token
    const arrToken = token.split(".");                              
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const username = decodedToken.sub;
    const roles = decodedToken.roles;
    return {username: username, roles: roles};

}