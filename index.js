// Module Imported
import express, { urlencoded } from 'express';
import ejs from 'ejs';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import UserController from './src/controllers/users.controllers.js';
import RecruiterController from './src/controllers/recruiters.controller.js';
import JobController from './src/controllers/jobs.controller.js';
import {auth} from './middlewares/auth.middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Server create
const app = express();

// Cookies Parser
app.use(cookieParser());

// Session Create
app.use(session({
    secret : "SecretKey",
    resave : false,
    saveUninitialized : true,
    cookie : ({secure : false}),
}));

// Parse Form Data
app.use(express.urlencoded({extended : true}));

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
app.get('/register',recruitersController.getRegister);
app.post('/register',recruitersController.postRegister);
app.get('/login',recruitersController.getLogin);
app.post('/login',recruitersController.postLogin);
app.get('/logout',recruitersController.logout);

// Jobs
app.get('/jobs/job-page',jobsController.getJobPage);
app.get('/postjob',auth,recruitersController.getPostJob);
app.get('/applicants',auth,recruitersController.getApplicants);



// Server Ports
app.listen('5000',()=>{
    console.log("Server is listening on localhost:5000");
})