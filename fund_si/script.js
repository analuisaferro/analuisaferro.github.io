
//Declarando os arrays de objetos:

let funcionarios = [
    {nome: "Marcio", funcao: "Caixa", salario: 1420.30, cpf: "15915915952"},
    {nome: "Marcio", funcao: "Caixa", salario: 1420.30, cpf: "15915915952"},
    {nome: "Marcio", funcao: "Caixa", salario: 1420.30, cpf: "15915915952"},
    {nome: "Marcio", funcao: "Caixa", salario: 1420.30, cpf: "15915915952"},
    {nome: "Marcio", funcao: "Caixa", salario: 1420.30, cpf: "15915915952"},

];

let medicamentos = [
    {nome: "Escitalopram", preco: 30, composicao: "Ecitalopram - 10g"},
    {nome: "Multigrip", preco: 20, composicao: "Paracetamol - 400mg"},
    {nome: "Multigrip", preco: 20, composicao: "Paracetamol - 400mg"},
    {nome: "Multigrip", preco: 20, composicao: "Paracetamol - 400mg"},
    {nome: "Multigrip", preco: 20, composicao: "Paracetamol - 400mg"},

];

let clientes = [
    {nome: "Eliseu", email: "fritaalface@gmail.com", cpf: "3242343423"},
    {nome: "Eliseu", email: "fritaalface@gmail.com", cpf: "3242343423"},
    {nome: "Eliseu", email: "fritaalface@gmail.com", cpf: "3242343423"},

];

//Exibindo os medicamentos primeiro:

window.onload = function() {
    listaMedicamentos(medicamentos);
};

//Funções pra pegar o clique dos botões

const btnMed = document.querySelector("#med");
btnMed.addEventListener('click', () => {
    listaMedicamentos(medicamentos);
})

const btnFunc = document.querySelector("#func");
btnFunc.addEventListener('click', () => {
    listaFuncionarios(funcionarios);
})

const btnCli = document.querySelector("#cli");
btnCli.addEventListener('click', () => {
    listaClientes(clientes);
})

//pega valores pro cadastro

const clienteCad = document.querySelector("#cEnvia");
clienteCad.addEventListener('click', () => {
    let nome = document.querySelector(".nomecliente").value;
    let email = document.querySelector(".emailcliente").value;
    let cpf = document.querySelector(".cpfcliente").value;
    newCliente(nome, email, cpf);
    nome.value = "";
    email.value = "";
    cpf.value = "";
})

const funcionarioCad = document.querySelector("#fEnvia");
funcionarioCad.addEventListener('click', () => {
    let nome = document.querySelector(".nomefuncionario").value;
    let funcao = document.querySelector(".funcaofuncionario").value;
    let salario = document.querySelector(".salariofuncionario").value;
    let cpf = document.querySelector(".cpffuncionario").value;

    newFuncionario(nome, funcao, salario, cpf);
    nome.value = "";
    funcao.value = "";
    salario.value = "";
    cpf.value = "";
})

//Funções de editar

function clienteEdita(id){
    let nome = document.querySelector(".nomeclienteEdit").value;
    let email = document.querySelector(".emailclienteEdit").value;
    let cpf = document.querySelector(".cpfclienteEdit").value;
    alterarCliente(id, nome, email, cpf);
}

function constroeModalCliente(id){
    let nome = document.querySelector(".nomeclienteEdit");
    let email = document.querySelector(".emailclienteEdit");
    let cpf = document.querySelector(".cpfclienteEdit");
    let btn = document.querySelector("#cEdita");
    btn.setAttribute("onclick",`clienteEdita(${id});`);

    for (const [index, elemento] of clientes.entries()) {
        if(id == index){
            nome.value = elemento.nome;
            email.value = elemento.email;
            cpf.value = elemento.cpf;
            break;
        }
    }
    const myModal = document.getElementById('editarCliente');
    const modalInstance = new bootstrap.Modal(myModal);
    // Abre o modal
    modalInstance.show();
}

function funcionarioEdita(id){
    let nome = document.querySelector(".nomefuncionarioEditar").value;
    let funcao = document.querySelector(".funcaofuncionarioEditar").value;
    let salario = document.querySelector(".salariofuncionarioEditar").value;
    let cpf = document.querySelector(".cpffuncionarioEditar").value;
    alteraFuncionario(id, nome, funcao, salario, cpf);
}

