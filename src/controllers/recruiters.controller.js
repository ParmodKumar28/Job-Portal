// Recruiters Model Imported Here
import RecruiterModel from "../models/recruiters.model.js";
import JobsModel from "../models/jobs.model.js";

export default class RecruiterController{
    getRegister(req,res){
        res.render('register', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
    postRegister(req,res){
        
        const isRecruiterRegistered = RecruiterModel.isRegistered(req.body.email);
        if(isRecruiterRegistered)
        {
            return res.render('404page',{errorMessage : "This Email Is Already Registered"});
        }
        else
        {
            const {name,email,password} = req.body;
            RecruiterModel.addRecruiter(name,email,password);
            return res.render('login', {userEmail : req.session.userEmail, userName : req.session.userName,}); 
        }
           
    }

    getLogin(req,res){
        res.render('login', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
    postLogin(req,res){
        const isRecruiterRegistered = RecruiterModel.isRegistered(req.body.email);
        if(!isRecruiterRegistered)
        {
            return res.render('404page',{errorMessage : "user not found pls register"});
        }

        const {email,password} = req.body;
        const isValidRecruiter = RecruiterModel.isValidRecruiter(email,password);
        if(!isValidRecruiter)
        {
            return res.render('404page',{errorMessage : "invalid credentials"});
        }

        // Creating Sessions Variables Here
        req.session.userEmail = email;
        req.session.userName = RecruiterModel.getName(email);
        const allJobs = JobsModel.getAllJobs();
        res.render('jobs', {allJobs,userEmail : req.session.userEmail, userName : req.session.userName,});

        // Redirecting to the jobs page after login
        // res.redirect('/jobs');
    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/login');
            }
        });
    }

    getApplicants(req,res){
        res.render('applicants', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
}