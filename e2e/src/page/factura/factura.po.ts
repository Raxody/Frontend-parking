import { by, element } from 'protractor';

export class FacturaPage {

    //Factura
    private linkListarFactura = element(by.id('linkListarFactura'));
    private linkCrearFactura = element(by.id('linkCrearFactura'));
    private linkPagarFactura = element(by.id('linkPagarFactura'));
    
    //Crear
    private inputPlacaFkCrearFactura = element(by.id('placaFkCrearFactura'));
    private buttonGuardarCrearFactura = element(by.id('guardarCrearFactura'));

    //Listar
    private listaFacturas = element(by.className('table'));

    //Pagar
    private inputPlacaFkPagarFactura = element(by.id('placaFkPagarFactura'));
    private inputCantDiasPagarFactura = element(by.id('cantDiasPagarFactura'));
    private buttonPagarPagarFactura = element(by.id('pagarPagarFactura'));
    

    async clickBotonPaginaCrearFactura() {
        await this.linkCrearFactura.click();
    }

    async clickBotonPaginaListarFactura() {
        await this.linkListarFactura.click();
    }

    async clickBotonPaginaPagarFactura() {
        await this.linkPagarFactura.click();
    }


    async clickBotonCrearFactura() {
        await this.buttonGuardarCrearFactura.click();
    }

    async clickBotonPagarFactura() {
        await this.buttonPagarPagarFactura.click();
    }


    async ingresarPlacaCrearFactura(placa) {
        await this.inputPlacaFkCrearFactura.sendKeys(placa);
    }


    async ingresarPlacaPagarFactura(placa) {
        await this.inputPlacaFkPagarFactura.sendKeys(placa);
    }

    async ingresarCantidadDiasPagarFactura(cantDias) {
        await this.inputCantDiasPagarFactura.sendKeys(cantDias);
    }

    async mostrarNotificacionAceptada(): Promise<Boolean> {
        return element(by.className('swal2-icon swal2-success swal2-icon-show')).isPresent();
    }

    async mostrarNotificacionError():Promise<Boolean>{
        return element(by.className('swal2-icon swal2-error swal2-icon-show')).isPresent();
    }


    async mostrarTabla():Promise<Boolean>{
        return (this.listaFacturas).isPresent();
    }
}