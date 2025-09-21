# SELLFORCE Deployment Guide 🚀

This guide provides step-by-step instructions for deploying SELLFORCE across multiple platforms: Web, Mobile (iOS/Android), and Desktop.

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git repository set up
- Supabase project configured
- Required API keys and environment variables

## 🌐 Web Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=build
   ```

### Option 3: Traditional Hosting

1. **Build for production**
   ```bash
   npm run build
   npm run export  # if using static export
   ```

2. **Upload the `out/` or `build/` folder to your hosting provider**

## 📱 Mobile App Deployment

### Setup React Native + Expo

1. **Create new Expo project structure**
   ```bash
   mkdir sellforce-mobile
   cd sellforce-mobile
   npx create-expo-app . --template blank-typescript
   ```

2. **Install required dependencies**
   ```bash
   npx expo install react-native-web react-dom
   npm install @expo/webpack-config
   ```

3. **Copy components and adapt**
   ```bash
   # Copy all components from web version
   cp -r ../components ./
   cp -r ../styles ./
   cp -r ../utils ./
   ```

4. **Update app.json**
   ```json
   {
     "expo": {
       "name": "SELLFORCE",
       "slug": "sellforce-business",
       "version": "2.1.0",
       "orientation": "portrait",
       "icon": "./assets/icon.png",
       "userInterfaceStyle": "light",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#ffffff"
       },
       "platforms": ["ios", "android", "web"],
       "assetBundlePatterns": ["**/*"],
       "ios": {
         "supportsTablet": true,
         "bundleIdentifier": "com.sellforce.business"
       },
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#FFFFFF"
         },
         "package": "com.sellforce.business"
       },
       "web": {
         "favicon": "./assets/favicon.png",
         "bundler": "metro"
       },
       "extra": {
         "eas": {
           "projectId": "your-eas-project-id"
         }
       }
     }
   }
   ```

### Build Mobile Apps

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

4. **Build for Android**
   ```bash
   eas build --platform android
   ```

5. **Submit to App Stores**
   ```bash
   # iOS App Store
   eas submit --platform ios
   
   # Google Play Store
   eas submit --platform android
   ```

## 🖥️ Desktop App Deployment

### Using Electron

1. **Install Electron dependencies**
   ```bash
   npm install --save-dev electron electron-builder
   ```

2. **Create electron.js**
   ```javascript
   const { app, BrowserWindow } = require('electron');
   const path = require('path');
   const isDev = require('electron-is-dev');

   function createWindow() {
     const mainWindow = new BrowserWindow({
       width: 1200,
       height: 800,
       webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
       },
       icon: path.join(__dirname, 'assets/icon.png')
     });

     mainWindow.loadURL(
       isDev
         ? 'http://localhost:3000'
         : `file://${path.join(__dirname, '../build/index.html')}`
     );

     if (isDev) {
       mainWindow.webContents.openDevTools();
     }
   }

   app.whenReady().then(createWindow);

   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
       app.quit();
     }
   });

   app.on('activate', () => {
     if (BrowserWindow.getAllWindows().length === 0) {
       createWindow();
     }
   });
   ```

3. **Update package.json**
   ```json
   {
     "main": "electron.js",
     "homepage": "./",
     "scripts": {
       "electron": "electron .",
       "electron-dev": "ELECTRON_IS_DEV=true electron .",
       "electron-pack": "electron-builder",
       "preelectron-pack": "npm run build"
     },
     "build": {
       "appId": "com.sellforce.business",
       "productName": "SELLFORCE",
       "directories": {
         "output": "dist"
       },
       "files": [
         "build/**/*",
         "electron.js",
         "node_modules/**/*"
       ],
       "mac": {
         "category": "public.app-category.business"
       },
       "win": {
         "target": "nsis"
       },
       "linux": {
         "target": "AppImage"
       }
     }
   }
   ```

4. **Build desktop apps**
   ```bash
   # Build for current platform
   npm run electron-pack
   
   # Build for all platforms
   npm run electron-pack -- --mac --win --linux
   ```

## 🔧 Environment Configuration

### Development Environment
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_ENV=development
```

### Production Environment
```env
# .env.production
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_ENV=production
```

## 🗄️ Database Setup

### Supabase Configuration

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down the URL and anon key

2. **Set up Authentication**
   ```sql
   -- Enable email authentication
   -- Configure OAuth providers if needed
   ```

3. **Create Database Tables**
   ```sql
   -- Example: Users table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE,
     updated_at TIMESTAMP WITH TIME ZONE,
     username TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     website TEXT,
     PRIMARY KEY (id)
   );

   -- Enable RLS
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ```

4. **Set up Edge Functions**
   ```bash
   supabase functions deploy server
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy SELLFORCE

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  build-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @expo/eas-cli
      - run: eas build --platform all --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## 📊 Performance Optimization

### Web Performance
- Enable gzip compression
- Implement code splitting
- Optimize images and assets
- Use CDN for static assets
- Enable service worker caching

### Mobile Performance
- Optimize bundle size
- Use React Native performance profiler
- Implement lazy loading
- Optimize database queries
- Use local storage for caching

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Environment variables properly configured
- [ ] Database RLS policies enabled
- [ ] API rate limiting implemented
- [ ] HTTPS enabled
- [ ] Content Security Policy configured
- [ ] Regular security updates
- [ ] Error logging and monitoring

## 📈 Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Mixpanel
- **Performance**: Vercel Analytics, New Relic
- **Uptime Monitoring**: Pingdom, UptimeRobot

### Setup Example
```javascript
// Sentry configuration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify environment variables

2. **Deployment Issues**
   - Check build logs
   - Verify environment variables in deployment platform
   - Ensure all dependencies are listed in package.json

3. **Mobile Build Issues**
   - Update Expo CLI
   - Clear Expo cache: `expo r -c`
   - Check app.json configuration

### Support Resources
- 📚 [SELLFORCE Documentation](https://docs.sellforce.com)
- 💬 [Community Discord](https://discord.gg/sellforce)
- 📧 [Support Email](mailto:support@sellforce.com)

---

**Happy Deploying! 🚀**