import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Fluxo de Login e Navegacao SauceDemo - LoginPage', () => {
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

  test('Tentativa de login com credenciais invalidas ou campos vazios', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cases = [
      { usuario: 'standard_user', senha: 'senha_incorreta', mensagem: 'Epic sadface: Username and password do not match any user in this service' },
      { usuario: 'usuario_inexistente', senha: 'secret_sauce', mensagem: 'Epic sadface: Username and password do not match any user in this service' },
      { usuario: '', senha: 'secret_sauce', mensagem: 'Epic sadface: Username is required' },
      { usuario: 'standard_user', senha: '', mensagem: 'Epic sadface: Password is required' },
    ];
    for (const c of cases) {
      await loginPage.navigate();
      await loginPage.fillUsername(c.usuario);
      await loginPage.fillPassword(c.senha);
      await loginPage.clickLogin();
      await loginPage.expectStillOnLoginPage();
      await loginPage.expectErrorMessage(c.mensagem);
    }
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

  test('Acesso direto a URL da vitrine sem autenticacao e bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToInventoryDirectly();
    await loginPage.expectOnLoginPage();
    await loginPage.expectErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });
});
