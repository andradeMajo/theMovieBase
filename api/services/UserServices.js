const User = require("../model/User")
const Movies = require("../model/Movies")
const bcrypt = require("bcrypt")
class UserServices {
    static async registerUser(data) {
        try {
            if (!data.email || !data.password) return { error: true, data: 'Please enter all fields' };
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
                if (existUser) return { error: true, data: 'The user alredy exist' };
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
                if (newUser) return { error: false, data: 'New user create' };
            }

        } catch (error) {
            return { error: true, data: error.message };
        }
    }
    static async loginUser(data) {
        try {
            if (!data.email || !data.password) return { error: true, data: "Please enter all fiels" }
            else {
                const {
                    email,
                    password
                } = data
                //find the user
                const logUser = await User.findOne({ email })
                if (!logUser) return { error: true, data: "User not register" }
                const hashPassword = await bcrypt.compare(password, logUser.password)
                if (!hashPassword) return { error: true, data: "Not matches data" }
                return { error: false, data: `Welcome ${logUser.userName}` }

            }
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
    static async getMe(data) {
        if (!data) return { error: true, data: "User unauthorized" }
        const { email } = data
        const dataUser = await User.findOne({ email })
        if (!dataUser) return { error: true, data: "User unauthorized" }
        return {
            error: false, data: {
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
            const VerifiedMovie= await Movies.find( {movie_id:movieId})
            if(VerifiedMovie.length>=1) return{ error: true, data:"Movie alredy add"}
            const UpdateMovie = await Movies.findOneAndUpdate({ user: _id }, {$push:{ movie_id:movieId }})
            if (UpdateMovie) return{ error: false, data:"User add a Movie"}
            else {
              const newMovie = await Movies.create({
                user: _id,
                movie_id: movieId
            })  
            if(newMovie) return{error:false, data:"User add a Movie"}
            }
            
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
    static async favsMovies(data){
        try{
            const{_id}=data
if (!_id) return { error: true, data: "Can't get Movies" }
const UserMovies= await Movies.find({user: _id})

 if (UserMovies.length==0) return {error:true, data:"User don't have favorites movies"}
 return {error:false, data:UserMovies[0].movie_id}
        }
        catch{

        }

    }
}
module.exports = UserServices;