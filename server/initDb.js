const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const initializeDb = async () => {
    try {
        // Check if default user already exists
        const existingUser = await User.findOne({ username: 'siju' });
        
        if (!existingUser) {
            // Create default user
            const hashedPassword = await bcrypt.hash('12345678', 10);
            
            const defaultUser = new User({
                username: 'siju',
                password: hashedPassword,
                email: 'siju@example.com', // You can update this with your actual email
                phone: '1234567890',       // You can update this with your actual phone
                address: 'Default Address', // You can update this with your actual address
                visits: []
            });

            await defaultUser.save();
            console.log('Default user (siju) created successfully');
        } else {
            console.log('Default user already exists');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = initializeDb; 