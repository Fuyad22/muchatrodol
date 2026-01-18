# 🚀 HOW TO RUN THE PROJECT

## ✅ Complete Django Backend is Implemented!

Your Student Organization Website is ready with:
- ✅ Django REST API Backend (Python)
- ✅ All API endpoints working
- ✅ Admin panel
- ✅ Database with 4 models
- ✅ Email notifications
- ✅ Full frontend with CSS/JS

---

## 📋 QUICK START (2 Steps)

### Method 1: Use LAUNCH.bat (Recommended)

1. **Double-click** `LAUNCH.bat` in the project folder
2. Website opens automatically at **http://localhost:3000**

That's it! ✅

### Method 2: Manual Start

**Step 1: Start Django Backend**
```bash
.venv\Scripts\activate
python manage.py runserver 8000
```

**Step 2: Start Frontend Server** (in new terminal)
```bash
python -m http.server 3000
```

**Step 3: Open Browser**
```
http://localhost:3000
```

---

## 🌐 Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| **Website** | http://localhost:3000 | - |
| **API** | http://localhost:8000/api/ | - |
| **Admin Panel** | http://localhost:8000/admin/ | admin / admin123 |

---

## 🔧 Troubleshooting

### "Site can't be reached" Error

**Problem:** Frontend can't connect to backend

**Solution:**
1. Make sure Django is running on port 8000
2. Check if `http://localhost:8000/api/stats` works in browser
3. Open browser console (F12) and check for errors

### Blank White Page

**Reason:** Opening from Django (http://127.0.0.1:8000) doesn't serve CSS/JS properly

**Solution:** Always use `LAUNCH.bat` or open via Python HTTP server on port 3000

### Port Already in Use

```bash
# Kill processes on port 8000
taskkill /F /PID <process_id>

# Or use different port
python manage.py runserver 8001
```

---

## 📊 Project Structure

```
muchatrodol/
├── LAUNCH.bat          ← Double-click this!
├── index.html          ← Frontend
├── style.css           ← Styles
├── script.js           ← JavaScript (API URL: localhost:8000)
├── manage.py           ← Django manager
├── db.sqlite3          ← Database
├── .venv/              ← Python environment
├── api/                ← Django app
│   ├── models.py       ← Database models
│   ├── views.py        ← API endpoints
│   ├── urls.py         ← API routes
│   └── serializers.py  ← Data validation
└── backend/            ← Django settings
    ├── settings.py     ← Configuration
    └── urls.py         ← URL routing
```

---

## 🎯 Why Two Servers?

1. **Django (Port 8000)**: Backend API only
   - Handles form submissions
   - Saves data to database
   - Sends emails
   - Provides admin panel

2. **Python HTTP Server (Port 3000)**: Frontend only
   - Serves HTML, CSS, JS files
   - No complex configuration needed
   - Works perfectly with all static files

---

## ✨ Features Working

| Feature | Status | Endpoint |
|---------|--------|----------|
| Contact Form | ✅ | POST /api/contact |
| Newsletter | ✅ | POST /api/subscribe |
| Event Registration | ✅ | POST /api/register-event |
| Blood Donation | ✅ | POST /api/donate-blood |
| Statistics | ✅ | GET /api/stats |
| Admin Panel | ✅ | /admin/ |

---

## 📧 Email Setup (Optional)

Edit `.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
CONTACT_EMAIL=info@studentorg.edu
```

Get Gmail App Password:
1. https://myaccount.google.com/apppasswords
2. Generate password for "Mail"
3. Use in .env file

---

## ✅ Verification Checklist

Before using the website, verify:

1. [ ] Django server running on port 8000
   - Visit: http://localhost:8000/admin/
   - Should see Django admin login

2. [ ] Python HTTP server running on port 3000
   - Visit: http://localhost:3000
   - Should see full website with styling

3. [ ] API working
   - Visit: http://localhost:8000/api/stats
   - Should see JSON response

4. [ ] Frontend can connect to backend
   - Open browser console (F12)
   - No CORS errors
   - Forms submit successfully

---

## 🎉 Success Indicators

When everything is working:
- ✅ Website loads with colors and images
- ✅ Navigation menu works
- ✅ Forms can be submitted
- ✅ Subscribe button opens modal
- ✅ Contact form shows success message
- ✅ Admin panel accessible

---

## 📝 Common Issues & Solutions

### Issue: "LAUNCH.bat doesn't work"

**Cause:** Script syntax issues in bash terminal

**Solution:** Run manually:
```bash
# Terminal 1
.venv\Scripts\activate
python manage.py runserver 8000

# Terminal 2 (new window)
python -m http.server 3000
```

Then open: http://localhost:3000

### Issue: "Forms don't submit"

**Check:**
1. Browser console for errors (F12)
2. Django server logs for requests
3. CORS settings in backend/settings.py

### Issue: "CSS not loading"

**Reason:** You're on http://127.0.0.1:8000 (Django direct)

**Fix:** Go to http://localhost:3000 instead

---

## 🔒 Security Note

Current setup is for DEVELOPMENT only:
- DEBUG = True
- ALLOWED_HOSTS = ['*']
- Secret key exposed

For production, change backend/settings.py:
```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
SECRET_KEY = os.getenv('SECRET_KEY')
```

---

## 📚 Documentation

- Django: https://docs.djangoproject.com/
- REST API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

---

**🎊 YOUR PROJECT IS COMPLETE AND WORKING! 🎊**

Just run **LAUNCH.bat** and enjoy your website!
