export default class RecruiterController{
    getLogin(req,res){
        res.render('login');
    }

    getRegister(req,res){
        res.render('register');
    }

    getPostJob(req,res){
        // res.render('404page');
        res.render('post-new-job')
    }

    getApplicants(req,res){
        res.render('applicants');
    }
}