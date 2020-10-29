import { Application } from 'https://deno.land/x/oak@v6.3.1/mod.ts'; //https://oakserver.github.io/oak/
//App routing.
import indexRoutes from './routes/index.routes.ts';

const app = new Application();

//Use routes
app.use(indexRoutes.routes());
app.use(indexRoutes.allowedMethods()); //To HTTP Request handling

console.log('Running on 3000.'); 
await app.listen({port: 3000});