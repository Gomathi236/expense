import {check} from "express-validator";

let validateSignup =[
    check("email", "Invalid Email").isEmail().trim(),

    check("password", "Invalid Password.Password must be atleast 2 chars long")
    .isLength({min:2}),

    check("confirmationpassword","Password Confirmation does not match password")
    .custom((value,{req})=>{
        return value === req.body.password
    })
]


module.exports ={
    validateSignup: validateSignup
}