const { test, expect } = require("@playwright/test");

test("Home page", async ({ page }) => {
  // await page.route(/(analytics|fonts)/, (route) => route.abort);
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Di sản Việt nam/);
  await expect(
    page.getByRole("heading", { name: "Di sản văn hóa Việt Nam" })
  ).toBeVisible();
  // await page.route(/(png)$/, (route) => route.abort());
  await expect(page.getByRole("link", { name: "Đóng góp" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Tìm hiểu" })).toBeVisible();
});

test("Login link", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.getByRole("link", { name: "Đăng nhập" }).click();

  await expect(
    page.getByRole("heading", { name: "Xin chào. Hãy đăng nhập để bắt đầu." })
  ).toBeVisible();
});

test("Click on Signup button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Đăng ký" }).click();
  await expect(
    page.getByRole("heading", { name: "Bạn chưa có tài khoản? Hãy đăng ký." })
  ).toBeVisible();
  await expect(page.getByText("Đăng ký tài khoản")).toBeVisible();
  await expect(page.getByText("Tên đăng nhập *")).toBeVisible();
  await expect(page.getByPlaceholder("Nhập tên đăng nhập")).toBeVisible();
  await expect(page.getByText("Tôi đồng ý với chính sách")).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng ký" })).toBeVisible();
});
