var contatos = [
    {_id: 1,nome: 'Contato Exemplo 1',email: 'cont1@empresa.com.br'},
    {_id: 2,nome: 'Contato Exemplo 2',email: 'cont2@empresa.com.br'},
    {_id: 3,nome: 'Contato Exemplo 3',email: 'cont3@empresa.com.br'}
];

const ID_CONTATO_INC = 3;

module.exports = function() {
    var controller = {};
    controller.listarContatos = function(req, res) {
        res.json(contatos);
    };

    controller.salvaContato = function(req, res) {
        var contato = req.body;
        contato = contato._id ? atualiza(contato) : adiciona(contato);

        res.json(contato);
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
        var id = req.params.id;
        var contato = contatos.filter(function(contato){
          return contato._id == id;
        })[0];
        contato ?
        res.json(contato) :
        res.status(404).send('Contato não encontrado.');
    };

    controller.removeContato = function(req, res) {
        var idContato = req.params.id;
        contatos = contatos.filter(function(contato){
            return contato._id != idContato;
        });
        res.status(204).end();
    };

    return controller;
};
