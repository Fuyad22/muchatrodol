const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_READY = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

const sliderContent = [
    {
        type: 'hero',
        title: 'Welcome to Our MU Chatrodol',
        subtitle: 'Empowering students, Education Unity Progress',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
        link: '#about',
        cta_text: 'Learn More',
        order: 0
    },
    {
        type: 'hero',
        title: 'Join Our Community',
        subtitle: 'Connect, collaborate, and grow together',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600',
        link: '#events',
        cta_text: 'Get Involved',
        order: 1
    },
    {
        type: 'hero',
        title: 'Make a Difference',
        subtitle: 'Contribute to meaningful causes and initiatives',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600',
        link: '#contact',
        cta_text: 'Explore Projects',
        order: 2
    }
];

const events = [
    {
        id: 1,
        title: 'Blood Donation Camp',
        date: '2026-02-15',
        start_time: '09:00:00',
        end_time: '16:00:00',
        location: 'Main Campus Hall',
        description: 'Join us for our quarterly blood donation drive. Save lives!',
        image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200',
        is_active: true,
        show_in_slider: true,
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Leadership Workshop',
        date: '2026-02-20',
        start_time: '14:00:00',
        end_time: '17:00:00',
        location: 'Conference Room A',
        description: 'Develop your leadership skills with expert facilitators.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString()
    },
    {
        id: 3,
        title: 'Annual Cultural Festival',
        date: '2026-02-28',
        start_time: '10:00:00',
        end_time: '20:00:00',
        location: 'University Grounds',
        description: 'Celebrate diversity with music, dance, food, and more!',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString()
    }
];

const news = [
    {
        id: 1,
        title: 'Record-Breaking Blood Donation Drive',
        slug: 'blood-drive-success',
        image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=Blood+Drive+Success',
        excerpt: 'Our latest blood donation camp collected 150 units, helping save over 450 lives. Thank you to all our amazing donors!',
        content: 'A community effort with strong turnout from students and volunteers.',
        author: 'Admin',
        published_date: new Date('2026-01-05T10:00:00Z').toISOString(),
        is_published: true,
        show_in_slider: true
    },
    {
        id: 2,
        title: 'Partnership with Local Hospital',
        slug: 'hospital-partnership',
        image: 'https://via.placeholder.com/400x250/f093fb/ffffff?text=New+Partnership',
        excerpt: 'We\'re excited to announce our new partnership with City Hospital for enhanced healthcare initiatives.',
        content: 'This partnership strengthens our blood donation and health outreach programs.',
        author: 'Admin',
        published_date: new Date('2025-12-28T10:00:00Z').toISOString(),
        is_published: true,
        show_in_slider: false
    },
    {
        id: 3,
        title: 'Best Student Organization Award',
        slug: 'award-ceremony',
        image: 'https://via.placeholder.com/400x250/4facfe/ffffff?text=Award+Ceremony',
        excerpt: 'Proud to receive the Best Student Organization Award for our outstanding community service efforts!',
        content: 'The award recognizes the dedication of our members and volunteers.',
        author: 'Admin',
        published_date: new Date('2025-12-15T10:00:00Z').toISOString(),
        is_published: true,
        show_in_slider: false
    }
];

