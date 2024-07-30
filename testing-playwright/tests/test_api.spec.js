import { test, expect } from "@playwright/test";

// GET
test("API GET Heritage by ID", async ({ request }) => {
  const response = await request.get(
    "http://localhost:8000/v1/heritage/6646674925119b8709b81a30"
  );
  
  expect(response.status()).toBe(200);

  const jsonResponse = await response.json();

  // Validate specific fields
  expect(jsonResponse._id).toBe("6646674925119b8709b81a30");
  expect(jsonResponse.name).toBe("Test Heritages");
  expect(jsonResponse.province_name).toBe("Điện Biên");
  expect(jsonResponse.region).toBe("Bắc");
  expect(jsonResponse.address).toBe("Abc, XYZ");
  expect(jsonResponse.category).toBe("tangible");
  expect(jsonResponse.type).toBe("scenic spots");

  expect(jsonResponse.content).toHaveLength(1);
  expect(jsonResponse.content[0].name).toBe(
    "Khu di tích quốc gia đặc biệt Côn Sơn"
  );
  expect(jsonResponse.content[0].description).toBe(
    "Xin chào tất cả mọi người."
  );
  expect(jsonResponse.content[0]._id).toBe("6646674925119b8709b81a31");

  expect(jsonResponse.image_link).toBe(
    "https://web01.haiduong.gov.vn/HinhAnhBaiViet/Toa%20c%C6%B0%CC%89u%20ph%C3%A2%CC%89m%20Con%20son.jpg"
  );
  expect(jsonResponse.video_link).toBe(
    "https://www.youtube.com/embed/KTWi8jtm9aI"
  );
  expect(jsonResponse.map_diagram).toBe("");
  expect(jsonResponse.source).toBe(
    "https://web01.haiduong.gov.vn/Trang/ChiTietTinTuc.aspx?nid=13066&title=khu-di-tich-quoc-gia-dac-biet-con-son-kiep-bac.html"
  );
  expect(jsonResponse.author).toBe("664100a5c32d02308a5d6a24");
  expect(jsonResponse.status).toBe("approved");
  expect(jsonResponse.createdAt).toBe("2024-05-16T20:06:33.323Z");
  expect(jsonResponse.updatedAt).toBe("2024-05-18T10:58:21.812Z");
  expect(jsonResponse.__v).toBe(0);

  // console.log(jsonResponse);
});

// POST
test("API CREATE Heritage", async ({ request }) => {
  const response = await request.post(
    "http://localhost:8000/v1/heritage/createHeritage/",
    {
      data: {
        name: "Hoang Thanh Thang Long",
        province_name: "Ha Noi",
        region: "Bac",
        address: "Ba Dinh",
        category: "tangible",
        type: "historical site",
        content: [
          {
            name: "Test Name",
            description: "ABCks kjsldjhgc jkhsjdbchgsv kjashgxcbch",
          },
        ],
        source:
          "https://web01.haiduong.gov.vn/Trang/ChiTietTinTuc.aspx?nid=13066&title=khu-di-tich-quoc-gia-dac-biet-con-son-kiep-bac.html",
        image_link: "/assets/images/Con-Son-11.jpg",
        video_link: "https://www.youtube.com/watch?v=1oGmVrYg5xo",
        map_diagram: "/assets/diagrams/Con-Son-map.jpg",
      },
    }
  );

  expect(response.status()).toBe(200);

  const jsonResponse = await response.json();

  expect(jsonResponse.name).toBe("Hoang Thanh Thang Long");
  expect(jsonResponse.category).toBe("tangible");

  // console.log(await response.json());
});

// PUT
test("API Update Heritage - Failed", async ({ request }) => {
  const response = await request.put(
    "http://localhost:8000/v1/heritage/update/6646674925119b8709b81a30",
    {
      data: {
        status: "approved",
      },
    }
  );
  expect(response.status()).toBe(401);
  const text = await response.text();
  expect(text).toContain("You're not authenticated");
  // console.log(await response.json());
});

// Login
test("API Login", async ({ request }) => {
  const response = await request.post("http://localhost:8000/v1/auth/login", {
    data: {
      username: "admin",
      password: "123456789",
    },
  });
  expect(response.status()).toBe(200);
  const jsonResponse = await response.json();
  expect(jsonResponse.username).toBe("admin");
  expect(jsonResponse.fullname).toBe("Admin");
  expect(jsonResponse.email).toBe("admin@gmail.com");
  // console.log(await response.json());
});

// PUT
test("API Update Heritage - Success", async ({ request }) => {
  const response1 = await request.post("http://localhost:8000/v1/auth/login", {
    data: {
      username: "admin",
      password: "123456789",
    },
  });
  const jsonResponse = await response1.json();
  const token = jsonResponse.accessToken;
  const response = await request.put(
    "http://localhost:8000/v1/heritage/update/6646674925119b8709b81a30",
    {
      headers: {
        token: `Bearer ${token}`,
      },
      data: {
        status: "approved",
      },
    }
  );
  expect(response.status()).toBe(200);
  const jsonRes = await response.json();
  expect(jsonRes.status).toContain("approved");
  //console.log(await response.json());
});
