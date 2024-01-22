import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export const verifyToken = async (req, res, next) => {
    const publicUrls = ['/login'];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (publicUrls.includes(req.originalUrl)) return next();
    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    try {
        await jwt.verify(token, secretKey);
        next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') return res.status(401).json({ message: 'Session Expired' });
        return res.status(403).json({ message: 'Unauthorized' });
    }
};