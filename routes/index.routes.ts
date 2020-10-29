import { Router } from 'https://deno.land/x/oak@v6.3.1/mod.ts'; //https://oakserver.github.io/oak/
//Helpers
import * as userHelper from '../helpers/index.helpers.ts';

const router = new Router();

//Main route
router.get('/', ({response}) => {
    response.body = 'Welcome to the jungle'; 
});
//User routes
router.get('/users', userHelper.getUsers);
router.get('/users/:_id', userHelper.getUser);
router.post('/users', userHelper.createUser);
router.delete('/users/:_id', userHelper.deleteUser);
router.put('/users/:_id', userHelper.updateUser);

export default router;