// Function to authenticate the user via site's JWT token
function isAuthenticated(){
    const token = window.localStorage.getItem(_USERTOKEN);

    const expired = isTokenExpired(token);

    if (expired) 
        return;

    return token;
    
}