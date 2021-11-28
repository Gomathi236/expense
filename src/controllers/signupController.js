import {validationResult} from "express-validator"
import signupService from "../services/signupService"


let getsignupPage = (req,res) =>{
    return res.render("signup.ejs",{
        errors: req.flash("errors")
    })
    
}

let createNewUser = async (req,res)=>{
    
    let errorsArr =[];
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item)=>{
            errorsArr.push(item.msg);
        })
        req.flash("errors",errorsArr);
        return res.redirect("/signup");
    }

    try{
        let newUser ={
            fullname: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        };
        await signupService.createNewUser(newUser);
        return res.redirect("/login");

    }catch(e){
        req.flash("errors",e);
        return res.redirect("/signup");
    }
    console.log(req.body);
}


module.exports ={
    getsignupPage: getsignupPage,
    createNewUser: createNewUser
}