class Propietario{
    constructor(nombre,telefono,correo,password,deuda,deudaux,pago,rol){
        this.nombre=nombre;
        this.telefono=telefono;
        this.correo=correo;
        this.password=password;
        this.deuda=deuda;
        this.deudaux=deudaux;
        this.pago=pago;
        this.rol=rol;
    }
}

class ControlPagos{
    constructor(nombre,pago,fecha){
        this.nombre=nombre;
        this.pago=pago;
        this.fecha=fecha;
    }
}
