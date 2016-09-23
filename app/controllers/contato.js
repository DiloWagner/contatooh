module.exports = function(app) {

    var Contato = app.models.contato;

    var controller = {};
    controller.listarContatos = function(req, res) {

        Contato.find().exec()
            .then(
            function(contatos){
                res.json(contatos);        
            },
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaContato = function(req, res) {
        var _id = req.body._id;
        var dados = { 
            "nome" : req.body.nome, 
            "email" : req.body.email, 
            "emergencia" : req.body.emergencia || null
        };

        if(_id) {
            Contato.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function(contato) {
                        res.json(contato);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Contato.create(req.body)
                .then(
                    function(contato) {
                        res.status(201).json(contato);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }
        
    };

    function adiciona(contatoNovo) {

        contatoNovo._id = ++ID_CONTATO_INC;
        contatos.push(contatoNovo);

        return contatoNovo;
    };

    function atualiza(contatoExistente) {

        contatos = contatos.map(function(contato) {
            if(contato._id == contatoExistente._id) {
                contato = contatoExistente;
            }
            return contato;
        });
        return contatoExistente;
    }

    controller.obtemContato = function(req, res) {
        var _id = req.params.id;
        var contato = Contato.findById(_id)
        .then(
            function(contato){
                if(!contato) throw new Error("Contato não encontrado.");
                res.json(contato);
            },
            function(erro){
                console.error(erro);
                res.status(404).json(erro);
            }
        );
    };

    controller.removeContato = function(req, res) {
        var _id = req.params.id;

        Contato.remove({"_id" : _id}).exec()
            .then(
                function(){
                     res.status(204).end();
                }, 
                function(erro){
                     console.error(erro);
                     res.status(500).json(erro);
                }
            );
        
    };

    return controller;
};
