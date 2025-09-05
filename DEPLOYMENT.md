# Deployment Guide

## Overview
This document provides instructions for deploying the MicroInvest micro-investing app to various hosting platforms.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- A hosting account (Vercel, Netlify, etc.)

## Build Process
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. The built files will be in the `dist` directory

## Deployment Options

### Vercel (Recommended)
1. Sign up at [vercel.com](https://vercel.com)
2. Create a new project
3. Connect your GitHub repository
4. Set the build command to `npm run build`
5. Set the output directory to `dist`
6. Deploy

### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Create a new site
3. Connect your Git provider or drag and drop the `dist` folder
4. Set the publish directory to `dist`
5. Deploy

### GitHub Pages
1. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to your web server

## Environment Variables
The app uses localStorage for user preferences and does not require environment variables for basic functionality.

## Custom Domain
To use a custom domain:
1. Purchase a domain from your preferred registrar
2. Configure DNS settings according to your hosting provider's instructions
3. Add the domain to your hosting provider's settings

## Troubleshooting
- If the app doesn't load, check that all files were uploaded correctly
- Ensure the web server is configured to serve `index.html` for all routes
- Check the browser console for any JavaScript errors

## Support
For deployment issues, contact the development team or refer to your hosting provider's documentation.