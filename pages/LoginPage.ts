import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name, [data-test="username"]').first();
    this.passwordInput = page.locator('#password, [data-test="password"]').first();
    this.loginButton = page.locator('#login-button, [data-test="login-button"]').first();
    this.errorMessage = page.locator('[data-test="error"]').first();
    this.logo = page.locator('.login_logo').first();
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async navigateToInventoryDirectly() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
    await expect(this.loginButton).toBeVisible();
  }

  async expectStillOnLoginPage() {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
    await expect(this.loginButton).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectLoginFormEmpty() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.usernameInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
  }
}