function constroeModalFuncionario(id){
    console.log("oie")
    let nome = document.querySelector(".nomefuncionarioEditar");
    let funcao = document.querySelector(".funcaofuncionarioEditar");
    let salario = document.querySelector(".salariofuncionarioEditar");
    let cpf = document.querySelector(".cpffuncionarioEditar");

    let btn = document.querySelector("#fEdita");
    btn.setAttribute("onclick",`funcionarioEdita(${id});`);

    for (const [index, elemento] of funcionarios.entries()) {
        if(id == index){
            nome.value = elemento.nome;
            funcao.value = elemento.funcao;
            salario.value = elemento.salario;
            cpf.value = elemento.cpf;
            break;
        }
    }
    const myModal = document.getElementById('editarFuncionario');
    const modalInstance = new bootstrap.Modal(myModal);
    // Abre o modal
    modalInstance.show();
}

//construtor lista
function constroeLista(conteudo){
    let divPrincipal = document.querySelector(".att-content")
    divPrincipal.innerHTML = "";
    divPrincipal.appendChild(conteudo);
}

//FUNCOES FUNCIONARIO CRUD CREATE READ UPDATE DELETE

function newFuncionario(nome, funcao, salario, cpf){
    console.log(nome);
    if(validaNome(nome)){
        alert("Nome Invalido!");
    }else if(validateCPF(cpf)){
        alert("CPF Invalido!");
    }else if(validaPrecoSalario(salario)){
        alert("Salario Invalido!");
    }else{
        let funcionario = {nome: nome, funcao: funcao, salario: salario, cpf: cpf};
        funcionarios.push(funcionario);
        listaFuncionarios(funcionarios)
    }
}

//ESCREVER OS DADOS DO FUNCIONARIO
function listaFuncionarios(funcionarios){
    let filho = document.createElement('div');
    let index = 0;
    filho.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="ml-3">Listar Funcionários</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#funcionario" data-bs-whatever="@mdo">Cadastrar</button>
    </div>`
    for(funcionario of funcionarios){
        filho.innerHTML += `
        <div class="card mb-3">
        <div class="card-body">
            <p class="card-text">
            Nome: ${funcionario.nome} <br/> 
            Função: ${funcionario.funcao} <br/>
            Salário: ${funcionario.salario} <br/>
            CPF: ${funcionario.cpf}</p>
            <div class="d-flex justify-content-end">
            <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalFuncionario(${index})">Editar</a>
            <a href="#" class="btn btn-danger" onclick="deletarFuncionario(${index})">Deletar</a>
            </div>
        </div>`
        index++;
    }
    constroeLista(filho);
}

//ALTERAR DADOS DO FUNCIONARIO
function alteraFuncionario(index, nome, funcao, salario, cpf){
    if(validaNome(nome)){
        alert("Nome Invalido!");
    }else if(validateCPF(cpf)){
        alert("CPF Invalido!");
    }else if(validaPrecoSalario(salario)){
        alert("Salario Invalido!");
    }else{
        for(i in funcionarios){
            if(i == index){
                funcionarios[i].nome = nome;
                funcionarios[i].funcao = funcao;
                funcionarios[i].salario = salario;
                funcionarios[i].cpf = cpf;
            }
        }
        listaFuncionarios(funcionarios);
    }
}

//DELETAR FUNCIONARIO
function deletarFuncionario(index){
    for(i in funcionarios){
        if(i == index){
            funcionarios.splice(i, 1);
        }
    }
    listaFuncionarios(funcionarios);
}

//FUNCOES MEDICAMENTO CRUD CREATE READ UPDATE DELETE

//CRIAR MEDICAMENTO
function newMedicamento(medicamentos, nome, composicao, preco){
    if(validaPrecoSalario(preco)){
        alert("Preco Invalido!");
    }else{
        let  medicamento = {nome: nome, composicao: composicao, preco: preco};
        medicamentos.push(medicamento);
        constroeLista(divFunc, medicamentos);
    }
}


//ESCREVER OS DADOS DO MEDICAMENTO
function listaMedicamentos(medicamentos){
    let filho = document.createElement('div');
        index = 0;
        filho.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="ml-3">Listar Medicamentos</h1>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#medicamento" data-bs-whatever="@mdo">Cadastrar</button>
        </div>`
        for(medicamento of medicamentos){
            filho.innerHTML += `
            <div class="card mb-3">
            <div class="card-body">
                <p class="card-text">
                Nome: ${medicamento.nome} <br/> 
                Email: ${medicamento.preco} <br/>
                CPF: ${medicamento.composicao} <br/>
                <div class="d-flex justify-content-end">
                <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalMedicamento(${index})">Editar</a>
                <a href="#" class="btn btn-danger" onclick="deletarMedicamento(${index})">Deletar</a>
                </div>
            </div>`
            index++;
        }
        constroeLista(filho);
}

