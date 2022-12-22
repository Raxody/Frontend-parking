import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VehiculoPage } from '../page/vehiculo/vehiculo.po';
import { FacturaPage } from '../page/factura/factura.po';
import { browser } from 'protractor';

describe('Espacio de trabajo de Factura', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let factura: FacturaPage;
    let vehiculo: VehiculoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        vehiculo = new VehiculoPage();
        factura = new FacturaPage();
        page.navigateTo();
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
        browser.sleep(100);

        navBar.clickBotonFactura();
        factura.clickBotonPaginaCrearFactura();
        factura.ingresarPlacaCrearFactura(PLACA);
        factura.clickBotonCrearFactura();
        browser.sleep(100);

        expect(factura.mostrarNotificacionAceptada()).toBe(true);
        browser.sleep(100);

    });

    it('Deberia lanzar un error por la longitud de la placa ', () => {
        const PLACA = 'PRO';

        navBar.clickBotonFactura();
        factura.clickBotonPaginaCrearFactura();
        factura.ingresarPlacaCrearFactura(PLACA);
        factura.clickBotonCrearFactura();

        expect(factura.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });


    it('Deberia lanzar un error al ingresar una facutra que ya se encuentra en proceso', () => {
        const PLACA = 'PROTRACTOR142';

        navBar.clickBotonFactura();
        factura.clickBotonPaginaCrearFactura();
        factura.ingresarPlacaCrearFactura(PLACA);
        factura.clickBotonCrearFactura();

        expect(factura.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });


    it('Deberia listar las facturas', () => {

        navBar.clickBotonFactura();
        factura.clickBotonPaginaListarFactura();

        expect(factura.mostrarTabla()).toBe(true);
        browser.sleep(100);
    });


    it('Deberia no generar el cobro de una Factura', () => {
        navBar.clickBotonFactura();

        const PLACA = 'PROTRACTOR142';

        factura.clickBotonPaginaPagarFactura();
        factura.ingresarPlacaPagarFactura(PLACA);
        factura.clickBotonPagarFactura();
        expect(factura.mostrarNotificacionError()).toBe(true);
        browser.sleep(100);
    });


   it('Deberia generar el cobro de una Factura', () => {

        navBar.clickBotonFactura();

        const PLACA = 'PROTRACTOR142';
        const CANTIDAD_DIAS = 5;

        factura.clickBotonPaginaPagarFactura();
        factura.ingresarPlacaPagarFactura(PLACA);
        factura.ingresarCantidadDiasPagarFactura(CANTIDAD_DIAS);
        factura.clickBotonPagarFactura();

        expect(factura.mostrarNotificacionAceptada()).toBe(true);
        browser.sleep(100);

        navBar.clickBotonVehiculo();
        vehiculo.clickBotonPaginaEliminarVehiculo();
        vehiculo.ingresarPlacaEliminarVehiculo(PLACA);
        vehiculo.clickBotonEliminarVehiculo();
        vehiculo.clickBotonConfirmarEliminarVehiculo();
        browser.sleep(100);
    });


});

