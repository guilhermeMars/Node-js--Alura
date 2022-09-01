const passport = require('passport');

module.exports = {
    local: (req, res, next) =>{
        passport.authenticate(
            'local', 
            {session: false}, 
            (error, usuario, info)=>{
                if(error && error.name === 'InvalidArgumentError'){
                    return res.status(401).json({ erro: error.message });
                }

                if(!usuario){ // Caso não coloque nada nas credenciais ela e o erro vem nulo
                    return res.status(401).json()
                }

                if(error){
                    return res.status(500).json({ erro: error.message })
                    // Qualquer coisa que acontecer aqui é um erro que não foi previsto, entãp faz sentido cair no status 500
                }

                req.user = usuario;
                return next();
            }) (req, res, next)
    },

    bearer: (req, res, next)=>{
        passport.authenticate(
            'bearer',
            {session: false},
            (error, usuario, info)=>{
                if(error && error.name === 'JsonWebTokenError'){
                    return res.status(401).json({ erro: error.message });
                }

                if(error && error.name === 'TokenExpiredError'){
                    return res.status(401).json({ erro: error.message, expiradoEm: error.expiredAt })
                }
                
                if(!usuario){
                    return res.status(401).json();
                }

                if(error){
                    return res.status(500).json({ erro: error.message })
                }

                req.token = info.token; // Passa o token de forma mais fácil para o controlador
                req.user = usuario 
                return next();
            }
        )(req, res, next)
    }
}