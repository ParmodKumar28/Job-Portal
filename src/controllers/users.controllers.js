// User Model is imported here
import UserModel from '../models/users.model.js';
// Job Module
import JobsModel from '../models/jobs.model.js';
import path from 'path';
import sendMail from '../../middlewares/mailsend.middleware.js';


export default class UserController{
    // Rendering home
    getHome(req,res){
        res.render('index.ejs', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Function to post data after applying any job by applicant here
    postApplyJob(req, res) {
    const { name, email, contact } = req.body;
    const resume = 'applicants/' + req.file.filename;
    const jobId = req.params.jobId;

    // Check if the job exists
    if (!jobId) {
        return res.status(404).send('Job is not found here');
    } else {
        // Checking if the applicant has already applied for this job
        const alreadyApplied = UserModel.getApplicantBymail(jobId, email);
        sendMail(name,email);
        if (alreadyApplied) {
            return res.send("You have already applied for this Job");
        } else {
            UserModel.addJobApplicants(jobId, name, email, contact, resume);


            const allJobs = JobsModel.getAllJobs();
            return res.render('jobs', { allJobs, userEmail: req.session.userEmail, userName: req.session.userName });
        }
    }
}

    // Getting the applicants for a particular job if he apllied for this job here
    getApplicants(req,res){
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId);
        if(!job)
        {
            res.status(404).send("Job is not found here");
            return;
        }
        {
            res.render('applicants', {job ,userEmail : req.session.userEmail, userName : req.session.userName,});
        }
        
    }

    // Showing the applicant resume on clicking view Resume
    getApplicantResume(req, res) {
    console.log(req.params.applicantId);
    const applicantId = req.params.applicantId;
    const applicant = UserModel.getApplicantById(applicantId);
  
    if (!applicant) {
      res.status(404).send('Applicant not found');
    } else {
      const resumeFileName = applicant.resume;
      const resumeFilePath = path.join(__dirname, 'public/applicants', resumeFileName);
      console.log(resumeFilePath);
      res.sendFile(resumeFilePath);
    }
}
  

}