const team = [
    {
        id: 1,
        name: 'Kawser Ahmed',
        position: 'president',
        position_display: 'President',
        bio: 'Leading the organization with dedication and a focus on service.',
        achievements: 'Led 20+ successful events',
        photo: '',
        email: 'kawser.ahmed@studentorg.edu',
        phone: '+880 171-1111111',
        is_active: true,
        order: 0
    },
    {
        id: 2,
        name: 'Abu Tanim',
        position: 'vice_president',
        position_display: 'Vice President',
        bio: 'Coordinating all organizational activities and supporting various committees.',
        achievements: 'Coordinated 15+ major events',
        photo: '',
        email: 'abu.tanim@studentorg.edu',
        phone: '+880 171-2222222',
        is_active: true,
        order: 1
    },
    {
        id: 3,
        name: 'Fuyad Hassan',
        position: 'secretary',
        position_display: 'Senior Joint Secretary',
        bio: 'Ensures all organizational communications run smoothly.',
        achievements: 'Improved response time by 60%',
        photo: '',
        email: 'fuyad.hassan@studentorg.edu',
        phone: '+880 171-3333333',
        is_active: true,
        order: 2
    },
    {
        id: 4,
        name: 'Naimur Rahman Nafees',
        position: 'treasurer',
        position_display: 'Organizing Secretary',
        bio: 'Manages planning and the financial coordination of activities.',
        achievements: 'Secured $30,000 in grants',
        photo: '',
        email: 'snaimur.rahman@studentorg.edu',
        phone: '',
        is_active: true,
        order: 3
    },
    {
        id: 5,
        name: 'Md Jakaria Ahmed',
        position: 'event_coordinator',
        position_display: 'Senior Vice President',
        bio: 'Brings creativity and meticulous planning to every event.',
        achievements: 'Organized 25+ events',
        photo: '',
        email: 'jakaria.ahmed@studentorg.edu',
        phone: '',
        is_active: true,
        order: 4
    },
    {
        id: 6,
        name: 'Marjan Ahmed Shimul',
        position: 'public_relations',
        position_display: 'Joint Secretary',
        bio: 'Manages our public image and builds strong relationships.',
        achievements: 'Grew social media following to 5000+',
        photo: '',
        email: 'marjan.ahmed@studentorg.edu',
        phone: '',
        is_active: true,
        order: 5
    },
    {
        id: 7,
        name: 'Emad Ahmed Rigve',
        position: 'public_relations',
        position_display: 'Literature and Publishing Secretary',
        bio: 'Passionate about community engagement and brand storytelling.',
        achievements: 'Launched successful campus campaign',
        photo: '',
        email: 'emad.ahmed@studentorg.edu',
        phone: '',
        is_active: true,
        order: 6
    },
    {
        id: 8,
        name: 'Ishtiaq Uddin Shafi',
        position: 'public_relations',
        position_display: 'Office Secretary',
        bio: 'Specializes in digital media and content creation.',
        achievements: 'Created viral social media content',
        photo: '',
        email: 'ishtiaq.shafi@studentorg.edu',
        phone: '',
        is_active: true,
        order: 7
    },
    {
        id: 9,
        name: 'Ashraf Ahmed',
        position: 'vice_president',
        position_display: 'Vice President',
        bio: 'Connects with local student bodies and organizations.',
        achievements: 'Established 5 new partnerships',
        photo: '',
        email: 'ashraf.ahmed@studentorg.edu',
        phone: '',
        is_active: true,
        order: 8
    },
    {
        id: 10,
        name: 'Rifat Ahmed',
        position: 'vice_president',
        position_display: 'Vice President',
        bio: 'Expert in press releases and media communication.',
        achievements: 'Got featured in local newspaper',
        photo: '',
        email: 'rifat.ahmed@studentorg.edu',
        phone: '',
        is_active: true,
        order: 9
    },
    {
        id: 11,
        name: 'Nadir Hossain',
        position: 'public_relations',
        position_display: 'Co Organizing Secretary',
        bio: 'Focuses on internal communication and member engagement.',
        achievements: 'Increased member participation by 30%',
        photo: '',
        email: 'nadir.hossain@studentorg.edu',
        phone: '',
        is_active: true,
        order: 10
    },
    {
        id: 12,
        name: 'Muzaddid Chowdhury',
        position: 'public_relations',
        position_display: 'Joint Secretary',
        bio: 'Coordinates outreach programs and volunteer activities.',
        achievements: 'Organized 3 successful outreach events',
        photo: '',
        email: 'muzaddid.chowdhury@studentorg.edu',
        phone: '',
        is_active: true,
        order: 11
    },
    {
        id: 13,
        name: 'Rahib',
        position: 'public_relations',
        position_display: 'Broadcasting Secretary',
        bio: 'Dedicated to spreading our mission across campus.',
        achievements: 'Recruited 50+ new volunteers',
        photo: '',
        email: 'rahib@studentorg.edu',
        phone: '',
        is_active: true,
        order: 12
    },
    {
        id: 14,
        name: 'Ishtiaq Uddin Jamee',
        position: 'member',
        position_display: 'Member',
        bio: 'Assists in event promotion and marketing materials.',
        achievements: 'Designed posters for annual fest',
        photo: '',
        email: 'ishtiaq.jamee@studentorg.edu',
        phone: '',
        is_active: true,
        order: 13
    },
    {
        id: 15,
        name: 'Fahim Sadi',
        position: 'member',
        position_display: 'Member',
        bio: 'Engages with online community and manages forums.',
        achievements: 'Moderated 2 online webinars',
        photo: '',
        email: 'fahim.sadi@studentorg.edu',
        phone: '',
        is_active: true,
        order: 14
    },
    {
        id: 16,
        name: 'Priobroto Drubo',
        position: 'member',
        position_display: 'Volunteer',
        bio: 'Supports the PR team in various administrative tasks.',
        achievements: 'Volunteer of the month - June',
        photo: '',
        email: 'priobroto.drubo@studentorg.edu',
        phone: '',
        is_active: true,
        order: 15
    }
];

