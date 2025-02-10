let spinner = null;

// EventListener to instantiate the navController
document.addEventListener("DOMContentLoaded", async (event) => {
    
    /*
     * *********************************************************************
     * Instantiate an instance of the siteMenu
     * *********************************************************************
    */
    const navController = new NavController("navbarNav");
    navController.displayNav();

    /*
     * *********************************************************************
     * Instantiate a spinner, currently used in login.html
     * *********************************************************************
    */
    spinner = new Spinner();
    
    /*
    * *********************************************************************
    * Process Profile Info.
    * *********************************************************************
    */
    const profilePageExists = window.location.pathname.includes(_PROFILE_URL);              // If _PROFILE_URL exists
    const adminPageExists = window.location.pathname.includes(_ADMIN_URL);                  // If _ADMIN_URL exists

    if(adminPageExists || profilePageExists){                                               // If _ADMIN_URL exists, adminPageExists = true
        
        const token = isAuthenticated();                                            
        
        if(!token)                                                                          // Authenticate the user       
            window.location = _HOME_URL;                                                    // Redirect admin to index.html if token does not exist
         
        const toastElement = document.getElementById("msg-toast");                          // Get the toast element - msg-toast
        const toastBodyElement = document.getElementById("msg-toast-body");                 // Get the toast element - msg-toast-body
        const btnUpdateProfile = document.getElementById("btnUpdateProfile");               // Get the update button element - btnUpdateProfile
        const profileName = document.getElementById("txtName");                             // Get the txtName element
        const profileEmail = document.getElementById("txtEmail");                           // Get the txtEmail element
        const profilePassword = document.getElementById("txtPassword");                     // Get the txtPassword element
        const displayName = document.getElementById("spanDisplayName");                     // Get the spanDisplayName element (for USER only)

        const updateStatus = window.location.href.match(/updated=([^&]*)/);                 // Check if querystring update is found

        if(updateStatus !== null)                                                           // If querystring is present, (profile is updated)
        {
            if(updateStatus[1] === "true"){                             
                showToast({toastElement,                                                    // Querystring updated is set to true
                    toastBodyElement, 
                    bgColor:"success", msg: "Profile Updated."});
                    
                btnUpdateProfile.setAttribute("disabled", true);                            // Disable the update button
                btnUpdateProfile.className = "btn btn-success";                             // Change colour of update button
                btnUpdateProfile.innerText = "Profile Updated";                             // Update the text for update button
                const btnUpdateChecked = document.createElement("i");                       // Create an icon for the check box
                btnUpdateChecked.className = "fa fa-check pe-2";                            // Set the Check icon (font awesome)
                btnUpdateProfile.prepend(btnUpdateChecked)                                  // Prepend the icon to btnUpdateProfile

                profileName.setAttribute("disabled", true);                                 // Disable txtName
                profileName.classList.add("bg-success-subtle");                             // Change colour of txtName

                profileEmail.setAttribute("disabled", true);                                // Disable txtEmail
                profileEmail.classList.add("bg-success-subtle");                            // Change colour of txtName

                profilePassword.setAttribute("disabled", true);                             // Disable txtPassword
                profilePassword.classList.add("bg-success-subtle");                         // Change colour of txtName

            }else{                                                                          // Querystring updated is set to false
                showToast({toastElement,
                    toastBodyElement, 
                    bgColor:"danger", msg: "Something went wrong. Try again."});
            }
        }

        const response = await fetch(_ENDPOINT_PROFILE, {                                   // !! DONE: API call to get the profile info.
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,                                         // !! Send the bearer token to allow server-side authentication
                "Content-Type": "application/json"
            }
        });
      
        if(response.ok){                                                                    // If response status == 200 (ok)
            const user = await response.json();                                             // Obtain JSON response to display authenticated user

            if(!user.name){                                                                 // If the user did not enter a name
                profileName.setAttribute("placeholder", "Enter your name here.");           // Set a placeolder for the name
            }else{
                const formattedName = user.name.charAt(0).toUpperCase()                     // Otherwise, display user's name (capitalise 1st letter)
                + user.name.slice(1).toLowerCase();

                if(displayName){                                                            // !! IMPORTANT: only applies for USER role
                    displayName.classList.add("fw-bold");
                    displayName.innerText = formattedName;
                }

                profileName.value = formattedName;
            }
            
            profileEmail.value = user.email;                                                // Display user's email (login username)
            profilePassword.value = user.password;                                          // Display user's password (encoded)
            
            if(btnUpdateProfile)
                btnUpdateProfile.addEventListener("click", (event)=>{                      // addEventListener that updates the profile
                    handleUpdateProfile(event, token, toastElement, toastBodyElement, {
                        name: profileName.value,
                        email: profileEmail.value,
                        password: profilePassword.value
                    });            
            });
        }
    }

    return;

});

/*
* *********************************************************************
* Process Profile Update
* IMPORTANT: refresh the page to use a renewed 'usertoken'
* *********************************************************************
*/
async function handleUpdateProfile(event, token, toastElement, toastBodyElement, formData = {}){
    
    event.preventDefault();
    document.getElementById("formProfile").classList.add('was-validated');                  // Update bootstrap validation status for the update form

    if(Object.entries(formData).length === 0)                                               // Return if the form is empty
    return;

    if(isEmpty(formData.name)){                                                             // Trap empty input txtEmail - isEmpty()
        showToast({toastElement, 
                toastBodyElement,
                bgColor: "danger", msg: "Name must not be empty."});
        return;
    }

    if(isEmpty(formData.password)){                                                         // Trap empty input txtPassword - isEmpty()
        showToast({toastElement, 
                toastBodyElement,
                bgColor: "danger", msg: "Password cannot be empty."});
        return;
    }
    
    if(!isEmail(formData.email)){                                                           // Trap invalid email for txtEmail - isEmail()
        showToast({toastElement, 
                toastBodyElement, 
                bgColor:"danger", msg: "Email is invalid."});
        return;
    }

    try {                                                                                   // !! Try/catch block (exception handling) to send data to login enpoint
        spinner.createSpinner("btnUpdateProfile");                                          // Create the spinner, apply it to btnLogin
        spinner.displaySpinner(true);
        
        const response = await fetch(_ENDPOINT_UPDATEPROFILE, {                             // !! DONE: API call for update profile
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,                                         // !! Send the bearer token to allow server-side authentication
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
      
        if(response.ok){                                                                    // If response status == 200 (ok)
            const result = await response.json();
            const newToken = result.token;                                                   

            // console.log(result);
            window.localStorage.removeItem(_USERTOKEN);                                     // !! IMPORTANT: Clear old 'usertoken'
            window.localStorage.setItem(_USERTOKEN, newToken);                              // !! IMPORTANT: Store the latest 'usertoken'

            const path = window.location.href.split('?')[0];                                // get the current location without the querystring
            const url = path + "?updated=true";                                             // append the querystring with updated=true
            window.location = url;                                                          // refresh the current web page
        }else{
            const err = await response.json();                                              // obtain the error response
            throw err;                                                                      // throw error if unable to perform fetch request
        }

    } catch (err) {
        console.log("Exception error gotten is: ", err.error);
        
        const path = window.location.href.split('?')[0];                                    // get the current location without the querystring
        const url = path + "?updated=false";                                                // append the querystring with updated=false
        window.location = url;                                                              // refresh the current web page
        return;
    }
}