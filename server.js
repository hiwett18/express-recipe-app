import express from "express";
import recipeRouter from "./routes/recipe.js"
import userRouter from "./routes/user.js"
import authRoutes from "./routes/authRoutes.js"
import passport from "passport";
import setupJWTStrategy from "./auth/index.js"


export default function createServer(){
    const app = express();

    //need middleware to properly display json file
    app.use(express.json()); 
    
    setupJWTStrategy(passport);
    
    app.use("/user", userRouter)

    app.use("/recipe", passport.authenticate("jwt", {
        session: false 
    }), recipeRouter);

    app.use("/auth", authRoutes)


    return app;
    
   
}