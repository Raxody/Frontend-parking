import { by, element } from 'protractor';

export class HomePage {

    
    private linkVehiculoHome = element(by.id('linkVehiculoHome'));
    private linkFacturaHome = element(by.id('linkFacturaHome'));


    async clickBotonPaginaVehiculo() {
        await this.linkVehiculoHome.click();
    }

    async clickBotonPaginaFactura() {
        await this.linkFacturaHome.click();
    }

}