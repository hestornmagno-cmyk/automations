import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Fluxo de Login e Navegacao SauceDemo - InventoryPage', () => {
  test('Login com standard_user e visualizacao da vitrine de produtos em /inventory.html', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    await inventoryPage.expectOnInventoryPage();
    await inventoryPage.expectProductsVisible();
  });

  test('Logout apos login e retorno a pagina de login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    await inventoryPage.expectOnInventoryPage();
    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await loginPage.expectOnLoginPage();
    await loginPage.expectLoginFormEmpty();
  });
});
