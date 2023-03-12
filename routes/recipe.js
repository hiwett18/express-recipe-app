import express from "express";
import { prisma } from "../db/index.js";

export default function recipeR(passport){


const router = express.Router();

// /recipe
router.get("/", async (request, response)=>{
    //send back all recipes
    try{
        const allRecipes = await prisma.recipe.findMany({
            
              //Only chooses the fields you wish to get back from a table
              select: {
                id: true,
                name: true,
                description: true,
              },
        });
    
        response.status(200).json({
            sucess: true,
            recipes: allRecipes
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "recipe not found"
        })
    }
    
})
router.get("/user", passport.authenticate("jwt", {session: false}), async (request, response)=>{
    //send back all recipes
    try{
        const allRecipes = await prisma.recipe.findMany({
            where: {
                //request.user comes from passport and the data that was stored in the token's payload
                userId: request.user.id,
              },
              //Only chooses the fields you wish to get back from a table
              select: {
                userId: true, 
                id: true,
                name: true,
                description: true,
              },
        });
    
        response.status(200).json({
            sucess: true,
            recipes: allRecipes
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "recipe not found"
        })
    }
    
})

router.post("/new", passport.authenticate("jwt", {session: false}), async (request, response) => {
    //creates a recipe 
try{
    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.body.name,
            description: request.body.description,
            userId: request.user.id
           
          },
       
    });
    if(newRecipe){
        response.status(201).json({
            sucess: true,
            message: "new recipe created"
        });
    }
    
   
} catch (error) {
    console.log(error)
    response.status(500).json({
        success: false,
        message: "recipie not created"
    })
}
    
}); 


router.get("/:recipeId", passport.authenticate("jwt", {session: false}), async(request, response)=>{
    try {
        const getRecipe = await prisma.recipe.findUniqueOrThrow({
            where:{
                id:parseInt(id)
                
            }
        });
    if(getRecipe){
        response.status(200).json({
        sucess: true,
        data: getRecipe
        
    })
}
       
    } catch (error) {
        
        response.status(500).json({
            success: false,
            message: "something went wrong"
        })
       
    }
   
})

//updates recipes 
router.put("/:recipeId", passport.authenticate("jwt", {session: false}), async(request, response) => {
    try{
        const updateRecipe = await prisma.recipe.update({
            where: {
                id: parseInt(request.params.recipeId)
            },
            data: {
                name: request.body.name,
                description: request.body.description
            }
        });
        //sends back response if it works
        if (updateRecipe){
            response.status(200).json({
                success: true, 
                message: "recipe updated"
            });
        } else {
            response.status(500).json({
                success: false,
                message: "recipe not updated"
            })
        } 
    } catch(error){
        response.status(500).json({
            success: false,
            message: "recipie was not updated"
        })
    }
    
    
})

router.delete("/:recipeId", passport.authenticate("jwt", {session: false}), async (request, response) => {
    try {
        const deleteRecipe = await prisma.recipe.delete({
            where: {
                id: parseInt(request.params.recipeId)
            }
        });
        if (deleteRecipe){
            response.status(200).json({
                success: true, 
                message: "recipe deleted"
            })
        }
    } catch(error) {
        response.status(500).json({
            success: false,
            message: "recipe was not deleted"
        })
    }
    
})
return router
}
