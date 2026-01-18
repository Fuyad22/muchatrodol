# Student Organization Website

A modern, full-stack website for a student organization featuring dynamic UI, backend integration, email notifications, and comprehensive form handling.

## 🌟 Features

### Frontend Features

#### Dynamic Navigation
- Responsive navbar with mobile hamburger menu
- Smooth scroll to sections
- Active link highlighting
- Theme toggle (dark mode)
- Sticky navigation

#### Hero Slider
- Auto-playing carousel with 3 slides
- Manual navigation (prev/next buttons)
- Dot indicators
- Pause on hover
- Smooth transitions

#### Content Sections
- **About** - Organization description and team members
- **Team Members** - 6 member cards with detailed modal popups
- **Blood Donation** - Information and registration
- **Events** - Upcoming events with registration modal
- **News** - Latest updates with social sharing
- **Gallery** - Photo gallery with filters and lightbox
- **Library** - Resource categories
- **Contact** - Contact form with validation
- **FAQ** - Accordion-style questions

#### Interactive Elements
- Member modal with full details
- Event registration modal
- Newsletter subscription modal
- Video modal for YouTube embeds
- Image lightbox
- Toast notifications
- Scroll to top button
- Cookie consent banner
- Loading spinner
- Floating share bar

### Backend Features

#### API Endpoints
- **POST /api/contact** - Contact form submission
- **POST /api/subscribe** - Newsletter subscription
- **POST /api/register-event** - Event registration
- **POST /api/donate-blood** - Blood donor registration
- **GET /api/stats** - Organization statistics

#### Email Integration
- Automatic email notifications
- Contact form emails
- Welcome emails for subscribers
- Event registration confirmations
- Blood donation confirmations
- HTML email templates

#### Features
- Form validation (server-side)
- Error handling
- Email service integration (Gmail/SMTP)
- CORS enabled
- Environment variable configuration

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- Gmail account (for email service)

### Installation

1. **Clone or download the repository**
```bash
cd muchatrodol
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Edit `.env` file with your settings:
```env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=info@studentorg.edu
```

4. **Set up Gmail App Password**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate password for "Mail"
   - Use this in `.env` as `EMAIL_PASSWORD`

5. **Start the server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

6. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
muchatrodol/
├── index.html              # Main HTML file
├── style.css              # Styles and responsive design
├── script.js              # Frontend JavaScript
├── server.js              # Backend Express server
├── database.js            # MongoDB models (optional)
├── package.json           # Dependencies
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── BACKEND_SETUP.md      # Detailed backend guide
├── README.md             # This file
├── manifest.json         # PWA manifest
├── service-worker.js     # PWA service worker
├── robots.txt            # SEO robots file
└── sitemap.xml           # SEO sitemap

```

## 🔧 Configuration

### Email Service Setup

The backend uses Nodemailer for sending emails. Configure in `.env`:

**Gmail (Recommended):**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**Other SMTP:**
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.example.com
SMTP_PORT=587
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

### Database Setup (Optional)

To store form submissions in MongoDB:

1. Install MongoDB locally or use MongoDB Atlas
2. Install mongoose: `npm install mongoose`
3. Uncomment database code in `server.js`
4. Add to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/student_org
```

See `database.js` for complete database schemas.

## 📧 Testing

### Test Backend API

```bash
# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","subject":"Test","message":"Testing API"}'

# Test subscribe endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

### Check Email Configuration
When you start the server, look for:
```
✅ Email server is ready to send messages
```

If you see an error, check your `.env` email settings.

## 🎨 Customization

### Update Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #ef4444;
}
```

### Update Content
- Team members: Edit `index.html` member cards (lines 146-193)
- Events: Edit events section
- Gallery: Add images to gallery section
- Contact info: Update contact section

### Update Email Templates
Edit email HTML in `server.js` for each endpoint

## 🌐 Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
git push heroku main
```

### Railway/Render
1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically

### Important for Production
- Set `NODE_ENV=production`
- Use HTTPS
- Add rate limiting
- Enable CORS only for your domain
- Use strong passwords/secrets
- Regular backups

## 🔒 Security

- Environment variables for sensitive data
- Input validation on server
- CORS protection
- No credentials in code
- `.gitignore` for `.env`

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🐛 Troubleshooting

### Email not sending
- Check `.env` EMAIL_USER and EMAIL_PASSWORD
- Use Gmail App Password, not regular password
- Check spam folder
- Look at server console for errors

### Port already in use
- Change PORT in `.env`
- Or kill process: `taskkill /F /IM node.exe` (Windows)

### CORS errors
- Check FRONTEND_URL in `.env`
- Ensure server is running

## 📚 Documentation

- [Backend Setup Guide](BACKEND_SETUP.md) - Detailed backend documentation
- [Features List](FEATURES.md) - Complete feature documentation
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Technical details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License

MIT License - feel free to use for your organization

## 👥 Support

For issues or questions:
- Check documentation files
- Review server console logs
- Test API endpoints
- Verify `.env` configuration

## 🎯 Next Steps

- [ ] Set up database (MongoDB/MySQL)
- [ ] Add admin dashboard
- [ ] Implement user authentication
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure automated backups
- [ ] Add payment integration (for events)
- [ ] Implement advanced analytics

## 📦 Technologies Used

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Responsive design
- PWA support

**Backend:**
- Node.js
- Express.js
- Nodemailer
- dotenv

**Optional:**
- MongoDB (database)
- Mongoose (ODM)

---

Made with ❤️ for Student Organizations

For more information, see [BACKEND_SETUP.md](BACKEND_SETUP.md)
- Fully responsive design
- Modern UI/UX

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (Vanilla)
- Font Awesome Icons

## How to Use

1. Open `index.html` in a web browser
2. Navigate through different sections using the navbar
3. Click the Subscribe button to open the newsletter modal
4. Explore the slider with auto-play and manual controls
5. View team members and organization information
6. Fill out the contact form to send a message

## Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #ef4444;
    /* ... other colors */
}
```

### Team Members
Edit the member cards in `index.html` in the About section to add your actual team members.

### Slider Content
Modify the slide content in `index.html` within the `.slider-container` section.

### Contact Information
Update the contact details in the Contact section with your actual information.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for educational purposes.
