module.exports = (req, res, next) => {
    if(!req.session.usuario){
        return res.redirect('/')
    }
    return next();
};
//Quando o usuário tenta acessar uma rota sem ter feito
//o Login, então essa função irá força-lo a fazer.