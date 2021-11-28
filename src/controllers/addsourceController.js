let getsourcePage = (req,res) =>{
    return res.render("addsource.ejs",{
        errors: req.flash("errors")
    })
    
}
let addSource = (source) =>{
   
            connection.query("SELECT * from source where source=?", source)
}

module.exports ={
    getsourcePage:getsourcePage,
    addSource:addSource
}