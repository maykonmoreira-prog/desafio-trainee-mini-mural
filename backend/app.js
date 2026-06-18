const express = require("express"); //importando a biblioteca express
const app = express();
const bodyParser = require ("body-parser");
const Usuarios = require("./models/Usuarios"); //importando usuarios
const bcrypt = require ('bcrypt'); //importando encriptador
const saltRounds = 10; // Custo do hash, 10 é o padrão seguro

// Configurar body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Definição do método de cadastro com criptografia de senha
app.post("/cadastro", function(req,res){
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha; // Entrada da senha bruta

    bcrypt.hash(senha, saltRounds)
        .then(function(hashGerado){
            return Usuarios.create({
                nome: nome,
                email: email,
                senha: hashGerado // Salva a senha criptografada
            })
        })
        .then(function(){
            res.send("Usuário cadastrado com sucesso.");
        }).catch(function(erro){
            res.send("Usuário não cadastrado. Erro " + erro);
        })
});

// Definição do método LOGIN com comparação de senha
app.post("/login", function(req, res){
    const email = req.body.email;
    const senha = req.body.senha;

    Usuarios.findOne({where: {email: email} })
        .then(function(usuario){

            // Caso o email não exista no banco de dados
            if(!usuario) return res.status(404).send("Usuário não cadastrado.");

            // Se o usuário existir
            bcrypt.compare(senha, usuario.senha)
                .then(function(senhaValida){
                    if(senhaValida){
                        // As senhas batem
                        res.send("Login efetuado com sucesso. Bem vindo " + usuario.nome + ".");
                    }else{
                        // A senha digitada gerou um hash diferente
                        res.status(401).send("Senha incorreta.");
                    }
                })
                .catch(function(erro){
                    res.status(500).send("Erro ao validar a senha. Erro " + erro);
                })
        })
        .catch(function(erro){
            res.status(500).send("Erro ao buscar usuário. Erro " + erro);
        })
})

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
