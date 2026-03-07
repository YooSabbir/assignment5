document.getElementById("signin").addEventListener("click", function () {
    const userInput = document.getElementById("username");
    const username = userInput.value;
    console.log(username)
    const passInput = document.getElementById("password");
    const password = passInput.value;
    console.log(password)
    if(username === "admin" && password === "admin123"){
        alert("login successful");
        window.location.assign("./home.html");
    } else{
        alert("login failed");
        return;
    }
})