import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken';

import Job from './jobs.js'
import Company from './company.js';
import JobAspirant from './jobaspirant.js';
import verifyToken from './authMiddleware.js';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import JobApplication from './jobApplication.js';

const app = express()
const port = process.env.PORT || 3000

dotenv.config()

//middleware
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// File storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Image upload route 
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image.' });
    }
    res.json({
        message: 'Image uploaded successfully',
        file: req.file,
        url: `http://localhost:${port}/uploads/${req.file.filename}` // respond with the static URL
    });
});

mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Create a new job
app.post('/api/post-job', verifyToken, async (req, res) => {
    try {
        // Get the company info from the token
        const company = await Company.findById(req.user.id);

        if (!company) {
            return res.status(401).json({ error: 'Unauthorized. Company not found.' });
        }

        // Check if a similar job already exists
        const existingJob = await Job.findOne({
            company: company._id,
            jobTitle: req.body.jobTitle,
            jobLocation: req.body.jobLocation,
        });

        if (existingJob) {
            return res.status(400).json({ error: 'This job has already been posted.' });
        }

        // Create the job with a reference to the company
        const newJob = new Job({
            ...req.body,
            company: company._id,
        });

        await newJob.save();

        res.status(201).json({
            message: 'Job created successfully',
            job: newJob,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// GET jobs with company logo and other info which are approved
app.get('/api/jobs', async (req, res) => {
    try {
        //const jobs = await Job.find().sort({ createdAt: -1 }).populate('company');
        const jobs = await Job.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'company',
                match: { isApproved: true }, // Only include companies that are approved
                select: 'name logoImage website description',
            });

        // Filter out jobs where the company is not approved (company will be null if not approved)
        const jobsWithCompanyData = jobs
            .filter(job => job.company)  // Remove jobs where company is not approved
            .map((job) => ({
                ...job.toObject(),
                company: {
                    name: job.company.name,
                    logoImage: job.company.logoImage,
                    website: job.company.website,
                    description: job.company.description,
                }
            }));

        res.status(200).json(jobsWithCompanyData);
    } catch (error) {
        console.error('Error fetching jobs with company info:', error);
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
            website,
            isApproved: false, // Default to false until admin approval
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
        const { name, email, password } = req.body;

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
            password: hashedPassword
        });

        // Save to database
        await newAspirant.save();

        res.status(201).json({ message: "Job aspirant registered successfully", aspirant: newAspirant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login 
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user is a company
        let user = await Company.findOne({ email });
        let role = 'company';

        if (!user) {
            // If not a company, check if it's a job aspirant
            user = await JobAspirant.findOne({ email });
            role = 'job_aspirant';
        }

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        //console.log("JWT_SECRET:", process.env.JWT_SECRET);

        res.status(200).json({ message: "Login successful", token, role, name: user.name, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Statistics page
app.get("/api/statistics", async (req, res) => {
    try {
        const totalJobaspirants = await JobAspirant.countDocuments();
        const totalCompany = await Company.countDocuments({ isApproved: true }); // Only count approved companies
        const totalJobs = await Job.countDocuments();

        res.json({ totalJobaspirants, totalCompany, totalJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all companies
app.get('/api/company', async (req, res) => {
    try {
        // Fetch all approved companies
        const companies = await Company.find({ isApproved: true });

        // Fetch job counts for each company
        const companiesWithJobCounts = await Promise.all(companies.map(async (company) => {
            const jobCount = await Job.countDocuments({ company: company._id });
            return {
                ...company.toObject(), // Convert Mongoose document to plain object
                jobCount
            };
        }));

        res.status(200).json(companiesWithJobCounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//////////////////////////////

//  Route to Get Current Job Aspirant
app.get('/api/job-aspirant/me', verifyToken, async (req, res) => {
    try {
        const user = await JobAspirant.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            name: user.name,
            profileImage: user.profileImage,
            cvImage: user.cvImage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Route to Update Job Aspirant Profile
app.put('/api/job-aspirant/update', verifyToken, upload.fields([
    { name: 'profileImage' },
    { name: 'cvImage' }
]), async (req, res) => {
    try {
        const user = await JobAspirant.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { name } = req.body;
        if (name) user.name = name;
        if (req.files['profileImage']) {
            user.profileImage = '/' + req.files['profileImage'][0].path;
        }
        if (req.files['cvImage']) {
            user.cvImage = '/' + req.files['cvImage'][0].path;
        }

        await user.save();
        res.json({
            name: user.name,
            profileImage: user.profileImage,
            cvImage: user.cvImage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.use('/uploads', express.static('uploads'));

// Get unique job titles
app.get('/api/job-types', async (req, res) => {
    try {
        const jobTypes = await Job.distinct("jobTitle");
        res.json(jobTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a preferred job type
app.post('/api/job-aspirant/add-preference', verifyToken, async (req, res) => {
    const { jobType } = req.body;
    try {
        const user = await JobAspirant.findById(req.user.id);
        if (!user.preferredJobTypes.includes(jobType)) {
            user.preferredJobTypes.push(jobType);
            await user.save();
        }
        res.json(user.preferredJobTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all matching jobs for the job aspirant
app.get('/api/job-aspirant/matching-jobs', verifyToken, async (req, res) => {
    try {
        const user = await JobAspirant.findById(req.user.id);
        const preferredTypes = user.preferredJobTypes || [];

        // Find IDs of jobs already applied by this user
        const appliedApplications = await JobApplication.find({ jobAspirant: req.user.id }).select('job');
        const appliedJobIds = appliedApplications.map(app => app.job.toString());

        const allMatchingJobs = await Job.find({
            $or: preferredTypes.map(type => ({
                jobTitle: { $regex: new RegExp(`^${type}$`, 'i') }  // case-insensitive exact match
            })),
            _id: { $nin: appliedJobIds }, // Exclude already applied jobs
            //'company.isApproved': true, 
        })
            .populate({
                path: 'company',
                select: 'name logoImage isApproved',
            })
            .sort({ createdAt: -1 });
        
        // Filter out jobs that do not have an approved company
        const filteredJobs = allMatchingJobs.filter(job => 
            job.company &&  // Check company exists
            job.company.isApproved === true // Verify approval
        );

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 2); // jobs added in last 2 days = "new"

        const newJobs = filteredJobs.filter(job => job.createdAt >= cutoffDate);
        const oldJobs = filteredJobs.filter(job => job.createdAt < cutoffDate);

        res.json({ newJobs, oldJobs, allMatchingJobs: filteredJobs, preferredJobTypes: user.preferredJobTypes });
        //res.json({ newJobs, oldJobs, allMatchingJobs });
        console.log("Preferred job types:", user.preferredJobTypes);
        console.log("Matched job titles:", filteredJobs.map(job => job.jobTitle));
        // console.log("New Jobs:", newJobs);
        // console.log("Old Jobs:", oldJobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Route to Get Current Company 
app.get('/api/company/me', verifyToken, async (req, res) => {
    try {
        const user = await Company.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'Company not found' });

        res.json({
            name: user.name,
            logoImage: user.logoImage,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Route to Update Company Profile
app.put('/api/company/update', verifyToken, upload.fields([
    { name: 'logoImage' }
]), async (req, res) => {
    try {
        const user = await Company.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'Company not found' });

        const oldName = user.name; // save the old name

        const { name } = req.body;
        if (name) user.name = name;
        if (req.files['logoImage']) {
            user.logoImage = '/' + req.files['logoImage'][0].path;
        }

        await user.save();

        res.json({
            name: user.name,
            logoImage: user.logoImage,
        });
        console.log('Old Company Name:', oldName);
        const jobsWithOldName = await Job.find({ companyName: oldName });
        console.log('Jobs found:', jobsWithOldName.length);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/uploads', express.static('uploads'));

// Apply job 
app.post('/api/apply-job', async (req, res) => {
    try {
        const { jobId, aspirantId } = req.body;
        console.log('Received:', { jobId, aspirantId });

        // Validate that the job and aspirant exist
        const job = await Job.findById(jobId);
        const aspirant = await JobAspirant.findById(aspirantId);

        if (!job || !aspirant) {
            return res.status(404).json({ message: 'Job or Job Aspirant not found' });
        }

        // Check if the aspirant has already applied for this job
        const existingApplication = await JobApplication.findOne({ job: jobId, jobAspirant: aspirantId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Create a new job application
        const application = new JobApplication({
            job: jobId,
            jobAspirant: aspirantId,
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all applied jobs for the job aspirant
app.get('/api/applied-jobs', verifyToken, async (req, res) => {
    try {
        const aspirantId = req.user.id;
        const applications = await JobApplication.find({ jobAspirant: aspirantId })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logoImage' // Only fetching name and logo
                }
            })
            .sort({ applicationDate: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        console.log("Error fetching applied jobs:", error);
        res.status(500).json({ message: 'Server error while fetching applied jobs' });
    }
});

// Remove applied job
app.delete('/api/remove-applied-job', verifyToken, async (req, res) => {
    try {
        const aspirantId = req.user.id;
        const { jobId } = req.body;

        const deleted = await JobApplication.findOneAndDelete({
            jobAspirant: aspirantId,
            job: jobId,
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application removed successfully' });
    } catch (error) {
        console.error('Error removing job application:', error);
        res.status(500).json({ message: 'Server error while removing job application' });
    }
});

// get all created jobs by company
app.get('/api/company/jobs', verifyToken, async (req, res) => {
    try {
        const companyId = req.user.id;

        const jobs = await Job.find({ company: companyId })
            .populate('company', 'name logoImage') // Populate company name and logo
            .sort({ createdAt: -1 }); // latest first

        res.status(200).json({ createdJobs: jobs });
    } catch (error) {
        console.error("Failed to fetch company jobs:", error);
        res.status(500).json({ message: "Failed to fetch company jobs" });
    }
})

// Updating a specific job
app.put('/api/company/update-job/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFields = {
            jobTitle: req.body.jobTitle,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            salaryType: req.body.salaryType,
            jobLocation: req.body.jobLocation,
            postingDate: req.body.postingDate,
            experienceLevel: req.body.experienceLevel,
            employmentType: req.body.employmentType,
            description: req.body.description,
        };

        const updatedJob = await Job.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// Deleting a specific job
app.delete('/api/company/delete-job/:jobId', verifyToken, async (req, res) => {
    try {
        const { jobId } = req.params;

        // First, delete the Job
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Then, delete all related JobApplications
        await JobApplication.deleteMany({ job: jobId });

        res.status(200).json({ message: 'Job and related applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

// Get all applications for a specific job
app.get('/api/company/job-applications/:jobId', verifyToken, async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log("Fetching applications for job ID:", jobId);

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid job ID" });
        }

        const applications = await JobApplication.find({ job: jobId })
            .populate('jobAspirant', 'name profileImage cvImage');

        if (!applications) {
            return res.status(404).json({ message: "No applications found" });
        }

        res.status(200).json(applications);

        console.log("Applications for job ID:", jobId, applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve a company
app.put('/api/approve-company/:id', async (req, res) => {
    try {
        const companyId = req.params.id;

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: "Company not found." });
        }

        // Update the approval status
        company.isApproved = true;
        await company.save();

        res.status(200).json({ message: "Company approved successfully", company });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`CareerSync app backend listening on port ${port}`)
}) 