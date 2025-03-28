import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String },
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
