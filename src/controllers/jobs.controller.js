// Jobs Model Imported Here
import JobsModel from "../models/jobs.model.js";

export default class JobController{
    getJobs(req,res){
        const allJobs = JobsModel.getAllJobs();
        res.render('jobs', {allJobs, userEmail : req.session.userEmail, userName : req.session.userName,});
    }
        getPostJob(req,res){
        // res.render('404page');
        res.render('post-new-job', {userEmail : req.session.userEmail, userName : req.session.userName,})
    }

    postJobs(req,res){
        const {category,designation,location,company,salary,openings,skills,date} = req.body;
        JobsModel.addJob(category,designation,location,company,salary,openings,skills,date);
        const allJobs = JobsModel.getAllJobs();
        console.log(allJobs);
        res.render('jobs',{allJobs, userEmail : req.session.userEmail, userName : req.session.userName,});

    }
    
    getJobPage(req,res){
        // To get the job id here
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId); 
        if(!job){
            res.status(404).send("Job not found");
        }
        else{
            res.render('job-page', {job,userEmail : req.session.userEmail, userName : req.session.userName,});
        } 
    }

    // Function to get update for of the job
    getJobUpdate(req,res){
        // Job id
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId);
        if(!job){
            res.status(404).send("Job not found");
        }
        else{

            res.render('update-job', {job,userEmail : req.session.userEmail, userName : req.session.userName,});
        }
    }

    // Function to update the job
    postJobUpdate(req,res){
        const job = req.body;
        JobsModel.updateJob(job);
        const allJobs = JobsModel.getAllJobs();
        console.log(allJobs);
        res.render('jobs',{allJobs, userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Function to delete the job
    deleteJob(req, res) {
    const jobId = req.params.jobId;
    const job = JobsModel.getJobById(jobId);

    if (!job) {
            res.status(404).send("Job not found");
        } else {
            JobsModel.delete(jobId);
            var allJobs = JobsModel.getAllJobs();
            res.render('jobs', { allJobs, userEmail: req.session.userEmail, userName: req.session.userName });
        }
    }

}

