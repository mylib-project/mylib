module.exports = function(req,res,next){
    let isLogin = req.session.user
    if(isLogin){
        next()
    }else{
        res.redirect('/')
    }
}