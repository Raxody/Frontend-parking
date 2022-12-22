import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VehiculoPage } from '../page/vehiculo/vehiculo.po';
import { browser } from 'protractor';

describe('Espacio de trabajo de Vehiculo', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let vehiculo: VehiculoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        vehiculo = new VehiculoPage();
        page.navigateTo();
    });

    
    it('Deberia no crear una factura por falta de datos', () => {
        
        const PLACA = 'PROTRACTOR142';
        const IDENTIFICACION_VEHICULO = 123456;

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaCrearVehiculo();
        vehiculo.ingresarPlacaCrearVehiculo(PLACA);
        vehiculo.ingresarIdentificacionCrearVehiculo(IDENTIFICACION_VEHICULO);
        vehiculo.clickBotonCrearVehiculo();

        expect(vehiculo.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });


    it('Deberia crear una factura', () => {
        
        const PLACA = 'PROTRACTOR142';
        const IDENTIFICACION_VEHICULO = 123456;
        const TELEFONO_CONTACTO_VEHICULO = 3152546969;

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaCrearVehiculo();
        vehiculo.ingresarPlacaCrearVehiculo(PLACA);
        vehiculo.ingresarIdentificacionCrearVehiculo(IDENTIFICACION_VEHICULO);
        vehiculo.ingresarTelefonoContactoCrearVehiculo(TELEFONO_CONTACTO_VEHICULO);
        vehiculo.clickBotonCrearVehiculo();

        expect(vehiculo.mostrarNotificacionAceptada()).toBe(true);
        browser.sleep(100);
    });

    it('Deberia no crear una factura por falta de datos', () => {
        
        const PLACA = 'PROTRACTOR142';
        const IDENTIFICACION_VEHICULO = 123456;
        const TELEFONO_CONTACTO_VEHICULO = 3152546969;

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaCrearVehiculo();
        vehiculo.ingresarPlacaCrearVehiculo(PLACA);
        vehiculo.ingresarIdentificacionCrearVehiculo(IDENTIFICACION_VEHICULO);
        vehiculo.ingresarTelefonoContactoCrearVehiculo(TELEFONO_CONTACTO_VEHICULO);
        vehiculo.clickBotonCrearVehiculo();

        expect(vehiculo.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });

    it('Deberia listar los vehiculos', () => {

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaListarVehiculo();

        expect(vehiculo.mostrarTabla()).toBe(true);
        browser.sleep(100);
    });

    it('Deberia buscar una factura y no encontrarla', () => {

        const PLACA = 'NO_EXISTE123';

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaActualizarVehiculo();
        vehiculo.ingresarPlacaActualizarVehiculo(PLACA);
        vehiculo.clickBotonBuscarVehiculo();
        expect(vehiculo.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });

    it('Deberia buscar una factura y encontrarla', () => {

        const PLACA = 'PROTRACTOR142';

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaActualizarVehiculo();
        vehiculo.ingresarPlacaActualizarVehiculo(PLACA);
        vehiculo.clickBotonBuscarVehiculo();
        expect(vehiculo.mostrarNotificacionError()).toBe(false);
        browser.sleep(100);
    });

    
    it('Deberia buscar una factura, encontrarla actualizarla', () => {

        const PLACA = 'PROTRACTOR142';
        const TELEFONO_CONTACTO_VEHICULO = 3152546961;

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaActualizarVehiculo();
        vehiculo.ingresarPlacaActualizarVehiculo(PLACA);
        vehiculo.clickBotonBuscarVehiculo();
        vehiculo.ingresarTelefonoContactoActualizarVehiculo(TELEFONO_CONTACTO_VEHICULO);        
        vehiculo.clickBotonActualizarVehiculo();
        expect(vehiculo.mostrarNotificacionAceptada()).toBe(true);
        browser.sleep(100);
    });


    it('Deberia no poder eliminar vehiculo porque no existe', () => {

        const PLACA = 'PROT';

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaEliminarVehiculo();
        vehiculo.ingresarPlacaEliminarVehiculo(PLACA);
        vehiculo.clickBotonEliminarVehiculo();
        vehiculo.clickBotonConfirmarEliminarVehiculo();
        browser.sleep(100);
        expect(vehiculo.mostrarNotificacionError()).toBe(true);
    });

    it('Deberia eliminar el vehiculo ', () => {

        const PLACA = 'PROTRACTOR142';

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaEliminarVehiculo();
        vehiculo.ingresarPlacaEliminarVehiculo(PLACA);
        vehiculo.clickBotonEliminarVehiculo();
        vehiculo.clickBotonConfirmarEliminarVehiculo();
        browser.sleep(100);
        expect(vehiculo.mostrarNotificacionAceptada()).toBe(true);
    });



});
