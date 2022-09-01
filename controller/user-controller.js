import User from "../model/userSchema.js";

export const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username })
        
        if (exist) {
            return response.status(401).json('Username already exist');
        }

        const user = request.body;              //  front end object ( we entered the informations )  
        const newUser = new User(user);         // it will validate the user from the schema
        await newUser.save();                   //  if everything is fine then it will save the new user's details into database

        response.status(200).json('User is successfully registered')

    } catch (error) {
        console.log('Error: ', error.message);
    }
}


export const userLogin = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        if (user) {
            return response.status(200).json(`${request.body.username} has logged in successfully`)
        }
        else {
            response.status(401).json('Invalid login')
        }

    } catch (error) {
        console.log('Error: ', error.message);
    }
}

