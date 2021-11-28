let getContactPage = (req,res) =>{
    return res.render("contactus.ejs")
        
};

module.exports = {
    getContactPage:getContactPage
}