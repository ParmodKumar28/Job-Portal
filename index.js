// Module Imported
import express from 'express';
import ejs from 'ejs';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import UserController from './src/controllers/users.controllers.js';
import RecruiterController from './src/controllers/recruiters.controller.js';
import JobController from './src/controllers/jobs.controller.js';

// Server create
const app = express();

// View engine
app.set('view engine' , "ejs");
// View path
app.set("views", path.join(path.resolve('src','views')));

// Middleware for the Ejs layout
app.use(ejsLayouts);
app.use(express.static('src/views'));
app.use(express.static('public'));


// UserController ,JobController And RecruiterController Objects
const usersController = new UserController();
const recruitersController = new RecruiterController();
const jobsController = new JobController();

// Router requests
app.get('/',usersController.getHome);
app.get('/jobs',jobsController.getJobs);

// Recruiter routes
app.get('/login',recruitersController.getLogin);
app.get('/register',recruitersController.getRegister);

// Jobs
app.get('/jobs/job-page',jobsController.getJobPage)
app.get('/postjob',recruitersController.getPostJob)
app.get('/applicants',recruitersController.getApplicants)



// Server Ports
app.listen('5000',()=>{
    console.log("Server is listening on localhost:5000");
})