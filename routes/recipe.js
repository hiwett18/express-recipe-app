import express from "express";
import { prisma } from "../db/index.js";

const router = express.Router();

// /recipe
router.get("/", async (request, response)=>{
    //send back all recipes

    const allRecipes = await prisma.recipe.findMany({
        where: {
            //request.user comes from passport and the data that was stored in the token's payload
            userId: request.user.id,
          },
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
})

router.post("/", async (request, response) => {
    //creates a recipe 

    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.body.name,
            description: request.body.description,
            userId: 1
           
          },
          data: {
            name: request.body.name,
            description: request.body.description,
            userId: 2
           
          },
    });
    console.log(newRecipe);
    response.status(201).json({
        sucess: true
    });
}); 


router.get("/:userId/:recipeId", async function(request, response){
    try {
        const getRecipe = await prisma.recipe.findMany({
            where:{
                id:parseInt(request.params.recipeId),
                user:{
                    id:{
                        equals:parseInt(request.params.userId)
                    }
                }
                
            }
        })
    
        response.status(200).json({
            sucess: true,
            data: getRecipe
            
        })
    } catch (error) {
        console.log(error)
    }
   
})

//updates recipes 
router.put("/:recipeId", async (request, response) => {
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
    response.status(200).json({
        success: true, 
        message: "recipe updated"
    });
})

router.delete("/:recipeId", async (request, response) => {
    const deleteRecipe = await prisma.recipe.delete({
        where: {
            id: parseInt(request.params.recipeId)
        }
    });
    response.status(200).json({
        success: true, 
        message: "recipe deleted"
    })
})

export default router; 