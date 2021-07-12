var express = require('express') //importando o express para facilitar a criação do servidor e das rotas
  , app = express() //iniciando a função do express
  , server = require('http').createServer(app).listen(4555) //criando o server e escutando na porta 4555
  , io = require('socket.io')(server) //criando o nosso socket com os parâmetros definidos acima do server
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); //definindo que a nossa aplicação se comunicará usando a notação JSON
  var port = process.env.PORT || 8080; // definindo a porta da nossa API, que será a variável presente no arquivo .env (se tiver) e se não tiver usará a porta 8080
  var router = express.Router(); //usaremos a função router do express para definirmos as rotas da aplicação
  var emitir = function(req, res, next){ //função que será usada ao acessar a rota
    var notificar = req.query.notificacao || ''; //pegando a string da notificação que será enviada, caso não tenha uma, enviará uma string vazia
      if(notificar != '')	 {
      io.emit('notificacao', notificar); // nosso socket.io irá emitir a mensagem 'notificação' juntamente com a string que foi mandada na rota
      next();
    } else {
        next();
      }
    }
    app.use(emitir); //indicando que a nossa aplicação irá utilizar a função emitir definida acima
  app.use('/api', router); //definindo uma rota padrão para /api
  router.route('/notificar') //definindo a rota /notificar
    .get(function(req, res){ //quando a rota for acessada, a mensagem abaixo será exibida em formato JSON
    //aqui vamos receber a mensagem
    res.json({message: "testando essa rota"})
    })
  app.listen(port); //usando a porta que definimos acima
  console.log('conectado a porta ' + port); //uma mensagem no console dizendo em qual porta a aplicação está rodando 