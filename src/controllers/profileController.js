let getProfilePage = (req,res) =>{
    return res.render("profile.ejs");
      
};

module.exports = {
    getProfilePage:getProfilePage
}