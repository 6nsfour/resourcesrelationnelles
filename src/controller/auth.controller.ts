import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import UserRepository from "../repository/UserRepository";
import { CreateUserDTO } from "../dto/UserDTO";

const JWT_SECRET = 'e5c5714c0985bb91ddc961b4ccd3c5e45dd41214a69c3b964c4b4d316a31bda4'

export async function login(req: Request, res: Response): Promise<void> {
    const body = req.body;
    try {
        const user = await UserRepository.findByEmail(body.email);
        if (user) {
            const isPasswordMatched = await bcrypt.compare(
                req.body.password,
                user.password,
            );
    
            if (isPasswordMatched) {
                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: "2h" },
                );
                res.cookie("authToken", token);
                res.status(200).json({ message: "Login success!", token: token });
            } else {
                res.status(400).json({ error: "Invalid password" });    
            }
        } else {
            res.status(400).json({ error: "Invalid user" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json(error);
    }
}

export async function register(req: Request, res: Response): Promise<void> {
    const body: CreateUserDTO = req.body;
    try {
        const existingUser = await UserRepository.findByEmail(body.email)
        if (existingUser) {
            res.status(200).json({ error: "email_error" });
        }
        else {
            const user = await UserRepository.add(body);
            res.status(200).json(body)
        }

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json("error");
    }
}

