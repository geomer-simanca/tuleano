function verificarClave(req, res, next) {
    const authHeader = req.headers['authorization']

  // La cabecera debe venir así: Authorization: Bearer TU_API_KEY
    if (!authHeader) {
        return res.status(401).json({ error: 'No autorizado: falta token' })
    }

    const token = authHeader.split(' ')[1]

    if (token !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Token inválido o no autorizado' })
    }

    next() // ✅ continúa hacia el controlador
}

module.exports = verificarClave
