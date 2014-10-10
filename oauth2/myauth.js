var googleAuth = new OAuth2('google', {
    client_id: '246585209934-sqeonngs0adji7n6afba7krqrgl6uvds.apps.googleusercontent.com',
    client_secret: 'DTgLOo3PXz4JlnlpSvS4OO8I',
    api_scope: 'https://www.googleapis.com/auth/userinfo.email'
});

googleAuth.authorize(function() {

    // We should now have googleAuth.getAccessToken() returning a valid token value for us 
    // Create an XMLHttpRequest to get the email address 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var parseResult = JSON.parse(xhr.responseText);
                    // The email address is located naw: 
                    var email = parseResult["email"];
                    chrome.storage.local.set({'email' : email.split('@')[0]})
                    console.log("Login succesfull");
                }
            }
        }
        // Open it up as GET, POST didn't work for me for the userinfo 
    xhr.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo", true);
    // Set the content & autherization 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', "OAuth " + googleAuth.getAccessToken());
    xhr.send(null);
    // Debugging stuff so we can see everything in the xhr.  Do not leave this in production code 

});
