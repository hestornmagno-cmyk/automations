import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly inventoryList: Locator;
  readonly firstProductName: Locator;
  readonly addToCartButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('[data-test="title"]').first();
    this.inventoryList = page.locator('[data-test="inventory-list"]').first();
    this.firstProductName = page.locator('[data-test="inventory-item-name"]').first();
    this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack, [data-test="add-to-cart-sauce-labs-backpack"]').first();
    this.shoppingCartLink = page.locator('.shopping_cart_link, [data-test="shopping-cart-link"]').first();
    this.openMenuButton = page.locator('#react-burger-menu-btn, [data-test="open-menu"]').first();
    this.logoutLink = page.locator('#logout_sidebar_link, [data-test="logout-sidebar-link"]').first();
  }

  async expectOnInventoryPage() {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/inventory\.html$/);
    await expect(this.productsTitle).toBeVisible();
    await expect(this.productsTitle).toHaveText('Products');
  }

  async expectProductsVisible() {
    await expect(this.inventoryList).toBeVisible();
    const count = await this.inventoryList.locator('[data-test="inventory-item-name"]').count();
    expect(count).toBeGreaterThanOrEqual(1);
    await expect(this.firstProductName).toBeVisible();
  }

  async openMenu() {
    await this.openMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }
}
