module.exports = {
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg','Login to View This Page')
        res.redirect('/users/login');
    }
}