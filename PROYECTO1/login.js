let bdn=JSON.parse(localStorage.getItem("miBDp"));
if (!bdn || bdn==undefined ){
    bdn={datos:[]}
    var admin = {
        nombre: "Dafne",
        telefono: "0000000000",
        correo: "dafne@ucol.mx",
        password: "1234",
        deuda: 0,
        deudaux: 0,
        pago: 0,
        rol: "admin",
    };
    bdn.datos.push(admin);
    localStorage.setItem("miBDp",JSON.stringify(bdn));
}


function login()
{
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;

    if( telefono == "" || password == "" )
    {
        return alert("No puede dejar espacios vacios");
    }
    let user = verificar(telefono,password);
    if(user == null)
        return;
    localStorage.setItem('sesion' , JSON.stringify(user));

    if(user.rol == "admin")
    {
        location.replace("index.html")
    }
    else{
        location.replace("cliente.html");
    }
}

function verificar(telefono, password)
{
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));
    
    for(let user of usuarios.datos)
    {
        if( user.telefono == telefono && user.password == password )
        {
            return user;
        }
    }
    alert("Los datos no son correctos");
    return null;
}

function redireccionar()
{
    let usuario=JSON.parse(localStorage.getItem("sesion"));

    if( !(!usuario || usuario == null) )
    {
        if(usuario.rol == "admin")
        {
            location.replace("index.html")
        }
        else
        {
            location.replace("cliente.html")
        }
    }
}

let usuario = redireccionar();

