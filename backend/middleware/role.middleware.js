export function requireRole(requiredRole) {
    return function checkRole(req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication is required."
            });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: `Only ${requiredRole.toLowerCase()} users may perform this action.`
            });
        }

        next();
    };
}