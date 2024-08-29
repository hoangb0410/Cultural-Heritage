import { test, expect } from "@playwright/test";

test("Test 1: Login successfull", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("hoang");
  await page.getByPlaceholder("Nhập mật khẩu").click();
  await page.getByPlaceholder("Nhập mật khẩu").fill("123456789");

  await page.getByRole("button", { name: "Đăng nhập" }).click();

  await expect(
    page.getByRole("heading", { name: "Khám phá những di sản văn hóa" })
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "Lịch sử" })).toBeVisible();

  await expect(page.getByRole("link", { name: "Phản hồi" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Cao Viet Hoang" })
  ).toBeVisible();
});

test("Test 2: Wrong username", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("abcxyz");
  await page.getByPlaceholder("Nhập mật khẩu").click();
  await page.getByPlaceholder("Nhập mật khẩu").fill("123456");
  await page.getByRole("button", { name: "Đăng nhập" }).click();

  await expect(page.getByText("Tài khoản hoặc mật khẩu không")).toBeVisible();
});

test("Test 2: Wrong password", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("Nhập tên đăng nhập").click();
    await page.getByPlaceholder("Nhập tên đăng nhập").fill("hoang");
    await page.getByPlaceholder("Nhập mật khẩu").click();
    await page.getByPlaceholder("Nhập mật khẩu").fill("123456");
    await page.getByRole("button", { name: "Đăng nhập" }).click();
  
    await expect(page.getByText("Tài khoản hoặc mật khẩu không")).toBeVisible();
  });