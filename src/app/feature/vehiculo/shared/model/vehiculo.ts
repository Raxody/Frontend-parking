export class Vehiculo {
    placa: string;
    identificacion: number;
    telefonoContacto: number;

    constructor(placa: string, identificacion: number,telefonoContacto: number) {
        this.placa = placa;
        this.identificacion = identificacion;
        this.telefonoContacto = telefonoContacto;
    }
}
