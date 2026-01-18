// Database Models and Setup
// This file contains database schemas for MongoDB
// Install: npm install mongoose

const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_org', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Contact Message Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    repliedAt: Date
});

// Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed'],
        default: 'active'
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: Date
});

// Event Registration Schema
const eventRegistrationSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['registered', 'attended', 'cancelled'],
        default: 'registered'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    attendedAt: Date
});

// Blood Donor Schema
const bloodDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    lastDonation: Date,
    donationHistory: [{
        date: Date,
        location: String,
        units: Number
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'ineligible'],
        default: 'active'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

// Create indexes for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
subscriberSchema.index({ email: 1 });
eventRegistrationSchema.index({ eventId: 1, email: 1 });
bloodDonorSchema.index({ bloodType: 1, status: 1 });

// Create models
const Contact = mongoose.model('Contact', contactSchema);
const Subscriber = mongoose.model('Subscriber', subscriberSchema);
const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
const BloodDonor = mongoose.model('BloodDonor', bloodDonorSchema);

// Helper functions

// Save contact message
async function saveContactMessage(data) {
    try {
        const contact = new Contact(data);
        await contact.save();
        return { success: true, data: contact };
    } catch (error) {
        console.error('Error saving contact:', error);
        return { success: false, error: error.message };
    }
}

// Save subscriber
async function saveSubscriber(email) {
    try {
        const subscriber = await Subscriber.findOneAndUpdate(
            { email },
            { email, status: 'active', subscribedAt: new Date() },
            { upsert: true, new: true }
        );
        return { success: true, data: subscriber };
    } catch (error) {
        console.error('Error saving subscriber:', error);
        return { success: false, error: error.message };
    }
}

// Save event registration
async function saveEventRegistration(data) {
    try {
        const registration = new EventRegistration(data);
        await registration.save();
        return { success: true, data: registration };
    } catch (error) {
        console.error('Error saving event registration:', error);
        return { success: false, error: error.message };
    }
}

// Save blood donor
async function saveBloodDonor(data) {
    try {
        const donor = await BloodDonor.findOneAndUpdate(
            { email: data.email },
            { ...data, registeredAt: new Date() },
            { upsert: true, new: true }
        );
        return { success: true, data: donor };
    } catch (error) {
        console.error('Error saving blood donor:', error);
        return { success: false, error: error.message };
    }
}

// Get statistics
async function getStatistics() {
    try {
        const [
            totalSubscribers,
            totalContacts,
            totalRegistrations,
            totalDonors,
            activeDonors
        ] = await Promise.all([
            Subscriber.countDocuments({ status: 'active' }),
            Contact.countDocuments(),
            EventRegistration.countDocuments(),
            BloodDonor.countDocuments(),
            BloodDonor.countDocuments({ status: 'active' })
        ]);

        return {
            success: true,
            data: {
                totalSubscribers,
                totalContacts,
                totalRegistrations,
                totalDonors,
                activeDonors
            }
        };
    } catch (error) {
        console.error('Error getting statistics:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    connectDB,
    Contact,
    Subscriber,
    EventRegistration,
    BloodDonor,
    saveContactMessage,
    saveSubscriber,
    saveEventRegistration,
    saveBloodDonor,
    getStatistics
};
