let bdn=JSON.parse(localStorage.getItem("miBDp"));
let control_pagos=JSON.parse(localStorage.getItem("control_pagos"));
//let deuda=0;
let lusuario=document.getElementById("usuarios");
let lusuario2=document.getElementById("usuarios2");
let lusuario3=document.getElementById("usuarios3");
let listado_pagos=document.getElementById("listado_pagos");

let lusuario5=document.getElementById("usuarios5");

if (!bdn || bdn==undefined){
    bdn={datos:[]}
}
if(!control_pagos || control_pagos==undefined)
{
    control_pagos = {
        control: []
    }
}
function usuarios(){
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));
    lusuario.innerHTML="";
    lusuario2.innerHTML="";
    lusuario3.innerHTML="";
    if(usuarios != null){
        usuarios.datos.forEach(persona => {
            if(persona.rol == "deudor")
            {
                lusuario.innerHTML+=`
                <tr> 
                    <th>${persona.nombre} </th>
                    <th>${persona.telefono} </th>
                    <th>${persona.correo} </th>
                    <th>${persona.password} </th>
                    <th>${persona.rol} </th>
                </tr>
                
                `
                lusuario2.innerHTML+=`
                <tr> 
                    <th>${persona.nombre} </th>
                    <th>$${persona.deuda} </th>
                </tr> 
                
                `
                lusuario3.innerHTML+=`
                <tr>
                    <th>${persona.nombre} </th>
                    <th>$${persona.pago} </th>
                    <th>$${persona.deudaux} </th>
                </tr>
                `
            }
        });
    }
}

document.getElementById("Guardar1").addEventListener("click",()=>{
    let nombre=document.getElementById("Nombre").value;
    let telefono=document.getElementById("Telefono").value;
    let correo=document.getElementById("Correo").value;
    let password=document.getElementById("Password").value;
    let rol=document.getElementById("rol").value;
    let deuda=0;
    let deudaux=0
    let cobroaux=0
    let persona=new Propietario(nombre,telefono,correo,password,parseInt(deuda),parseInt(deudaux),parseInt(cobroaux),rol);
    bdn.datos.push(persona);

    localStorage.setItem("miBDp",JSON.stringify(bdn));
    console.log("guardado " + persona );
    location.replace("index.html");
})



document.getElementById("Guardar2").addEventListener("click",()=>{
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));
    let nombre=document.getElementById("Nombre_deuda").value;
    let deuda=document.getElementById("Cobro_deuda").value;
    let deudaux=document.getElementById("Cobro_deuda").value;
    let cobroaux=document.getElementById("Cobro_deuda").value;

    if(deuda<=0){
        return alert("El numero debe de ser mayor a 0");
    } 

    usuarios.datos.forEach(persona => {

        if(persona.nombre==nombre){
            persona.deuda=parseInt(persona.deuda) + parseInt(deuda);
            persona.deudaux=parseInt(persona.deudaux) + parseInt(deuda);
        }
        
    });
    localStorage.setItem("miBDp",JSON.stringify(usuarios));
    location.replace("index.html");
})

document.getElementById("Guardar3").addEventListener("click",()=>{
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));
    let nombre=document.getElementById("Nombre_deuda").value;
    let deuda=document.getElementById("Cobro_deuda").value;

    if(deuda<=0){
        return alert("El numero debe de ser mayor a 0");
    }

    usuarios.datos.forEach(persona => {
        
            persona.deuda=parseInt(persona.deuda) + parseInt(deuda);
        
    });
    localStorage.setItem("miBDp",JSON.stringify(usuarios));
    location.replace("index.html");

})

document.getElementById("Guardar4").addEventListener("click",()=>{
    let usuarios=JSON.parse(localStorage.getItem("miBDp"));
    let nombre=document.getElementById("Nombre_Pago").value;
    let pago=document.getElementById("Pago").value;
    let fecha_pago = document.getElementById("fecha_pago").value;


    if(pago<=0){
        return alert("El numero debe de ser mayor a 0");
    }

    usuarios.datos.forEach(persona => {

        if(persona.nombre==nombre){
            persona.deudaux = parseInt(persona.deudaux) - parseInt(pago);
            persona.pago+=parseInt(pago);

            let control = new ControlPagos(nombre,parseInt(pago),fecha_pago);
            control_pagos.control.push(control);

            localStorage.setItem("control_pagos" , JSON.stringify(control_pagos));

        }
        
    });

    localStorage.setItem("miBDp",JSON.stringify(usuarios));
    location.replace("index.html");

})



document.getElementById("Consultar").addEventListener("click",()=>{
    let fecha_consulta = document.getElementById("fecha_consulta").value;
    let control_pagos=JSON.parse(localStorage.getItem("control_pagos"));
    listado_pagos.innerHTML = "";
    
    control_pagos.control.forEach(pago => {
        if(pago.fecha == fecha_consulta)
        {
            listado_pagos.innerHTML+=`
                <tr style=" text-align: center; color:black; font-weight:bold">
                    <td>${ pago.nombre }</td>
                    <td>$${ pago.pago }</td>
                    <td>${ pago.fecha }</td>
                </tr>
            `
        }
    });
});


function redireccionar()
{
    let usuario=JSON.parse(localStorage.getItem("sesion"));

    if(!usuario || usuario == null)
    {
        location.replace("login.html");
    }
    if(usuario.rol != "admin")
    {
        location.replace("cliente.html")
    }
    return usuario;
}

let user = redireccionar();