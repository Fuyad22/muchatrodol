const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Email configuration (using environment variables)
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('⚠️  Email configuration error:', error.message);
        console.log('   Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// API Routes

// 1. Contact Form Submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #059669;">New Contact Form Submission</h2>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 10px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <hr style="border: 1px solid #e5e7eb;">
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        This email was sent from your Student Organization website contact form.
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// 2. Newsletter Subscription
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Save to database (placeholder - implement your database logic)
        // await saveSubscriber(email);

        // Send welcome email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Student Organization Newsletter',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #059669 0%, #065f46 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Welcome Aboard! 🎉</h1>
                    </div>
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
                        <p style="font-size: 16px; color: #1f2937;">Hi there!</p>
                        <p style="font-size: 16px; color: #1f2937;">
                            Thank you for subscribing to our newsletter! You'll now receive updates about:
                        </p>
                        <ul style="color: #4b5563; line-height: 1.8;">
                            <li>Upcoming events and activities</li>
                            <li>Blood donation drives</li>
                            <li>Community service opportunities</li>
                            <li>Student organization news</li>
                            <li>Exclusive member benefits</li>
                        </ul>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://yourwebsite.com" style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                                Visit Our Website
                            </a>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">
                            If you didn't subscribe to this newsletter, you can safely ignore this email.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        // Also notify admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Newsletter Subscription',
            html: `
                <p><strong>New subscriber:</strong> ${email}</p>
                <p>Time: ${new Date().toLocaleString()}</p>
            `
        };

        await transporter.sendMail(adminMailOptions);

        res.json({
            success: true,
            message: 'Successfully subscribed! Check your email for confirmation.'
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again later.'
        });
    }
});

// 3. Event Registration
app.post('/api/register-event', async (req, res) => {
    try {
        const { name, email, phone, eventId } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Save to database (placeholder - implement your database logic)
        // await saveEventRegistration({ name, email, phone, eventId });

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Event Registration Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #059669; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Registration Confirmed! ✓</h1>
                    </div>
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
                        <p style="font-size: 16px; color: #1f2937;">Hi ${name},</p>
                        <p style="font-size: 16px; color: #1f2937;">
                            Thank you for registering for our event! We're excited to have you join us.
                        </p>
                        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #059669; margin-top: 0;">Registration Details</h3>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        </div>
                        <p style="color: #4b5563;">
                            You'll receive more details about the event closer to the date. 
                            If you have any questions, feel free to contact us.
                        </p>
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            See you at the event!<br>
                            Student Organization Team
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Registration successful! Check your email for confirmation.'
        });
    } catch (error) {
        console.error('Event registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register. Please try again later.'
        });
    }
});

// 4. Blood Donation Registration
app.post('/api/donate-blood', async (req, res) => {
    try {
        const { name, email, phone, bloodType, lastDonation } = req.body;

        // Validation
        if (!name || !email || !bloodType) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and blood type are required'
            });
        }

        // Save to database (placeholder)
        // await saveBloodDonorRegistration({ name, email, phone, bloodType, lastDonation });

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Blood Donation Registration - Thank You!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Thank You for Saving Lives! ❤️</h1>
                    </div>
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
                        <p style="font-size: 16px; color: #1f2937;">Dear ${name},</p>
                        <p style="font-size: 16px; color: #1f2937;">
                            Thank you for registering to donate blood! Your generosity can save up to three lives.
                        </p>
                        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
                            <h3 style="color: #ef4444; margin-top: 0;">Your Registration Details</h3>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                            <p><strong>Blood Type:</strong> ${bloodType}</p>
                        </div>
                        <h3 style="color: #059669;">What's Next?</h3>
                        <ol style="color: #4b5563; line-height: 1.8;">
                            <li>We'll contact you when our next blood drive is scheduled</li>
                            <li>Please ensure you're well-rested and hydrated before donating</li>
                            <li>Bring a valid ID on the day of donation</li>
                        </ol>
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                            Together, we can make a difference!<br>
                            Student Organization - Blood Donation Drive Team
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Registration successful! We\'ll contact you for the next blood drive.'
        });
    } catch (error) {
        console.error('Blood donation registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register. Please try again later.'
        });
    }
});

// 5. Get Statistics (for dashboard)
app.get('/api/stats', (req, res) => {
    // Placeholder - implement database queries
    res.json({
        success: true,
        data: {
            totalMembers: 150,
            eventsThisYear: 25,
            bloodUnitsCollected: 500,
            volunteersActive: 75
        }
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   Student Organization Backend Server          ║
╠════════════════════════════════════════════════╣
║                                                ║
║   🚀 Server running on port ${PORT}              ║
║   📧 Email service: ${process.env.EMAIL_SERVICE || 'gmail'}                     ║
║   🌐 http://localhost:${PORT}                   ║
║                                                ║
║   API Endpoints:                               ║
║   POST /api/contact                            ║
║   POST /api/subscribe                          ║
║   POST /api/register-event                     ║
║   POST /api/donate-blood                       ║
║   GET  /api/stats                              ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);
});

module.exports = app;
