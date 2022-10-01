import express from 'express';
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.getAboutPage)
    router.get("/hoidanIT", (req, res) => {
        return res.send("Hello world with hoidanIT");
    })
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displaygetCRUD)
    router.get("/edit-crud", homeController.getEditCRUD)
    return app.use("/", router);
}

module.exports = initWebRoutes;