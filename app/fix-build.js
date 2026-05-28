// fix-build.js - Run this script in your frontend directory
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing build issues...\n');

// 1. Create driverService.js
const driverServicePath = './src/services/driverService.js';
if (!fs.existsSync(driverServicePath)) {
  console.log('✅ Creating driverService.js');
  const driverServiceContent = `import apiClient from '@/lib/apiClient';

const driverService = {
  getAllDrivers: async () => {
    try {
      const response = await apiClient.get('/drivers/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },
  getActiveDrivers: async () => {
    try {
      const response = await apiClient.get('/drivers/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active drivers:', error);
      throw error;
    }
  },
  getDriverById: async (id) => {
    try {
      const response = await apiClient.get(\`/drivers/\${id}\`);
      return response.data;
    } catch (error) {
      console.error('Error fetching driver:', error);
      throw error;
    }
  }
};

export default driverService;`;
  fs.writeFileSync(driverServicePath, driverServiceContent);
}

// 2. Fix adminService.js exports
const adminServicePath = './src/services/adminService.js';
if (fs.existsSync(adminServicePath)) {
  console.log('✅ Updating adminService.js exports');
  let content = fs.readFileSync(adminServicePath, 'utf8');
  if (!content.includes('export { adminService }')) {
    content += '\n\nexport { adminService };\nexport default adminService;';
    fs.writeFileSync(adminServicePath, content);
  }
}

// 3. Fix icon imports in all admin pages
const pagesToFix = [
  './app/admin/analytics/page.jsx',
  './app/admin/reports/page.jsx',
  './app/admin/settings/page.jsx'
];

pagesToFix.forEach(page => {
  if (fs.existsSync(page)) {
    console.log(`✅ Fixing icons in ${page}`);
    let content = fs.readFileSync(page, 'utf8');
    content = content.replace(/TrendingUpIcon/g, 'ArrowTrendingUpIcon');
    content = content.replace(/TrendingDownIcon/g, 'ArrowTrendingDownIcon');
    content = content.replace(/DownloadIcon/g, 'ArrowDownTrayIcon');
    content = content.replace(/SaveIcon/g, 'DocumentArrowDownIcon');
    fs.writeFileSync(page, content);
  }
});

// 4. Fix postcss.config.js
const postcssPath = './postcss.config.js';
console.log('✅ Updating postcss.config.js');
const postcssContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
fs.writeFileSync(postcssPath, postcssContent);

// 5. Fix user page import
const usersPagePath = './app/admin/users/page.js';
if (fs.existsSync(usersPagePath)) {
  console.log('✅ Fixing admin users page import');
  let content = fs.readFileSync(usersPagePath, 'utf8');
  content = content.replace(
    "import { adminService } from '@/services'",
    "import { adminService } from '@/services/adminService'"
  );
  fs.writeFileSync(usersPagePath, content);
}

console.log('\n✅ All fixes applied! Now run:');
console.log('git add .');
console.log('git commit -m "Fix build errors"');
console.log('git push');