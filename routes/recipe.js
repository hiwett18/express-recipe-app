import express from "express";
import { prisma } from "../db/index.js";

const router = express.Router();

// /recipe
router.get("/", async (_request, response)=>{
    //send back all recipes

    const allRecipes = await prisma.recipe.findMany();

    response.status(200).json({
        sucess: true,
        recipes: allRecipes
    })
})

router.post("/", async (request, response) => {
    //creates a recipe 

    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.body.recipe,
            description: request.body.description,
            userId: 1
           
          },
          data: {
            name: request.body.recipe,
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



export default router; 