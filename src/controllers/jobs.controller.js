export default class JobController{
    getJobs(req,res){
        res.render('jobs', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
    
    getJobPage(req,res){
        res.render('job-page', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
}

