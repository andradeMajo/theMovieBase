const jwt=require("jsonwebtoken")
const UserServices = require("../services/UserServices")


class UserControllers {

    static async registerUser(req, res) {
        const { error, data, message } = await UserServices.registerUser(req.body)
        if (error) res.status(400).send(message)
        else res.status(200).json({ data,message })   
    }

    static async loginUser(req, res) {
        const { error, data, message } = await UserServices.loginUser(req.body)
        if (error) res.status(400).send(message)
        else res.status(200).json({ data, message }) 
        
    }

    static async logoutUser(req, res) {
        req.user = null;
        console.log("el user", req.user);
        res.status(200).json({ message: 'Logout successful' });
    }

    static async getMe(req, res) {
        const { error, data } = await UserServices.getMe(req.body)
        if (error) return res.status(400).json({ data });
        else return res.status(200).json({ data });
    }

    static async addMovie(req, res) {
        const { error, data } = await UserServices.addMovie(req.body)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });

    }
    static async deletMovie(req, res) {
        const { error, data } = await UserServices.deletMovie(req.body)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });

    }
    static async favsMovies(req, res) {
        const { error, data } = await UserServices.favsMovies(req.params)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });
    }
    static async searchUser(req, res) {
        const { error, data } = await UserServices.searchUser(req.body)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });
    }
}
module.exports = UserControllers