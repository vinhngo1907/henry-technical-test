// require("dotenv").config();
const { validateEmail } = require("../validations");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ACCESS_TOKEN = process.env.ACCESS_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_SECRET;

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const checkEmail = validateEmail(email);
            if (!checkEmail) {
                return res.status(400).json({ msg: "Invalid Email!" });
            }

            if (!password) {
                return res.status(400).json({ msg: "Missing password" });
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) return res.status(400).json({ msg: "User not found!" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Password is not correct!" });

            // const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN, { expiresIn: "1d" });
            // const rfToken = jwt.sign({ userId: user.ud }, REFRESH_TOKEN, { expiresIn: "7d" });
            console.log({ userId: user.id })
            const accessToken = createAccessToken({ userId: user.id });
            console.log({ accessToken })
            const rfToken = createRefreshToken({ userId: user.id })
            res.cookie("v_rf", rfToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                path: "/api/auth/refresh_token"
            });

            delete user.password;
            res.json({ accessToken, user, msg: "Login in successfully!" });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    regsiter: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ msg: "Invalid register!" });

            const hash = await bcrypt.hash(password, 10);

            const existedUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (existedUser) return res.status(400).json({ msg: "This email is already existed!" });

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const user = await prisma.user.create({
                data: { email, password: hash },
            });
            // const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN, { expiresIn: "1d" });
            // const rfToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN, { expiresIn: "7d" });
            const accessToken = createAccessToken({ userId: user.id });
            const rfToken = createRefreshToken({ userId: user.id })
            res.cookie("v_rf", rfToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                path: "/api/auth/refresh_token"
            });

            delete user.password;
            res.json({ msg: 'User registered', accessToken, user });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            // console.log("???", req.cookies)
            const rf_token = req.cookies.v_rf;
            if (!rf_token) return res.status(400).json({ msg: "Please login now." });

            jwt.verify(rf_token, REFRESH_TOKEN, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Something wrong! Please login now." })
                // console.log({result})
                const user = await prisma.user.findUnique({
                    where: {
                        id: result.userId,
                        // email: result.email
                    }
                });

                if (!user) return res.status(400).json({ msg: "This does not exist." })

                const access_token = createAccessToken({ userId: result.userId })

                res.json({
                    accessToken: access_token,
                    user
                })
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('v_rf', { path: '/api/refresh_token' })
            return res.json({ msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '7d' })
}


module.exports = authController;