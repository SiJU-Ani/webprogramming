const jwt = require('jsonwebtoken');
const { poolPromise } = require('../config/db');

module.exports = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', decoded.id)
            .query('SELECT id, username, email, role FROM Users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = result.recordset[0];
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}; 