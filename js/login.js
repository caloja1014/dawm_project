var boton = document.getElementById("btnIniciar");

boton.onclick = function(){
    let user = document.getElementById("username").value
    let pass = document.getElementById('password').value
    
    if(user == "admin" && pass=="admin"){
        document.getElementById("errorLogin").style.display="none";
        window.open("ControlPanel.html","_self")
    }else{
        document.getElementById("username").value="";
        document.getElementById("password").value="";
        document.getElementById("errorLogin").style.display="block";
    }

};