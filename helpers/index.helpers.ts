import { Request, Response } from 'https://deno.land/x/oak@v6.3.1/mod.ts'; //https://oakserver.github.io/oak/
import { v4 } from "https://deno.land/std@0.75.0/uuid/mod.ts"; //https://deno.land/std@0.75.0/uuid

//Create an interface for the user type.
interface User {
    _id: string,
    name: string
}
//Sample Users data.
let users: User[] = [{
    _id: v4.generate(),
    name: 'Jesus'
}];
//Read all the users.
export const getUsers = (
    { response }: {response: Response}
) => {
    response.body = {
        message: 'Succesfull query',
        users
    }
};

//Get a user by id.
export const getUser = ( {params, response}: {params: {_id: string}; response: Response} ) => {
    const userFound = users.find(user => user._id === params._id); //Find by id in the custom data.
    if (userFound){ //Review if the user exists.
        response.status = 200;
        response.body = {
            message: 'User found',
            userFound
        }
    } else {
        response.status = 404;
        response.body = {
            message: 'User not found'
        }
    }
    
}

//Create a new user.
export const createUser = async ( { request, response}: {request: Request; response: Response} ) => {
    const body = request.body();

    //Validate if the body exists.
    if (!request.hasBody) {

        response.status = 404;
        response.body = {
            message: 'Missing parameters'
        }

    } else {
        const newUser: User = await body.value;
        newUser._id = v4.generate();

        users.push(newUser);

        response.status = 200;
        response.body = {
            message: 'New User created',
            newUser
        }
    }
};  

//Search and delete a user.
export const deleteUser = ({params, response}: {params: {_id: string}; response: Response}) => {
    users = users.filter(user => user._id !== params._id);
    response.status = 200;
    response.body = {
        message: 'User deleted',
        users
    }
}

//Update a user.
export const updateUser = async ({params, request, response}: {params: {_id: string}; request: Request; response: Response}) => {
    const userFound = users.find(user => user._id === params._id); //Find by id in the custom data.
    if (userFound){ //Review if the user exists.
        const body = request.body();
        const updatedUser = await body.value;

        //Search the user in the object and replace the data.
        users = users.map(user => user._id === params._id ? {...user, ...updatedUser} : user);

        response.status = 200;
        response.body = {
            message: 'User updated',
            users
        }
    } else {
        response.status = 404;
        response.body = {
            message: 'User not found'
        }
    }
}