//ALTERAR MEDICAMENTO
function alterarMedicamento(medicamentos, nome, index, composicao, preco){
    if(validaPrecoSalario(preco)){
        alert("Preco Invalido!");
    }else{
        for(i of medicamentos){
            if(i == index){
                medicamentos[i].nome = nome;
                medicamentos[i].composicao = composicao;
                medicamentos[i].preco = preco;
            }
        }
        constroeLista(medicamentos);
    }
}

//DELETAR MEDICAMENTOS
function deletarMedicamento(medicamentos, index){
    for(i in medicamentos){
        if(i == index){
            medicamentos.splice(i, 1);
        }
    }
    constroeLista(medicamentos);
}

//FUNCOES CLIENTE CRUD CREATE READ UPDATE DELETE

//CRIAR CLIENTE
function newCliente(nome, email, cpf){
    if(validaNome(nome)){
        alert("Nome Invalido!");
    }else if(validateCPF(cpf)){
        alert("CPF Invalido!")
    }else{
        let  cliente = {nome: nome, cpf: cpf, email: email};
        clientes.push(cliente);
        listaClientes(clientes);
    }
}

//ESCREVER DADOS DO CLIENTE
function listaClientes(clientes){
    let filho = document.createElement('div');
        index = 0;
        filho.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="ml-3">Listar Clientes</h1>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cliente" data-bs-whatever="@mdo">Cadastrar</button>
        </div>`
        for(cliente of clientes){
            filho.innerHTML += `
            <div class="card mb-3">
            <div class="card-body">
                <p class="card-text">
                Nome: ${cliente.nome} <br/> 
                Email: ${cliente.email} <br/>
                CPF: ${cliente.cpf} <br/>
                <div class="d-flex justify-content-end">
                <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalCliente(${index})">Editar</a>
                <a href="#" class="btn btn-danger" onclick="deletarClientes(${index})">Deletar</a>
                </div>
            </div>`
            index++;
        }
        constroeLista(filho);
}

//ALTERAR CLIENTE
function alterarCliente(index, nome, email, cpf){
    if(validaNome(nome)){
        alert("Nome Invalido!");
    }else if(validateCPF(cpf)){
        alert("CPF Invalido!")
    }else{
        for(i in clientes){
            if(i == index){
                clientes[i].cpf = cpf;
                clientes[i].nome = nome;
                clientes[i].email = email;
            }
        }
        listaClientes(clientes);
    }
}

//DELETAR CLIENTES
function deletarClientes(index){
    for(i in clientes){
        if(i == index){
            console.log(`cliente ${i} deletado`);
            clientes.splice(index, 1);
        }
    }
    listaClientes(clientes);
}








//VALIDACOES

//VALIDAR NOME CLIENTE ou FUNCIONARIO
function validaNome(nome){
    if((/^[a-zA-Z\s]+$/.test(nome)) && (nome.length >= 3) && (nome.length <= 30)){
        return false;
    } else {
        return true; 
    }
}


////VALIDAR PRECO SALARIO
function validaPrecoSalario(num){
    if(/^(\d{1,3}(?:.\d{3})*|\d+)(?:,\d{2})?$/.test(num)){
        return false; 
    }else{
        return true;
    }
}


//VALIDAR CPF
function validateCPF(cpf){

        // first digit calc
        let verify = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        let result = [];
        let verifyingDigit = []
        let cpfStr = cpf.split("");
        let cpfInt = cpfStr.map(Number);
        for (let i = 0; i < 9; i++) {
            result[i] = cpfInt[i] * verify[i];
        }
        let sum = result.reduce(function(sum, i){
            return sum + i;
        });
        
        if((sum % 11) < 2){
            verifyingDigit[0] = 0;
        }
        else {
            verifyingDigit[0] = 11 - (sum % 11);
        }

        //second digit calc

        verify.unshift(11);
        result = [];
        sum = 0
        for (let i = 0; i < 10; i++){
            result[i] = cpfInt[i] * verify[i];
        }
        sum = result.reduce(function(sum, i){
            return sum + i;
        });

        if((sum % 11) < 2){
            verifyingDigit[1] = 0;
        }
        else{
            verifyingDigit[1] = 11 - (sum % 11);
        }

        //final test

        if(cpfInt[9] == verifyingDigit[0] && cpfInt[10] == verifyingDigit[1]){
            return  false;
        }
        else{
            return true;
        }
}