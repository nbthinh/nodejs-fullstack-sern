import db from '../models/index'
import bcrypt from 'bcryptjs' ;
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e);
        }
    }) 
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {
                        email: email
                    },
                    raw: true
                    
                });
                if (user){
                    // compare password
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                    
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "Your email isn't exist";
                }
            }
            else{
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist`;
            }
            resolve(userData)

        }catch(e){
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        }
        catch(e){
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "ALL"){
                users = await db.User.findAll({
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);  
        }catch(e){
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Your email is already in used"
                });
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve({
                errCode: 0,
                message: "OK" 
            });
        }catch(e){
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {
                id: userId
            }
        });
        if (!foundUser){
            resolve({
                errCode: 2,
                errMessage: "The user isn't exist"
            })
        }
        // if (foundUser){
        //     await foundUser.destroy();
        // }
        await db.User.destroy({
            where: {
                id: userId
            }
        })
        resolve({
            errCode: 0,
            message: "User Deleted"
        });
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "missing require parameter"
                })
            }
            console.log("data = ", data.id);
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false
            });
            console.log("User = ", user);
            if (user) {
                user.firstName =  data.firstName;
                user.lastName =  data.lastName;
                user.address =  data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update successfully"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    message: ""
                });
            }
        }
        catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData
}