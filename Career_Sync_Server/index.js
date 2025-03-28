import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'; // For password hashing

import Job from './jobs.js'
import Company from './company.js';
import JobAspirant from './jobaspirant.js';


const app = express()
const port = process.env.PORT || 3000

dotenv.config()

//middleware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Create a new job
app.post('/api/post-job', async (req, res) => {
    try {
        const jobData = req.body;

        // Check if a job with the same company name, job title, and location already exists
        const existingJob = await Job.findOne({
            companyName: jobData.companyName,
            jobTitle: jobData.jobTitle,
            jobLocation: jobData.jobLocation,
            minPrice: jobData.minPrice,
            maxPrice: jobData.maxPrice,
            salaryType: jobData.salaryType,
            postingDate: jobData.postingDate,
            experienceLevel: jobData.experienceLevel,
            employmentType: jobData.employmentType,
        });

        if (existingJob) {
            return res.status(400).json({ error: "This job has already been posted." });
        }

        // Create a new job instance
        const newJob = new Job(jobData);

        // Save to database
        await newJob.save();

        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all jobs 
app.get('/api/jobs', async (req, res) => {
    try {
        // Fetch all jobs from MongoDB
        const jobs = await Job.find();
        res.status(200).json(jobs);  // Send the fetched jobs as a response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Company Registration Route
app.post('/api/register-company', async (req, res) => {
    try {
        const { name, email, password, location, website } = req.body;

        // Check if the company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ error: "Company with this email already exists." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new company instance
        const newCompany = new Company({
            name,
            email,
            password: hashedPassword,
            location,
            website 
        });

        // Save to database
        await newCompany.save();

        res.status(201).json({ message: "Company registered successfully", company: newCompany });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Job Aspirant Registration Route
app.post('/api/register-job-aspirant', async (req, res) => {
    try {
        const { name, email, password, resume } = req.body;

        // Check if the aspirant already exists
        const existingAspirant = await JobAspirant.findOne({ email });
        if (existingAspirant) {
            return res.status(400).json({ error: "Job aspirant with this email already exists." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new job aspirant instance
        const newAspirant = new JobAspirant({
            name,
            email,
            password: hashedPassword,
            resume
        });

        // Save to database
        await newAspirant.save();

        res.status(201).json({ message: "Job aspirant registered successfully", aspirant: newAspirant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})