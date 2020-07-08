module.exports = (app) => {
    const { home } = app.controllers;
    app.get('/', home.index);
    //Rotas de Login
    app.post('/entrar', home.login);
    app.get('/sair', home.logout)
    console.log(app.controllers)
};
