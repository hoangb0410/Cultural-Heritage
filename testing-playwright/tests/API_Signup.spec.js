import { test, expect } from "@playwright/test";

test("Test 1: Missing fullname and email information", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/user/register",
    {
      data: {
        username: "testuser3",
        password: "123456789",
      },
    }
  );
  expect(response.status()).toBe(400);
  const text = await response.text();
  expect(text).toBe('"missing information"');
});

test("Test 2: Wrong email format", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/user/register",
    {
      data: {
        username: "testuser3",
        email: "testuser3",
        fullname: "Test User 3",
        password: "123456789",
      },
    }
  );
  expect(response.status()).toBe(400);
  const text = await response.text();
  expect(text).toBe('"Wrong email format"');
});

test("Test 3: Password at least 8 characters", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/user/register",
    {
      data: {
        username: "testuser4",
        email: "testuser4@gmail.com",
        fullname: "Test User 4",
        password: "12345",
      },
    }
  );
  expect(response.status()).toBe(400);
  const text = await response.text();
  expect(text).toBe('"invalid password"');
});

test("Test 4: Email/Username already exists", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/user/register",
    {
      data: {
        username: "hoang",
        email: "hoang@gmail.com",
        fullname: "Cao Viet Hoang",
        password: "123456789",
      },
    }
  );
  expect(response.status()).toBe(400);
  const text = await response.text();
  expect(text).toBe("username/email already exists");
});

test("Test 5: Signup successfully", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/user/register",
    {
      data: {
        username: "testuser5",
        email: "testuser5@gmail.com",
        fullname: "Test User 5",
        password: "123456789",
      },
    }
  );
  expect(response.status()).toBe(200);
  const jsonResponse = await response.json();
  expect(jsonResponse.username).toBe("testuser5");
  expect(jsonResponse.fullname).toBe("Test User 5");
  expect(jsonResponse.email).toBe("testuser5@gmail.com");
  expect(jsonResponse.isAdmin).toBe(false);
});
