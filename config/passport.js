var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'SEU-CLIENT-ID',
        clientSecret: 'SEU-CLIENT-SECRET',
        callbackURL: 'URL-RETORNO'
    }, function(accessToken, refreshToken, profile, done) {
        
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome" : profile.name},
            function(error, usuario) {
                if(error) {
                    console.log(error);
                    return done(error);
                }

                return done(null, usuario);
            } 
        );    
    }));

    /*
        Chamado apenas UMA vez e recebe o usuário do nosso
        banco disponibilizado pelo callback da estratégia de
        autenticação. Realizará a serialização apenas do
        ObjectId do usuário na sessão.
    */
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);
            });
    });
}