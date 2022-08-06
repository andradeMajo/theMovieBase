const UserServices = require("../services/UserServices")

class UserControllers {

    static async registerUser(req, res) {
        const { error, data } = await UserServices.registerUser(req.body)
        if (error) res.status(400).send(data)
        else res.status(200).json({data})
    }
    static async loginUser(req, res) {
        const { error, data } = await UserServices.loginUser(req.body)
        if (error) res.status(400).send(data)
        else res.status(200).json({data})
    }
    static async getMe(req, res) {
        const { error, data } = await UserServices.getMe(req.body)
        if (error) res.status(400).json({ data });
        else res.status(200).json({data})
    }
    static async addMovie(req,res){
        const { error, data } = await UserServices.addMovie(req.body)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });

    }
    static async favsMovies(req,res){
        const { error, data } = await UserServices.favsMovies(req.params)
        if (error) res.status(400).json({ data });
        else res.status(200).json({ data });
    }
}
module.exports = UserControllers