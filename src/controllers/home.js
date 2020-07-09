module.exports = (app) =>{
    const HomeController = {
        index(req , res) {
            res.render('home/index');
        },
        login(req,res){
            const { usuario} = req.body;
            const { email, nome } = usuario;
            if (email && nome) {
                usuario.contatos = [];// Dados serão armazenados aqui.
                req.session.usuario = usuario;//Dados do usuário
                res.redirect('/contatos'); //Contatos salvos
            }else{
                res.redirect('/');

            }
        },
        logout(req,res){ //Dados são apagados após o logout
            req.session.destroy();
            res.redirect('/')
        }
    };
    return HomeController;
};
