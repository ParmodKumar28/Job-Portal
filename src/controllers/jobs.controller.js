export default class JobController{
    getJobs(req,res){
        res.render('jobs');
    }
    
    getJobPage(req,res){
        res.render('job-page');
    }
}

