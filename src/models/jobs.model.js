export default class JobsModel{
    constructor(id,category,designation,location,company,salary,openings,skills,date,postedTime)
    {
        this.id = id,
        this.category = category,
        this.designation = designation,
        this.location = location,
        this.company = company,
        this.salary = salary,
        this.openings = openings,
        this.skills = skills,
        this.date = date,
        this.postedTime = postedTime
    }

    static addJob(category,designation,location,company,salary,openings,skills,date)
    {
        const newJob = new JobsModel(
            jobs.length+1,
            category,
            designation,
            location,
            company,
            salary,
            openings,
            skills,
            date,
            Date.now(),
        );
        jobs.push(newJob);
    }

    static getAllJobs(){
        return jobs;
    }

    // Function for getting a job by its id
    static getJobById(id)
    {
        return jobs.find((job) => job.id == id);
    }

    // Function to update the job
    static updateJob(job)
    {
        const index = jobs.findIndex(
            (j)=>j.id == job.id);

            jobs[index] = job;
    }

    // Function to delete the job
    static delete(id)
    {
        const job = this.getJobById(id);
        jobs.splice(job.id-1,1);
    }

}

const jobs = [];