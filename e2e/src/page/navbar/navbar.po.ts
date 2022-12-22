import { by, element } from 'protractor';

export class NavbarPage {
    linkPrincipal = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkVehiculo = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[2]'));
    linkFactura = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[3]'));

    async clickBotonPrincipal() {
        await this.linkPrincipal.click();
    }

    async clickBotonVehiculo() {
        await this.linkVehiculo.click();
    }

    async clickBotonFactura() {
        await this.linkFactura.click();
    }

}
