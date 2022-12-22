export class Factura{
    idFactura: number;
    fechaIngreso: string;
    cantDias: number;
    placaFk: string;
    valor: number;
    

    constructor(idFactura: number,fechaIngreso: string,cantDias: number,placaFk: string,valor: number) {    
        this.idFactura = idFactura;
        this.fechaIngreso = fechaIngreso;
        this.placaFk = placaFk;
        this.cantDias = cantDias;
        this.valor = valor;
    }

}
