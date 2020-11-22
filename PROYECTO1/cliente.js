function redireccionar()
{
    let usuario=JSON.parse(localStorage.getItem("sesion"));

    if(!usuario || usuario == null)
    {
        location.replace("login.html");
    }
    if(usuario.rol=="admin")
    {
        location.replace("index.html")
    }
    return usuario;
}

function mostrar_datos()
{
    document.getElementById("titulo-cliente").innerHTML+= " " + usuario.nombre;
    let info = document.getElementById("info_cliente");
    let control_pagos=JSON.parse(localStorage.getItem("control_pagos"));
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));

    info.innerHTML = "";


    control_pagos.control.forEach(pago => {
        usuarios.datos.forEach(persona => {
             
            if(usuario.nombre == pago.nombre)
            {
                if(persona.nombre == usuario.nombre){
                    info.innerHTML+=`
                    <tr style=" text-align: center; color:black; font-weight:bold">
                        <td>${ pago.nombre }</td>
                        <td>$${ pago.pago }</td>
                        <td>${ pago.fecha }</td>
                        <td>$${ persona.deuda}</td>
                        <td>$${ persona.deudaux }</td>
                    </tr>
                `
                }
            }
        });
    });
}

let usuario = redireccionar();
mostrar_datos();