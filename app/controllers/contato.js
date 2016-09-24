module.exports = function(app) {

    var Contato = app.models.Contato;

    var controller = {};

    // Listar Contatos
    controller.listarContatos = function(req, res) {

        Contato.find().populate('emergencia').exec()
            .then(
            function(contatos){
                res.json(contatos);        
            },
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    // Salva Contato - Alteração e Criação
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

    // Adicionar
    function adiciona(contatoNovo) {

        contatoNovo._id = ++ID_CONTATO_INC;
        contatos.push(contatoNovo);

        return contatoNovo;
    };

    // Atualizar
    function atualiza(contatoExistente) {

        contatos = contatos.map(function(contato) {
            if(contato._id == contatoExistente._id) {
                contato = contatoExistente;
            }
            return contato;
        });
        return contatoExistente;
    }

    // Obtem um contato
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

    // Remover contato
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
