const User = require("../model/User")
const Movies = require("../model/Movies")
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
class UserServices {
    static async registerUser(data) {
        try {
            if (!data.email || !data.password) return { error: true, message: 'Please enter all fields' };
            else {
                const {
                    name,
                    lastname,
                    userName,
                    email,
                    password,
                } = data
                //verificar que el usuario no exista 
                const existUser = await User.findOne({ email })
                if (existUser) return { error: true, message: 'The user alredy exist' };
                //hash password 
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                //new User
                const newUser = await User.create({
                    name,
                    lastname,
                    userName,
                    email,
                    password: hashPassword,
                })
                if (!newUser) return { error: true, message: "Error to create new user" }
                else {
                    const token = generateToken(newUser._id)
                    return {
                        error: false,
                        message: 'New user create',
                        data: {
                            id: newUser._id,
                            name: newUser.name,
                            userName: newUser.userName,
                            email: newUser.email,
                            token: token
                        }
                    }
                }
            }
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async loginUser(data) {
        try {
            if (!data.email || !data.password) return { error: true, message: "Please enter all fiels" }
            else {
                const {
                    email,
                    password
                } = data
                //find the user
                const logUser = await User.findOne({ email })
                if (!logUser) return { error: true, message: "User not register" }
                const hashPassword = await bcrypt.compare(password, logUser.password)
                if (!hashPassword) return { error: true, message: "Not matches data" }
                return {
                    error: false,
                    message: `Welcome ${logUser.userName}`,
                    data: {
                        id: logUser._id,
                        name: logUser.name,
                        userName: logUser.userName,
                        email: logUser.email
                    }

                }

            }
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async getMe(data) {
        const { email } = data
        if (!email) return { error: true, data: "User unauthorized" }

        const dataUser = await User.findOne({ email })

        if (!dataUser) return { error: true, data: "User unauthorized" }
        else return {
            error: false,
            data: {
                id: dataUser.id,
                name: dataUser.name,
                userName: dataUser.userName,
                email: dataUser.email,
            }
        }

    }
    static async addMovie(data) {
        try {
            const { movieId, _id } = data
            if (!movieId || !_id) return { error: true, data: "Can't add Movie" }
            //found the User 
            const User_id = await User.findById(_id)
            if (!User_id) return { error: true, data: "User unauthorized" }
            //find if the Movie is alredy added
            const VerifiedMovie = await Movies.find({ movie_id: movieId })

            if (VerifiedMovie.length >= 1) return { error: true, data: "Movie alredy add" }
            const UpdateMovie = await Movies.findOneAndUpdate({ user: _id }, { $push: { movie_id: movieId } })
            if (UpdateMovie) return { error: false, data: "User add a Movie" }
            else {
                const newMovie = await Movies.create({
                    user: _id,
                    movie_id: movieId
                })
                if (newMovie) return { error: false, data: "User add a Movie" }
            }

        } catch (error) {
            return { error: true, data: error.message };
        }
    }
    static async deletMovie(data) {
        try {
            const { movieId, _id } = data
            if (!movieId || !_id) return { error: true, data: "Can't add Movie" }
            const User_id = await User.findById(_id)
            if (!User_id) return { error: true, data: "User unauthorized" }
            //find if the Movie is added
            const VerifiedMovie = await Movies.find({ movie_id: movieId })
            if (VerifiedMovie.length == 0) return { error: true, data: "Movie hasn't been added" }
            const delateMovie = await Movies.findOneAndUpdate({ user: _id }, { $pull: { movie_id: movieId } })
            if (delateMovie) return { error: false, data: "Movie deleted" }
        }
        catch {
            return { error: true, data: error.message };

        }
    }
    static async favsMovies(data) {
        try {
            const { _id } = data
            if (!_id) return { error: true, data: "Can't get Movies" }
            const UserMovies = await Movies.find({ user: _id })
            if (UserMovies.length == 0) return { error: true, data: "User don't have favorites movies" }
            return { error: false, data: UserMovies[0].movie_id }
        } catch {
            return { error: true, data: error.message };
        }
    }
    // static async searchUser(data) {
    //     try {
    //         const { userName } = data
    //         console.log(userName);
    //         if (!userName) return { error: true, data: "search rejected" }
    //         const searchUserName = await User.find({userName:userName})
    //         console.log(searchUserName)
    //     }
    //     catch {
    //         return { error: true, data: error.message };

    //     }
    // }
}
module.exports = UserServices;