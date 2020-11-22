function salir_sesion()
{
    localStorage.removeItem("sesion");
    location.replace("login.html");
}