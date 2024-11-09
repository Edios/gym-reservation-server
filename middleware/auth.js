const jwt=require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.match(/^Bearer (.*)$/)[1];
    if (!token){
        return res.status(401).json({message:"No token, authorization failed"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};