/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rauchguardian.com", // ✅ Change this to your actual domain
  generateRobotsTxt: true, // 👈 Also creates a robots.txt
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/dashboard",
    "/forgot",
    "/login",
    "/reset-password",
    "/reset",
    "/landing",
  ], // ⛔ Exclude routes if needed
};
