import { test, expect } from "@playwright/test";

test("API GET Request", async ({ request }) => {
  const response = await request.get("http://localhost:8000/v1/heritage/6646674925119b8709b81a30");
  expect(response.status()).toBe(200);

  const jsonResponse = await response.json();

  // Check the full response
  const expectedResponse = {
    "_id": "6646674925119b8709b81a30",
    "name": "Test Heritages",
    "province_name": "Điện Biên",
    "region": "Bắc",
    "address": "Abc, XYZ",
    "category": "tangible",
    "type": "scenic spots",
    "content": [
      {
        "name": "Khu di tích quốc gia đặc biệt Côn Sơn",
        "description": "Xin chào tất cả mọi người.",
        "_id": "6646674925119b8709b81a31"
      }
    ],
    "image_link": "https://web01.haiduong.gov.vn/HinhAnhBaiViet/Toa%20c%C6%B0%CC%89u%20ph%C3%A2%CC%89m%20Con%20son.jpg",
    "video_link": "https://www.youtube.com/embed/KTWi8jtm9aI",
    "map_diagram": "",
    "source": "https://web01.haiduong.gov.vn/Trang/ChiTietTinTuc.aspx?nid=13066&title=khu-di-tich-quoc-gia-dac-biet-con-son-kiep-bac.html",
    "author": "664100a5c32d02308a5d6a24",
    "status": "rejected",
    "createdAt": "2024-05-16T20:06:33.323Z",
    "updatedAt": "2024-05-18T10:58:21.812Z",
    "__v": 0
  };

  expect(jsonResponse).toEqual(expectedResponse);

  console.log(jsonResponse);
});
