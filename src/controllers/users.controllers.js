export default class UserController{
    getHome(req,res){
        res.render('index.ejs');
    }
}