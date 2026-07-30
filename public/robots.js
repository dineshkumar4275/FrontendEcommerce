const BASE_URL = "https://www.sombu.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/login",
          "/register",
          "/cart",
          "/checkout",
          "/profile",
          "/orders",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}