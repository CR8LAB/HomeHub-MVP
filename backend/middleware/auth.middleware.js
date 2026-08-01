import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required."
            });
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format."
            });
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            userId: decodedToken.userId,
            householdId: decodedToken.householdId,
            role: decodedToken.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}