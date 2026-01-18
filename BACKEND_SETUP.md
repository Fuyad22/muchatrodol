# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Gmail account or other email service for sending emails

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **cors** - Enable cross-origin requests
- **nodemailer** - Send emails
- **body-parser** - Parse request bodies
- **dotenv** - Environment variable management

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` file with your settings:
```env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=info@studentorg.edu
```

### 3. Gmail Setup (Recommended)

#### Option A: App Passwords (Most Secure)
1. Go to [Google Account](https://myaccount.google.com/)
2. Click **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Use this in `.env` as `EMAIL_PASSWORD`

#### Option B: Less Secure Apps (Not Recommended)
1. Go to [Less secure app access](https://myaccount.google.com/lesssecureapps)
2. Turn on "Allow less secure apps"
3. Use your regular Gmail password in `.env`

### 4. Start the Server

Development mode (auto-restart on changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on http://localhost:3000

## API Endpoints

### POST /api/contact
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question",
  "message": "Your message here"
}
```

### POST /api/subscribe
Subscribe to newsletter
```json
{
  "email": "subscriber@example.com"
}
```

### POST /api/register-event
Register for an event
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "eventId": "Annual Conference"
}
```

### POST /api/donate-blood
Register for blood donation
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "bloodType": "O+",
  "lastDonation": "2023-01-15"
}
```

### GET /api/stats
Get organization statistics
```json
{
  "success": true,
  "data": {
    "totalMembers": 150,
    "eventsThisYear": 25,
    "bloodUnitsCollected": 500,
    "volunteersActive": 75
  }
}
```

## Testing

### Test Email Configuration
```bash
node -e "require('./server.js')"
```

Look for: `✅ Email server is ready to send messages`

### Test API Endpoints

Using curl:
```bash
# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing"}'

# Test subscribe endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

Or use the frontend forms after starting the server.

## Troubleshooting

### Email Not Sending
- Check `.env` file has correct credentials
- For Gmail, ensure App Password is used (not regular password)
- Check spam folder for test emails
- Look at server console for error messages

### Port Already in Use
Change `PORT` in `.env` to a different number (e.g., 3001, 8080)

### CORS Errors
- Ensure frontend is running on localhost
- Check `FRONTEND_URL` in `.env` matches your frontend URL

## Production Deployment

### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
git push heroku main
```

### Vercel/Netlify
These platforms are for static sites. Consider:
- Using serverless functions
- Or deploy backend to Heroku/Railway/Render
- Update `API_URL` in `script.js`

### Environment Variables
Never commit `.env` to git! Always:
1. Keep `.env` in `.gitignore`
2. Set variables in hosting platform dashboard
3. Use `.env.example` as template for team members

## Database Integration (Optional)

To store form submissions:

### MongoDB
```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Subscriber = mongoose.model('Subscriber', {
  email: String,
  subscribedAt: { type: Date, default: Date.now }
});
```

### MySQL
```bash
npm install mysql2
```

```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
```

## Security Best Practices

1. **Never expose credentials** - Use environment variables
2. **Validate input** - Server already validates required fields
3. **Rate limiting** - Add `express-rate-limit` for production
4. **HTTPS** - Always use HTTPS in production
5. **CORS** - Restrict to your domain in production

## Support

For issues:
1. Check server console logs
2. Check browser console (F12)
3. Verify `.env` configuration
4. Test email credentials separately

## Next Steps

- [ ] Set up database for storing submissions
- [ ] Add admin dashboard
- [ ] Implement user authentication
- [ ] Add rate limiting
- [ ] Set up monitoring/logging
- [ ] Configure backup system
