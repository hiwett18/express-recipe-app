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
router.post("/login", async (req, res) => {
    try {
        const foundUser = await prisma.user.findFirstOrThrow({
            where: {
                username: req.body.username
            }
        });

        try {
            const verifiedPassword = await argon2.verify(foundUser.password, req.body.password);

            if (verifiedPassword) {
                const token = jwt.sign({
                    user: {
                        username: foundUser.username,
                        id: foundUser.id
                    }
                }, "thisIsASecretKey");

                res.status(200).json({
                    success: true,
                    token
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Incorrect username or password"
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        };
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Incorrect username or password"
        });
    };
});


export default router; 