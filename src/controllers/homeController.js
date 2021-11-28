let getHomePage = (req,res) =>{
    return res.render("home.ejs",{
        user : req.user
    });
};

module.exports = {
    getHomePage: getHomePage
}