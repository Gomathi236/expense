import connection from "../configs/connectDB";
import bcryptjs from "bcryptjs";
import { check } from "express-validator";

let createNewUser = (user) =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let check = await checkEmailUser(user.email);
            if(check){
                reject(`This email is "${user.email}"  has already exist. Please choose an other email`);
            }else{
                let salt = bcryptjs.genSaltSync(10);
                let data ={
                    fullname: user.fullname,
                    email: user.email,
                    password: bcryptjs.hashSync(user.password,salt)
                }
                connection.query("INSERT INTO users set ?", data, function(error, rows){
                    if(error){
                        reject(error);
                    }
                    resolve("Create a new user successfully!");
                })

            }

        }catch(e){
            reject(e);
        }
    });
};
let checkEmailUser = (email) => {
    return new Promise(((resolve, reject)=>{
        try{
            connection.query( "SELECT * from users where email =?", email, function(error,rows){
                if(error){
                    reject(error);
                }
                if(rows.length > 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        }catch(e){
            reject(e);
        }

    }));
}


module.exports ={
    createNewUser: createNewUser
}