import express from "express";
import recipeRouter from "./routes/recipe.js"
import userRouter from "./routes/user.js"


export default function createServer(){
    const app = express();

    //need middleware to properly display json file
    app.use(express.json()); 
    app.use("/user", userRouter)
    app.use("/recipe", recipeRouter);
    return app;
    
   
}