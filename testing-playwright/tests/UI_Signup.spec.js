import { test, expect } from "@playwright/test";

test("Signup button", async ({ page }) => {
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

test("Test 1: Missing infomation", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Đăng ký" }).click();
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("hoang");
  await page.getByPlaceholder("Nhập họ và tên").click();
  await page.getByPlaceholder("you@yourcompany.com").click();
  await expect(page.getByText("! Vui lòng nhập Họ và tên")).toBeVisible();
  await page.getByPlaceholder("Mật khẩu (ít nhất 8 kí tự)").click();
  await expect(page.getByText("! Vui lòng nhập Email")).toBeVisible();
  await page.getByPlaceholder("Nhập lại mật khẩu").click();
  await expect(page.getByText("! Vui lòng nhập mật khẩu")).toBeVisible();
  await page.getByRole("button", { name: "Đăng ký" }).click();
  await expect(page.getByText("! Vui lòng nhập lại mật khẩu")).toBeVisible();
});

test("Test 2: Wrong email format", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("testuser6");
  await page.getByPlaceholder("Nhập họ và tên").click();
  await page.getByPlaceholder("Nhập họ và tên").fill("Test User 6");
  await page.getByPlaceholder("you@yourcompany.com").click();
  await page.getByPlaceholder("you@yourcompany.com").fill("testuser6");
  await page.getByPlaceholder("Mật khẩu (ít nhất 8 kí tự)").click();
  //   await expect(page.getByText("! Vui lòng nhập đúng định dạng email")).toBeVisible();
  await expect(page.getByText("! Vui lòng nhập Email")).toBeVisible();
});

test("Test 3: Password at least 8 characters", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");
  await page.getByPlaceholder("Nhập tên đăng nhập").click();
  await page.getByPlaceholder("Nhập tên đăng nhập").fill("testuser6");
  await page.getByPlaceholder("Nhập họ và tên").click();
  await page.getByPlaceholder("Nhập họ và tên").fill("Test User 6");
  await page.getByPlaceholder("you@yourcompany.com").click();
  await page
    .getByPlaceholder("you@yourcompany.com")
    .fill("testuser6@gmail.com");
  await page.getByPlaceholder("Mật khẩu (ít nhất 8 kí tự)").click();
  await page.getByPlaceholder("Mật khẩu (ít nhất 8 kí tự)").fill("12345");
  await page.getByPlaceholder("Nhập lại mật khẩu").click();
  await page.getByPlaceholder("Nhập lại mật khẩu").fill("12345");
  await expect(page.getByText("! Mật khẩu cần ít nhất 8 kí tự")).toBeVisible();
});


test('Test 4: Re-password not match', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');
  await page.getByPlaceholder('Nhập tên đăng nhập').click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('testuser6');
  await page.getByPlaceholder('Nhập họ và tên').click();
  await page.getByPlaceholder('Nhập họ và tên').fill('Test User 6');
  await page.getByPlaceholder('you@yourcompany.com').click();
  await page.getByPlaceholder('you@yourcompany.com').fill('testuser6@gmail.com');
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').click();
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').fill('12345678');
  await page.getByPlaceholder('Nhập lại mật khẩu').click();
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('123456789');
  await page.getByRole('button', { name: 'Đăng ký' }).click();
  await expect(page.getByText("! Mật khẩu nhập lại không khớp với mật khẩu đăng ký")).toBeVisible();
});


test('Test 5: Email/Username already exists', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');
  await page.getByPlaceholder('Nhập tên đăng nhập').click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('hoang');
  await page.getByPlaceholder('Nhập họ và tên').click();
  await page.getByPlaceholder('Nhập họ và tên').fill('Cao Viet Hoang');
  await page.getByPlaceholder('you@yourcompany.com').click();
  await page.getByPlaceholder('you@yourcompany.com').fill('hoang@gmail.com');
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').click();
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').fill('123456789');
  await page.getByPlaceholder('Nhập lại mật khẩu').click();
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('123456789');
  await page.getByRole('button', { name: 'Đăng ký' }).click();
  await expect(page.getByText("Tên đăng nhập hoặc email đã có")).toBeVisible();
});

test('Test 6: Signup successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');
  await page.getByPlaceholder('Nhập tên đăng nhập').click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('testuser6');
  await page.getByPlaceholder('Nhập họ và tên').click();
  await page.getByPlaceholder('Nhập họ và tên').fill('Test User 6');
  await page.getByPlaceholder('you@yourcompany.com').click();
  await page.getByPlaceholder('you@yourcompany.com').fill('testuser6@gmail.com');
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').click();
  await page.getByPlaceholder('Mật khẩu (ít nhất 8 kí tự)').fill('123456789');
  await page.getByPlaceholder('Nhập lại mật khẩu').click();
  await page.getByPlaceholder('Nhập lại mật khẩu').fill('123456789');
  await page.getByRole('button', { name: 'Đăng ký' }).click();
  await expect(page.getByText("Đăng ký thành công!")).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Xin chào. Hãy đăng nhập để bắ' })).toBeVisible();
});