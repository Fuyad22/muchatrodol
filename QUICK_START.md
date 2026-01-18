# 🚀 Quick Start Guide

## Get Your Website Running in 5 Minutes!

### Step 1: Check Prerequisites ✓
Make sure you have:
- [ ] Node.js installed (check: `node --version`)
- [ ] A Gmail account for sending emails

Don't have Node.js? Download from https://nodejs.org/

### Step 2: Install Dependencies 📦
Open terminal/command prompt in this folder and run:
```bash
npm install
```

This installs all required packages. Wait for it to complete (takes ~30 seconds).

### Step 3: Configure Email 📧
1. Open `.env` file in a text editor
2. Replace these values with yours:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

#### How to get Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification" (enable it if not already on)
3. Scroll down to "App passwords"
4. Click it → Select "Mail" → Generate
5. Copy the 16-character password
6. Paste it in `.env` as EMAIL_PASSWORD

### Step 4: Start the Server 🎯
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════╗
║   Student Organization Backend Server          ║
╠════════════════════════════════════════════════╣
║   🚀 Server running on port 3000                ║
║   📧 Email service: gmail                       ║
║   🌐 http://localhost:3000                      ║
╚════════════════════════════════════════════════╝

✅ Email server is ready to send messages
```

### Step 5: Open Your Website 🌐
Open your browser and go to:
```
http://localhost:3000
```

## ✅ Testing

Try these features:
1. Click on a team member card → Should show member details
2. Fill out the contact form → Should send email
3. Subscribe to newsletter → Should receive welcome email
4. Register for an event → Should get confirmation email
5. Toggle dark mode (moon icon in navbar)
6. View the gallery and use filters

## 🔧 Troubleshooting

### Port Already in Use
Change PORT in `.env` to 3001 or 8080

### Email Not Sending
- Make sure you used Gmail App Password (not regular password)
- Check spam folder
- Look at terminal for error messages

### Page Not Loading
- Make sure server is running (check terminal)
- Try http://localhost:3000 (not https)
- Clear browser cache

## 🎨 Next Steps

1. **Customize Content**
   - Edit `index.html` to change text and images
   - Update team members section
   - Add your actual contact information

2. **Change Colors/Styling**
   - Edit `style.css` → look for `:root` variables
   - Change primary color, fonts, etc.

3. **Add Database** (Optional)
   - See `BACKEND_SETUP.md` for MongoDB setup
   - Use `database.js` for schemas

4. **Deploy to Production**
   - See README.md deployment section
   - Try Heroku, Railway, or Render

## 📚 Documentation

- **README.md** - Full documentation
- **BACKEND_SETUP.md** - Detailed backend guide
- **FEATURES.md** - List of all features
- **IMPLEMENTATION_GUIDE.md** - Technical details

## 🆘 Need Help?

1. Check server terminal for error messages
2. Check browser console (F12 → Console tab)
3. Read BACKEND_SETUP.md for detailed troubleshooting
4. Make sure `.env` file has correct values

## 📋 Common Commands

```bash
npm start          # Start server (production)
npm run dev        # Start server (development with auto-reload)
npm install        # Install dependencies
```

---

Happy coding! 🎉
