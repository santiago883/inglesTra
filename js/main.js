

const cedulas = {
    sifrao:"R$",
    valorCedulas: [100, 50, 20, 10, 5, 2 ],
}

const conta = {
    Nome: "0",
    Sobrenome: 0,
    Senha: 0,
    email: 0,
    dataDeNacimento: 0,
    NumeroConta: 0,
    valorEmConta: 0,
}

function salvarConta(contaf){
    localStorage.setItem("conta", JSON.stringify(contaf))

    conta.Nome = contaf.Nome;
    conta.Sobrenome = contaf.Sobrenome;
    conta.Senha = contaf.Senha;
    conta.email = contaf.email;
    conta.dataDeNacimento = contaf.dataDeNacimento;
    conta.NumeroConta = contaf.NumeroConta;
    conta.valorEmConta = parseInt(contaf.valorEmConta);
}

function getConta(){
    let contasalva
    let getConta =  localStorage.getItem("conta");
    if(getConta == 'undefined'){
        contasalva = null;
    }else{
        contasalva = JSON.parse(getConta);
    }
    
    
    if(contasalva == null){
        return false
        

    }else{
        conta.Nome = contasalva.Nome;
        conta.Sobrenome = contasalva.Sobrenome;
        conta.Senha = contasalva.Senha;
        conta.email = contasalva.email;
        conta.dataDeNacimento = contasalva.dataDeNacimento;
        conta.NumeroConta = contasalva.NumeroConta;
        conta.valorEmConta = parseInt(contasalva.valorEmConta);

        return true
    }
     

}

function contaNotas(saque){
    notasSeparadas = [];
    notasSeparadas[0] = Math.floor(saque/cedulas.valorCedulas[0]);
    notasSeparadas[1] = Math.floor((saque%cedulas.valorCedulas[0])/(cedulas.valorCedulas[1]));
    notasSeparadas[2] = Math.floor(((saque%cedulas.valorCedulas[0])%(cedulas.valorCedulas[1]))/(cedulas.valorCedulas[2]));
    notasSeparadas[3] = Math.floor((((saque%cedulas.valorCedulas[0])%(cedulas.valorCedulas[1]))%(cedulas.valorCedulas[2]))/(cedulas.valorCedulas[3]));
    let i = Math.floor((((saque%cedulas.valorCedulas[0])%(cedulas.valorCedulas[1]))%(cedulas.valorCedulas[2]))%(cedulas.valorCedulas[3]));
    if(i % 2 == 0){
        notasSeparadas[4] = 0
        notasSeparadas[5] = Math.floor(((((saque%cedulas.valorCedulas[0])%(cedulas.valorCedulas[1]))%(cedulas.valorCedulas[2]))%(cedulas.valorCedulas[3]))/(cedulas.valorCedulas[5]))
        
    }else if(i % 5 == 0){
        notasSeparadas[4] = Math.floor(((((saque%cedulas.valorCedulas[0])%(cedulas.valorCedulas[1]))%(cedulas.valorCedulas[2]))%(cedulas.valorCedulas[3]))/(cedulas.valorCedulas[4]));
        notasSeparadas[5] = 0
    }else{
        return "erro: valor invalido"
    }
    return notasSeparadas
}


function logar(){
    event.preventDefault();
    let nome = document.querySelector("#logarNome" ).value;
    let senha = document.querySelector("#logarSenha" ).value;
    
    
    let usuarioexiste = getConta();

    if (usuarioexiste == true) {
        if(conta == Object){
        alert("Senha ou nome errados por favor tente novamente")
        
        }   
            if(nome == conta.Nome && senha == conta.Senha){
            alert("entrou com sucesso")
            atualizarUsuario()
            irTelaHome("containerLogin")
        }else{
            alert("Senha ou nome errados por favor tente novamente")
        }
        
    }else if(usuarioexiste == false){
        alert("Usuario não existe deseja continuar? cadastre-se")

    }
    

    


}

function entraPaginaCadastro(){
    event.preventDefault();
    let paginaAtual = document.querySelector(".containerLogin" );
    let proximaPag = document.querySelector(".sectionFormCadastro" );
    paginaAtual.style.display = "none";
    proximaPag.style.display = "flex";

}   

function irTelaHome(x){
    let paginaAtual = document.querySelector(`.${x}`);
    let proximaPag = document.querySelector(".sectionTelaHome" );
    paginaAtual.style.display = "none";
    proximaPag.style.display = "flex";

}

function randomNumberInterval(a, b){
    return Math.floor(Math.random() * (b - a + 1)) +a
}

