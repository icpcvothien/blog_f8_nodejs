const mongoose = require('mongoose');

async function connect(){
    try {
        const uri = 'mongodb://localhost:27017/f8_education_dev';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connect: connect };
