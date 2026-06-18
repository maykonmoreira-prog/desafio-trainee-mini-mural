const express = require("express"); //importando a biblioteca express
const app = express();
const bodyParser = require ("body-parser");
const Usuarios = require("./models/Usuarios"); //importando usuarios

//Configurar body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//definição do método POST
app.post("/cadastro", function(req,res){
    Usuarios.create({
        nome: req.body.nome,
        email: req.body.email
    }).then(function(){
        res.send("Usuário cadastrado com sucesso.");
    }).catch(function(erro){
        res.send("Erro ao cadastrar usuário. Erro: " + erro);
    })
});

// Realizando a leitura de todos os registros do banco de dados
app.get("/", function(req,res){
    Usuarios.findAll().then(function(usuarios){
        res.send(usuarios) // Caso for um sucesso, ele enviará as informações em formato .json
    }).catch(function(erro){
        res.send("Problema ao buscar os dados. Erro:" + erro); // Para o caso de erro
    })
});

// Atualizar o(s) dado(s) de um registro já existente
app.patch("/atualizar/:id", function(req,res){
    Usuarios.update({
        nome: req.body.nome,
        email: req.body.email
    },
        {where: {"id": req.params.id}} // Obriga ao usuario informar o id
    ).then(function(){
        res.send("Sucesso ao atualizar os dados do usuário.")
    }).catch(function(erro){
        res.send("Problema ao atualizar os dados. Erro: " + erro);
    })
})

// Deletar um usuário do banco de dados
app.delete("/deletar/:id", function(req,res){
    Usuarios.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("Usuário deletado com sucesso.");
    }).catch(function(erro){
        res.send("Problema ao deletar usuário. Erro:" + erro);
    })
})

app.listen(8081, function(){
    console.log("Servidor rodando...");
});