function atualizarUsuario(){
    let nome = document.querySelector(".iNome" );
    let Conta = document.querySelector(".iConta" );
    let valor = document.querySelector(".iValorConta" );
    

    nome.innerHTML = `${conta.Nome} ${conta.Sobrenome}`;
    Conta.innerHTML = `conta:${conta.NumeroConta}`;
    valor.innerHTML = `valor em conta: ${conta.valorEmConta}`;

}

function cadastrar(){
    event.preventDefault();
    let nome = document.querySelector("#nome" ).value;
    let sobrenome = document.querySelector("#sobrenome").value;
    let senha = document.querySelector("#senha").value;
    let email = document.querySelector("#email").value;
    let dataDeNacimento = document.querySelector("#data").value;
    let numero = randomNumberInterval(1, 9999)
    
    const conta = {
        Nome: nome,
        Sobrenome: sobrenome,
        Senha: senha,
        email: email,
        dataDeNacimento: dataDeNacimento,
        NumeroConta: numero,
        valorEmConta: 0,
    }

    salvarConta(conta)
    atualizarUsuario()
    irTelaHome("sectionFormCadastro")
}

function irHome(){
    event.preventDefault();
    let deposito = document.querySelector(".formDeposito");
    let saque = document.querySelector(".formSaque");
    deposito.style.display = "none";
    saque.style.display = "none";

    
}

function irSaque(){
    event.preventDefault();
    let deposito = document.querySelector(".formDeposito");
    let saque = document.querySelector(".formSaque");
    deposito.style.display = "none";
    saque.style.display = "block";
}

function irDeposito(){
    event.preventDefault();
    let deposito = document.querySelector(".formDeposito");
    let saque = document.querySelector(".formSaque");
    deposito.style.display = "block";
    saque.style.display = "none";
}

function atualizarValor(operador, valor){
    if(operador === "-"){
        conta.valorEmConta = parseInt(conta.valorEmConta - valor);
        let contaValor = document.querySelector(".iValorConta" );
        contaValor.innerHTML = `valor em conta: ${conta.valorEmConta}`
        salvarConta(conta)
    }else if(operador === "+"){
        conta.valorEmConta = (conta.valorEmConta + valor);
        let contaValor = document.querySelector(".iValorConta" );
        contaValor.innerHTML = `valor em conta: ${conta.valorEmConta}`
        salvarConta(conta)
    }
    
}

function sacar(){
    event.preventDefault();
    let saque = document.querySelector("#sT").value;
    let notasSacar = contaNotas(saque);
    let i = 0;

    if(conta.valorEmConta < saque){
        alert("você não possui saldo suficiente! porfavor verifique o saldo em conta")
    }else{
        while (i != 6) {
            let p = document.querySelector(`#nS${i}`)
            p.innerHTML = `${notasSacar[i]}`
            i++ 
        }
        atualizarValor("-", saque)

    }
}

function depositar(){
    event.preventDefault();
    let deposito = document.querySelector("#dT").value;
    let valorNotas = 0; 
    let i = 0;
    while (i != 6) {
        let nota = document.querySelector(`#nD${i}`).value;
        let valor1 = nota * cedulas.valorCedulas[i];
        valorNotas = valorNotas + valor1;
        i++;
    }

    if(valorNotas != deposito){
        alert("o valor do deposito declarado não é compativel com o valor das notas! ")
    }else{
        deposito = valorNotas;
        if(deposito % 2 == 0 || deposito % 5 == 0){
            atualizarValor("+",deposito)

        }
    }
}


    
   

// pegando buttons
const trocarparacadastro = document.querySelector(".paginaCadastral");
const buttonLogin = document.querySelector("#buttonLogin");
const buttonCadastrar = document.querySelector("#cadastrar")
const buttonHome = document.querySelector(".irHome")
const buttonSaque = document.querySelector(".irSaque")
const buttonDeposito = document.querySelector(".irDeposito")
const buttonSacar = document.querySelector(".buttonS")
const buttonDepositar = document.querySelector(".buttonD")

// adicionando eventos dos buttons
buttonLogin.addEventListener("click", logar);
trocarparacadastro.addEventListener("click", entraPaginaCadastro)
buttonCadastrar.addEventListener("click", cadastrar)
buttonHome.addEventListener("click", irHome)
buttonSaque.addEventListener("click", irSaque)
buttonDeposito.addEventListener("click", irDeposito)
buttonSacar.addEventListener("click", sacar)
buttonDepositar.addEventListener("click", depositar)