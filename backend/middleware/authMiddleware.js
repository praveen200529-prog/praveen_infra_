// ─────────────────────────────────────────────────────────────
// Auth Middleware — protects portal routes with JWT
// ─────────────────────────────────────────────────────────────

const jwt = require('jsonwebtoken');

/**
 * protect([...roles])
 * Returns middleware that verifies JWT and optionally checks role.
 * Usage: protect()           — any authenticated user
 *        protect(['admin'])  — admins only
 */
function protect(roles = []) {
  return (req, res, next) => {
    // Accept token from Authorization header OR cookie (for future use)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token. Please log in.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, name, email, role }

      // Role check
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: insufficient role.' });
      }

      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
      }
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
  };
}

module.exports = { protect };
