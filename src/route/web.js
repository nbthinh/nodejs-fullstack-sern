import express from 'express';
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.getAboutPage)
    router.get("/hoidanIT", (req, res) => {
        return res.send("Hello world with hoidanIT");
    })
    return app.use("/", router);
}

module.exports = initWebRoutes;