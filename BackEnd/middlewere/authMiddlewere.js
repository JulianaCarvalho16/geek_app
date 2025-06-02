const admin = require('../config/firebase');

const verificarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization?.split('Bearer')[1];
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ error: 'token não fornecido'})};
    };
    
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    try{
        const decoded = await admin.auth().verifyIdToken(token);
        req.uid = decoded.uid;
        next()
    } catch {
        return res.status(401).json({ error: 'Token Invalido'})
    }

    module.exports = verificarToken;