var contatos = [
    {_id: 1,nome: 'Contato Exemplo 1',email: 'cont1@empresa.com.br'},
    {_id: 2,nome: 'Contato Exemplo 2',email: 'cont2@empresa.com.br'},
    {_id: 3,nome: 'Contato Exemplo 3',email: 'cont3@empresa.com.br'},
    {_id: 4,nome: 'Diego Wagner',email: 'diegowagner4@gmail.com'}
];

module.exports = function() {
    var controller = {};
    controller.listarContatos = function(req, res) {
        res.json(contatos);
    }
    controller.obtemContato = function(req, res) {
        var id = req.params.id;
        var contato = contatos.filter(function(contato){
          return contato._id == id;
        })[0];
        contato ?
        res.json(contato) :
        res.status(404).send('Contato não encontrado.');
    }
    controller.removeContato = function(req, res) {
        var idContato = req.params.id;
        contatos = contatos.filter(function(contato){
            return contato._id != idContato;
        });
        res.status(204).end();
    }
    return controller;
};
