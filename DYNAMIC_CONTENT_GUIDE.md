# Dynamic Content Guide

## Overview
Your website now loads **Events** and **News Articles** dynamically from the Django database. You can manage all content through the Django Admin Panel.

## 🎯 What's Dynamic Now

### 1. **Events Section**
- All events are loaded from the database
- Automatically formatted with date, time, location
- Register buttons linked to event titles

### 2. **News Section**
- Latest 3 news articles displayed
- Author, date, and social sharing included
- Responsive card layout

## 📝 Managing Content

### Access Admin Panel
1. Make sure both servers are running (use `LAUNCH.bat`)
2. Open: **http://localhost:8000/admin**
3. Login: `admin` / `admin123`

### Adding New Event
1. Go to Admin Panel → **Events** → **Add Event**
2. Fill in the fields:
   - **Title**: Event name (e.g., "Workshop on AI")
   - **Date**: Event date
   - **Start Time**: When it starts (e.g., 10:00)
   - **End Time**: When it ends (e.g., 15:00)
   - **Location**: Venue name
   - **Description**: Brief description
   - **Image**: URL to event image (optional)
   - **Is Active**: ✓ Check to show on website
3. Click **Save**
4. Refresh website - new event appears instantly!

### Adding News Article
1. Go to Admin Panel → **News Articles** → **Add News Article**
2. Fill in the fields:
   - **Title**: Article headline
   - **Slug**: URL-friendly name (auto-generated from title)
   - **Image**: Image URL (use Unsplash or upload your own)
   - **Excerpt**: Short summary (2-3 sentences)
   - **Content**: Full article text (supports paragraphs)
   - **Author**: Your name (default: Admin)
   - **Is Published**: ✓ Check to show on website
3. Click **Save**
4. Refresh website - new article appears!

## 🖼️ Finding Images

### Free Image Sources:
- **Unsplash**: https://unsplash.com/ (right-click → Copy Image Address)
- **Pexels**: https://www.pexels.com/
- **Pixabay**: https://pixabay.com/

### Example Image URLs:
```
Blood Donation: https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800
Leadership: https://images.unsplash.com/photo-1552664730-d307ca884978?w=800
Festival: https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800
Hospital: https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800
Award: https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800
```

## 🔄 Sample Data Script

Run this to reset and add sample data:
```bash
.venv\Scripts\python.exe add_sample_data.py
```

This will:
- Clear existing events and news
- Add 3 sample events
- Add 3 sample news articles

## 📱 Responsive Layout

The website is fully responsive:
- **Desktop**: Multi-column grid layout
- **Tablet**: 2-column layout
- **Mobile**: Single column, optimized cards

## 🎨 Customization

### Event Card Colors
Edit in `style.css`:
```css
.event-card {
    background: white; /* Change card background */
}
.event-date {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Change date badge */
}
```

### News Card Layout
Edit in `style.css`:
```css
.news-card {
    border-radius: 12px; /* Card roundness */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Shadow */
}
```

## 🚀 API Endpoints

Your backend provides these APIs:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events` | GET | Get all active events |
| `/api/news` | GET | Get all published news |
| `/api/news?limit=3` | GET | Get latest 3 news articles |
| `/api/news/<slug>` | GET | Get single article by slug |
| `/api/contact` | POST | Submit contact form |
| `/api/subscribe` | POST | Subscribe to newsletter |
| `/api/register-event` | POST | Register for event |
| `/api/donate-blood` | POST | Register blood donation |
| `/api/stats` | GET | Get statistics |

## 💡 Tips

1. **Keep Excerpts Short**: 100-150 characters work best
2. **Use High-Quality Images**: Minimum 800px width recommended
3. **Update Regularly**: Fresh content keeps visitors engaged
4. **Test Mobile View**: Use browser DevTools (F12) to preview mobile layout
5. **Backup Database**: Copy `db.sqlite3` before making major changes

## 🛠️ Troubleshooting

### Events/News Not Showing?
1. Check if items are marked as **Active/Published** in admin
2. Verify both servers are running
3. Check browser console (F12) for errors
4. Clear browser cache (Ctrl+Shift+R)

### Images Not Loading?
1. Verify image URL is accessible
2. Use `https://` URLs, not `http://`
3. Try different image source

### Changes Not Appearing?
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Check if you saved changes in admin panel
3. Verify correct server ports (3000 for frontend, 8000 for backend)

## 📞 Support

For more help:
1. Check browser console (F12) for JavaScript errors
2. Check terminal windows for server errors
3. Review Django admin panel for data validation errors

---

**Ready to manage your dynamic website! 🎉**
