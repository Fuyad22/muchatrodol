# 🎓 Student Organization Website - Complete Setup Guide

## ✅ PROJECT IS READY TO USE!

Your Django backend is fully implemented and running!

---

## 🚀 Quick Start (3 Steps)

### 1. Open the Website
Just open `index.html` in your browser or visit:
```
http://127.0.0.1:8000/
```

### 2. Access Admin Panel
```
URL: http://127.0.0.1:8000/admin/
Username: admin
Password: admin123
```

### 3. Server is Already Running!
Django server is running on: **http://127.0.0.1:8000/**

---

## 📋 What's Implemented

### ✅ Backend (Django)
- [x] Django 6.0.1 REST API
- [x] SQLite Database
- [x] All API endpoints working
- [x] Email notifications
- [x] Admin panel
- [x] CORS configured

### ✅ Database Models
- [x] Contact Messages
- [x] Newsletter Subscribers  
- [x] Event Registrations
- [x] Blood Donation Records

### ✅ API Endpoints
- POST `/api/contact` - Contact form
- POST `/api/subscribe` - Newsletter
- POST `/api/register-event` - Events
- POST `/api/donate-blood` - Blood donation
- GET `/api/stats` - Statistics

### ✅ Features
- [x] Form submissions
- [x] Email confirmations
- [x] Data validation
- [x] Admin dashboard
- [x] Search & filtering

---

## 🎮 Server Management

### Start Server (if stopped)
**Windows:**
```bash
start_server.bat
```

**Mac/Linux:**
```bash
./start_server.sh
```

**Manual:**
```bash
python manage.py runserver
```

### Stop Server
Press `CTRL+C` in the terminal

---

## 📧 Email Configuration

### Current Status
⚠️ Email is configured but needs your Gmail credentials

### Setup Gmail (2 minutes)

1. **Enable 2-Step Verification**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Create password for "Mail"
   - Copy the 16-character password

3. **Update .env file**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   CONTACT_EMAIL=info@studentorg.edu
   ```

4. **Restart server** to apply changes

---

## 🧪 Test the Application

### Option 1: Use the Website
1. Open `index.html`
2. Fill out contact form
3. Check admin panel for submission

### Option 2: Test API with curl

**Contact Form:**
```bash
curl -X POST http://127.0.0.1:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test"
  }'
```

**Newsletter:**
```bash
curl -X POST http://127.0.0.1:8000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## 🗄️ Database Management

### View Database
The database file is: `db.sqlite3`

**View with Admin Panel:**
```
http://127.0.0.1:8000/admin/
```

**Or use DB Browser:**
Download: https://sqlitebrowser.org/

### Reset Database
```bash
# Delete database
rm db.sqlite3

# Recreate
python manage.py migrate

# Create new admin
python create_superuser.py
```

---

## 📁 Project Structure

```
muchatrodol/
├── api/                    # Django app
│   ├── models.py          # Database models
│   ├── views.py           # API endpoints
│   ├── serializers.py     # Data validation
│   ├── urls.py            # API routes
│   └── admin.py           # Admin config
├── backend/               # Django project
│   ├── settings.py        # Configuration
│   └── urls.py            # Main routes
├── .venv/                 # Python virtual env
├── db.sqlite3             # Database
├── manage.py              # Django manager
├── index.html             # Website
├── script.js              # Frontend JS
├── style.css              # Styles
├── .env                   # Environment vars
└── requirements.txt       # Python packages
```

---

## 🛠️ Common Tasks

### Create New Admin User
```bash
python manage.py createsuperuser
```

### Apply Database Changes
```bash
python manage.py makemigrations
python manage.py migrate
```

### Install Dependencies (fresh install)
```bash
pip install -r requirements.txt
```

### Check Server Status
Visit: http://127.0.0.1:8000/api/stats

---

## 🔧 Troubleshooting

### Server won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /F /PID <process_id>

# Or use different port
python manage.py runserver 8001
```

### Frontend not connecting
1. Check `script.js` line 655:
   ```javascript
   const API_URL = 'http://localhost:8000/api';
   ```
2. Ensure CORS is enabled in `backend/settings.py`

### Database errors
```bash
# Reset migrations
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
python manage.py makemigrations
python manage.py migrate
```

### Email not working
1. Check `.env` file has correct credentials
2. Verify Gmail app password (not regular password)
3. Check terminal for email errors

---

## 📊 Admin Panel Features

### Access
```
URL: http://127.0.0.1:8000/admin/
Username: admin
Password: admin123
```

### What You Can Do
- ✅ View all contact messages
- ✅ Manage newsletter subscribers
- ✅ Track event registrations
- ✅ Monitor blood donations
- ✅ Search and filter data
- ✅ Export data
- ✅ Update submission status

---

## 🚀 Deployment (Production)

### Prepare for Production
1. Update `backend/settings.py`:
   ```python
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com']
   SECRET_KEY = 'your-secret-key'  # Generate new!
   ```

2. Install production server:
   ```bash
   pip install gunicorn
   ```

3. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

4. Run with gunicorn:
   ```bash
   gunicorn backend.wsgi:application
   ```

### Recommended Hosting
- **Heroku** (easiest)
- **PythonAnywhere** (free tier available)
- **DigitalOcean** (scalable)
- **AWS/Azure** (enterprise)

---

## 📚 Documentation

- **Django:** https://docs.djangoproject.com/
- **REST Framework:** https://www.django-rest-framework.org/
- **Python:** https://docs.python.org/3/

---

## ✨ Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Contact Form | ✅ Working | Email notifications enabled |
| Newsletter | ✅ Working | Duplicate prevention |
| Event Registration | ✅ Working | Confirmation emails |
| Blood Donation | ✅ Working | Blood type validation |
| Admin Panel | ✅ Working | Full CRUD operations |
| Email System | ⚠️ Configured | Needs Gmail credentials |
| Database | ✅ Working | SQLite (can upgrade) |
| API Documentation | ✅ Complete | See above |

---

## 🎯 Next Steps

1. ✅ **Test the forms** - Open index.html and try submitting
2. ⚠️ **Configure email** - Add Gmail credentials to .env
3. ✅ **Check admin panel** - Login and view submissions
4. 📝 **Customize** - Modify models/views as needed
5. 🚀 **Deploy** - When ready for production

---

## 💡 Tips

- Keep server running while testing
- Check admin panel to verify submissions
- Terminal shows all API requests
- Database auto-saves all data
- Email errors appear in terminal

---

## 🆘 Need Help?

1. Check terminal for error messages
2. Verify server is running (http://127.0.0.1:8000/)
3. Review Django logs
4. Check `.env` configuration
5. Ensure all packages installed

---

**🎉 Your project is complete and ready to use!**

**Current Status:**
- ✅ Django server running on port 8000
- ✅ Database created and migrated
- ✅ Admin user created (admin/admin123)
- ✅ All API endpoints functional
- ✅ Frontend connected to backend
- ⚠️ Email needs configuration

**Just open `index.html` and start using the application!**
