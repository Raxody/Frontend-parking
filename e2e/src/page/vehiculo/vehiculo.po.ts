import { by, element } from 'protractor';

export class VehiculoPage {

    //Vehiculo
    private linkListarVehiculo = element(by.id('linkListarVehiculo'));
    private linkCrearVehiculo = element(by.id('linkCrearVehiculo'));
    private linkActualizarVehiculo = element(by.id('linkActualizarVehiculo'));
    private linkEliminarVehiculo = element(by.id('linkEliminarVehiculo'));

    //Crear
    private inputPlacaCrearVehiculo = element(by.id('placaCrearVehiculo'));
    private inputIdentificacionCrearVehiculo = element(by.id('identificacionCrearVehiculo'));
    private inputTelefonoContactoCrearVehiculo = element(by.id('telefonoContactoCrearVehiculo'));
    private buttonCrearCrearVehiculo = element(by.id('crearCrearVehiculo'));

    //Listar
    private listaVehiculo = element(by.className('table'));

    //Actulizar
    private inputPlacaActualizarVehiculo = element(by.id('placaActualizarVehiculo'));
    private inputIdentificacionActualizarVehiculo = element(by.id('identificacionActualizarVehiculo'));
    private inputTelefonoContactoActualizarVehiculo = element(by.id('telefonoContactoActualizarVehiculo'));
    private buttonActualizarActualizarVehiculo = element(by.id('actualizarActualizarVehiculo'));
    private buttonBuscarActualizarVehiculo = element(by.id('buscarActualizarVehiculo'));

    //Eliminar
    private inputPlacaEliminarVehiculo = element(by.id('placaEliminarVehiculo'));
    private buttonEliminarEliminarVehiculo = element(by.id('eliminarEliminarVehiculo'));
    private buttonConfirmarEliminarVehiculo = element(by.className('swal2-confirm swal2-styled swal2-default-outline'));


    async clickBotonPaginaCrearVehiculo() {
        await this.linkCrearVehiculo.click();
    }

    async clickBotonPaginaListarVehiculo() {
        await this.linkListarVehiculo.click();
    }

    async clickBotonPaginaActualizarVehiculo() {
        await this.linkActualizarVehiculo.click();
    }

    async clickBotonPaginaEliminarVehiculo() {
        await this.linkEliminarVehiculo.click();
    }



    async clickBotonCrearVehiculo() {
        await this.buttonCrearCrearVehiculo.click();
    }

    async clickBotonActualizarVehiculo() {
        await this.buttonActualizarActualizarVehiculo.click();
    }

    async clickBotonBuscarVehiculo() {
        await this.buttonBuscarActualizarVehiculo.click();
    }

    async clickBotonEliminarVehiculo() {
        await this.buttonEliminarEliminarVehiculo.click();
    }

    
    async clickBotonConfirmarEliminarVehiculo() {
        await this.buttonConfirmarEliminarVehiculo.click();
    }

    
    async ingresarPlacaCrearVehiculo(placa) {
        await this.inputPlacaCrearVehiculo.sendKeys(placa);
    }


    async ingresarIdentificacionCrearVehiculo(placa) {
        await this.inputIdentificacionCrearVehiculo.sendKeys(placa);
    }

    async ingresarTelefonoContactoCrearVehiculo(cantDias) {
        await this.inputTelefonoContactoCrearVehiculo.sendKeys(cantDias);
    }



    async ingresarPlacaActualizarVehiculo(placa) {
        await this.inputPlacaActualizarVehiculo.sendKeys(placa);
    }

    async ingresarIdentificacionActualizarVehiculo(placa) {
        await this.inputIdentificacionActualizarVehiculo.sendKeys(placa);
    }

    async ingresarTelefonoContactoActualizarVehiculo(cantDias) {
        await this.inputTelefonoContactoActualizarVehiculo.sendKeys(cantDias);
    }


    async ingresarPlacaEliminarVehiculo(placa) {
        await this.inputPlacaEliminarVehiculo.sendKeys(placa);
    }

    
    async mostrarNotificacionAceptada(): Promise<Boolean> {
        return element(by.className('swal2-icon swal2-success swal2-icon-show')).isPresent();
    }

    async mostrarNotificacionError():Promise<Boolean>{
        return element(by.className('swal2-icon swal2-error swal2-icon-show')).isPresent();
    }

    async mostrarTabla():Promise<Boolean>{
        return (this.listaVehiculo).isPresent();
    }

}