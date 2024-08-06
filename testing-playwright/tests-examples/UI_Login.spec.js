import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Đăng nhập" }).click();
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("hoang");
  await page.getByPlaceholder("Nhập mật khẩu").click();
  await page.getByPlaceholder("Nhập mật khẩu").fill("12345");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(
    page.getByText("Tài khoản hoặc mật khẩu không chính xác.")
  ).toBeVisible();
});

// test("signup", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page
//     .getByRole("navigation")
//     .getByRole("link", { name: "Đăng ký" })
//     .click();
//   await expect(
//     page.getByRole("heading", { name: "Bạn chưa có tài khoản? Hãy đăng ký." })
//   ).toBeVisible();
  
//   await page.getByPlaceholder("Nhập tên đăng nhập").click();
//   await page.getByPlaceholder("Nhập tên đăng nhập").fill("hgskjc");
//   await page.getByPlaceholder("Nhập họ và tên").click();
//   await page.getByPlaceholder("Nhập họ và tên").fill("hábcg");
//   await page.getByPlaceholder("you@yourcompany.com").click();
//   await page.getByPlaceholder("Mật khẩu (ít nhất 8 kí tự)").click();

//   await expect(page.getByText("! Vui lòng nhập Email")).toBeVisible();

//   await page.getByPlaceholder("Nhập lại mật khẩu").click();
//   await expect(page.getByText("! Vui lòng nhập mật khẩu")).toBeVisible();
// });
