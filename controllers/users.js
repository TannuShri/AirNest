const User=require("../models/user");

module.exports.renderSignup=(req, res) => {
  res.render("users/signup");
};

module.exports.signup=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
         return next();
        }
      req.flash("success", "Welcome to Wonderlust");
      res.redirect("/listings");
      })
   
    } catch (err) {
       req.flash("error",err.message);
       res.redirect("/signup"); 
    }
  }


  module.exports.renderLogin=(req,res)=>{
    res.render("users/login");
};

module.exports.login=async(req, res) => {
        req.flash("success","Welcome back to Wonderlust!");
        res.redirect(res.locals.redirectUrl||"/listings");
    }

    module.exports.logout=(req,res)=>{
  req.logout((err)=>{
    if(err){
      next(err);
    }
    req.flash("success","You are logged out!");
    res.redirect("/listings")
  })
}