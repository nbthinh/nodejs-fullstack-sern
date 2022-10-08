import userService from "../services/userService"
let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        res.status(500).json({
            errCode: 1,
            message: "Missing inputs parametter"
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        message: "Hello world",
        email: email
    })
}
module.exports = {
    handleLogin
}