const gallery = [
    {
        id: 1,
        title: 'Annual Gathering 2025',
        description: 'Our biggest event of the year',
        image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Annual+Gathering',
        category: 'events',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 0
    },
    {
        id: 2,
        title: 'Spring Blood Drive',
        description: 'Saving lives together',
        image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Blood+Drive',
        category: 'blood-drive',
        is_active: true,
        show_in_slider: true,
        created_at: new Date().toISOString(),
        order: 1
    },
    {
        id: 3,
        title: 'Community Cleanup',
        description: 'Making a difference',
        image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Community+Service',
        category: 'community',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 2
    },
    {
        id: 4,
        title: 'Leadership Workshop',
        description: 'Skills for success',
        image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Workshop',
        category: 'workshops',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 3
    },
    {
        id: 5,
        title: 'Awards Ceremony',
        description: 'Celebrating achievements',
        image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Awards+Night',
        category: 'events',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 4
    },
    {
        id: 6,
        title: 'Donor Appreciation',
        description: 'Thanking our heroes',
        image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Donor+Appreciation',
        category: 'blood-drive',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 5
    },
    {
        id: 7,
        title: 'Food Drive Campaign',
        description: 'Fighting hunger',
        image: 'https://via.placeholder.com/400x300/14b8a6/ffffff?text=Food+Drive',
        category: 'community',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 6
    },
    {
        id: 8,
        title: 'Study Sessions',
        description: 'Learning together',
        image: 'https://via.placeholder.com/400x300/f97316/ffffff?text=Study+Session',
        category: 'workshops',
        is_active: true,
        show_in_slider: false,
        created_at: new Date().toISOString(),
        order: 7
    }
];

const faqs = [
    {
        id: 1,
        question: 'How can I become a member?',
        answer: 'Simply subscribe to our newsletter or contact us directly. We welcome all students who are passionate about making a difference!',
        category: 'membership',
        is_active: true,
        order: 0
    },
    {
        id: 2,
        question: 'Who can donate blood?',
        answer: 'Anyone between 18-65 years, weighing at least 50kg, and in good health can donate. Please consult with our medical team during the drive.',
        category: 'blood-donation',
        is_active: true,
        order: 1
    },
    {
        id: 3,
        question: 'How often do you organize events?',
        answer: 'We organize events throughout the year, including blood donation drives, workshops, and community service activities.',
        category: 'events',
        is_active: true,
        order: 2
    },
    {
        id: 4,
        question: 'Is library access free for students?',
        answer: 'Yes. Our library resources are available to students at no cost, with both physical and digital materials available.',
        category: 'library',
        is_active: true,
        order: 3
    }
];

function buildTimeString(value) {
    if (!value) return '';
    return value.slice(0, 5);
}

async function sendOptionalMail(mailOptions) {
    if (!EMAIL_READY) {
        return false;
    }

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.warn('Email send failed:', error.message);
        return false;
    }
}

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

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Student Organization API',
        endpoints: [
            '/api/slider-content',
            '/api/events',
            '/api/news',
            '/api/team',
            '/api/gallery',
            '/api/faqs',
            '/api/contact',
            '/api/subscribe',
            '/api/register-event',
            '/api/donate-blood',
            '/api/stats'
        ]
    });
});

app.get('/api/slider-content', (req, res) => {
    res.json({
        success: true,
        count: sliderContent.length,
        slides: sliderContent
    });
});

app.get('/api/events', (req, res) => {
    res.json({
        success: true,
        events: events.map(event => ({
            ...event,
            start_time: buildTimeString(event.start_time),
            end_time: buildTimeString(event.end_time)
        }))
    });
});

app.get('/api/news', (req, res) => {
    const limit = Number.parseInt(req.query.limit, 10);
    const items = Number.isFinite(limit) && limit > 0 ? news.slice(0, limit) : news;

    res.json({
        success: true,
        news: items
    });
});

app.get('/api/team', (req, res) => {
    res.json({
        success: true,
        team
    });
});

app.get('/api/gallery', (req, res) => {
    const category = req.query.category;
    const items = category ? gallery.filter(item => item.category === category) : gallery;

    res.json({
        success: true,
        gallery: items
    });
});

app.get('/api/faqs', (req, res) => {
    res.json({
        success: true,
        faqs
    });
});

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
        await sendOptionalMail(mailOptions);

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
                    <div style="background: linear-gradient(135deg, #0b703e 0%, #064022 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
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

        await sendOptionalMail(mailOptions);

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

        await sendOptionalMail(adminMailOptions);

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
        const { name, email, phone, eventId, event_id, additional, additional_info } = req.body;
        const normalizedEventId = eventId || event_id;

        // Validation
        if (!name || !email || !normalizedEventId) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and event are required'
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
                            <h3 style="color: #0b703e; margin-top: 0;">Registration Details</h3>
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

        await sendOptionalMail(mailOptions);

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
        const { name, email, phone, bloodType, blood_type, age, address, medical_conditions } = req.body;
        const normalizedBloodType = bloodType || blood_type;

        // Validation
        if (!name || !email || !normalizedBloodType || !age || !address) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, blood type, age, and address are required'
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

        await sendOptionalMail(mailOptions);

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
            totalMembers: team.length,
            eventsThisYear: events.length,
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
