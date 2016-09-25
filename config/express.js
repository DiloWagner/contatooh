var express    = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session    = require('express-session');
var passport   = require('passport');
var load       = require('express-load');
var helmet     = require('helmet');

module.exports = function() {

  var app = express();

  app.set('port', 3000);
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views','./app/views');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  app.use(cookieParser());
  app.use(session({
    secret: 'homem avestruz',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helmet.xframe()); // imposibilita o uso de iframes
  app.use(helmet.xssFilter()); // previne ataque de XSS
  app.use(helmet.nosniff()); // não permite que o browser infira no MIME type
  app.disable('x-powered-by'); // não mostra a versão da tecnologia utilizada

  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);
  
  app.get('*', function(req, res) {
    res.status(404).render('404');  
  });

  return app;
};
