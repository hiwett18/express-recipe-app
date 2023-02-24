import express from "express";
import { prisma } from "../db/index.js";

const router = express.Router();

//user
router.get("/", async (_request, response)=>{
    //send back all users

    const allUsers = await prisma.user.findMany();

    response.status(200).json({
        success: true,
        users: allUsers
    })
})

router.post("/", async (request, response) => {
    //creates a user 

    const newUser = await prisma.user.create({
        data: {
            username: request.body.username,
          },
    });
    console.log(newUser);
    response.status(201).json({
        sucess: true
    });
}); 


export default router; 