import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient
export async function isUserAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (token) {
        const decodedToken = jwt.decode(token) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { email: decodedToken.email } });
        if (user) {
            if (user.role_id === 3) {
                next();
            } else {
                res.status(401).json({error: 'Unauthorized'})
            }
        }
    }
}