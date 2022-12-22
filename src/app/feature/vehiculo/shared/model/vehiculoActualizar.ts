export class VehiculoActualizar {
    placa: string;
    idPropietario: number;
    telefonoContacto: number;

    constructor(placa: string, idPropietario: number,telefonoContacto: number) {
        this.placa = placa;
        this.idPropietario = idPropietario;
        this.telefonoContacto = telefonoContacto;
    }
}
