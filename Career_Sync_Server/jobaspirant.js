import mongoose from 'mongoose';

const JobAspirantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resume: {
        type: String, // Store the file path or URL
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const JobAspirant = mongoose.model('JobAspirant', JobAspirantSchema);
export default JobAspirant;
