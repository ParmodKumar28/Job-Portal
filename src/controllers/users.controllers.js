export default class UserController{
    getHome(req,res){
        res.render('index.ejs', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }
}