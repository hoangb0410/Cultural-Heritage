const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Di sản Việt nam/);
});

test("Login link", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  // Click the get started link.
  await page.getByRole("link", { name: "Đăng nhập" }).click();

  // Expects page to have a heading with the name of ...
  await expect(
    page.getByRole("heading", { name: "Xin chào. Hãy đăng nhập để bắt đầu." })
  ).toBeVisible();
});

test("SignUp link", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");

  // Click the get started link.
  await page.getByRole("link", { name: "Đăng ký" }).click();

  // Expects page to have a heading with the name of ...
  await expect(
    page.getByRole("heading", { name: "Bạn chưa có tài khoản? Hãy đăng ký." })
  ).toBeVisible();
});
