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
    profileImage: { type: String, default: "" },
    cvImage: { type: String, default: "" },  
}, { timestamps: true });

const JobAspirant = mongoose.model('JobAspirant', JobAspirantSchema);
export default JobAspirant;
