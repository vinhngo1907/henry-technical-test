const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];

        if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        // console.log({decoded})
        if (!decoded) return res.status(400).json({ msg: "Invalid Authentication." })

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        
        delete user.password;
        req.user = user;
        // console.log({user})
        next()
    } catch (err) {
        // console.log({err})
        return res.status(500).json({ msg: err.message })
    }
}


module.exports = auth