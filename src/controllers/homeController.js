import db from '../models/index';
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log("..............");
        console.log('data = ', data);
        console.log("..............");
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e);
    }
}
let getAboutPage = (req, res) => {
    return res.render("test/about.ejs")
}
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body); 
    return res.send("postCRUD");
}
let displaygetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log("/////////////////////////");
        console.log(userData);
        console.log("/////////////////////////");
        return res.render("editCRUD.ejs");

    }
    else {
        return res.send("User not found");
    }

}
module.exports = {
    getHomePage : getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD,
    getEditCRUD
}