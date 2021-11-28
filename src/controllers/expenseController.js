let getExpensePage = (req,res) =>{
    return res.render("expenses.ejs");
};

module.exports = {
    getExpensePage:getExpensePage
}