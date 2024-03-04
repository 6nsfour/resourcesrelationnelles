import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET='e5c5714c0985bb91ddc961b4ccd3c5e45dd41214a69c3b964c4b4d316a31bda4'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        next();
    });
}