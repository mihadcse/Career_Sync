import mongoose from 'mongoose';

// Job Application Schema
const jobApplicationSchema = new mongoose.Schema({
  jobAspirant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobAspirant', // Reference to the JobAspirant model 
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
