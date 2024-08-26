
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

const medicamentoCad = document.querySelector("#mEnvia");
medicamentoCad.addEventListener('click', () => {
    let nome = document.querySelector(".nomeMedicamento").value;
    let preco = document.querySelector(".precoMedicamento").value;
    let composicao = document.querySelector(".composicaoMedicamento").value;
    newMedicamento(nome, preco, composicao);
    nome.value = "";
    preco.value = "";
    composicao.value = "";
})

//Funções de editar

function medicamentoEdita(id){
    let nome = document.querySelector(".nomeMedicamentoEditar").value;
    let preco = document.querySelector(".precoMedicamentoEditar").value;
    let composicao = document.querySelector(".composicaoMedicamentoEditar").value;
    alterarMedicamento(id, nome, preco, composicao);
}

function constroeModalMedicamento(id){
    let nome = document.querySelector(".nomeMedicamentoEditar");
    let preco = document.querySelector(".precoMedicamentoEditar");
    let composicao = document.querySelector(".composicaoMedicamentoEditar");
    let btn = document.querySelector("#mEdita");
    btn.setAttribute("onclick",`medicamentoEdita(${id});`);

    for (const [index, elemento] of medicamentos.entries()) {
        if(id == index){
            nome.value = elemento.nome;
            preco.value = elemento.preco;
            composicao.value = elemento.composicao;
            break;
        }
    }
    const myModal = document.getElementById('editarMedicamento');
    const modalInstance = new bootstrap.Modal(myModal);
    // Abre o modal
    modalInstance.show();
}

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
    }else if(antiVazio(funcao)){
        alert("Funcao invalida!")
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
    <button type="button" class="btn btn-primary cad-btn" data-bs-toggle="modal" data-bs-target="#funcionario" data-bs-whatever="@mdo">Cadastrar</button>
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
            <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalFuncionario(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
            <a href="#" class="btn btn-danger" id="deletar" onclick="deletarFuncionario(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
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
    }else if(antiVazio(funcao)){
        alert("Funcao invalida!")
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
function newMedicamento(nome, preco, composicao){
    if(validaPrecoSalario(preco)){
        alert("Preco Invalido!");
    }else if(antiVazio(composicao)){
        alert("Campo Composicao vazio!")
    }else{
        let  medicamento = {nome: nome, preco: preco, composicao: composicao};
        medicamentos.push(medicamento);
        listaMedicamentos(medicamentos);
    }
}


//ESCREVER OS DADOS DO MEDICAMENTO
function listaMedicamentos(medicamentos){
    let filho = document.createElement('div');
        index = 0;
        filho.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="ml-3">Listar Medicamentos</h1>
        <button type="button" class="btn btn-primary cad-btn" data-bs-toggle="modal" data-bs-target="#medicamento" data-bs-whatever="@mdo">Cadastrar</button>
        </div>`
        for(medicamento of medicamentos){
            filho.innerHTML += `
            <div class="card mb-3">
            <div class="card-body">
                <p class="card-text">
                Nome: ${medicamento.nome} <br/> 
                Preço: ${medicamento.preco} <br/>
                Principal composto: ${medicamento.composicao} <br/>
                <div class="d-flex justify-content-end">
                <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalMedicamento(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                <a href="#" class="btn btn-danger" id="deletar" onclick="deletarMedicamento(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                </div>
            </div>`
            index++;
        }
        constroeLista(filho);
}

//ALTERAR MEDICAMENTO
function alterarMedicamento(index, nome, preco, composicao){
    if(validaPrecoSalario(preco)){
        alert("Preco Invalido!");
    }else if(antiVazio(composicao)){
        alert("Campo Composicao vazio!")
    }else{
        for(i in medicamentos){
            if(i == index){
                medicamentos[i].nome = nome;
                medicamentos[i].preco = preco;
                medicamentos[i].composicao = composicao;
            }
        }
        listaMedicamentos(medicamentos);
    }
}

//DELETAR MEDICAMENTOS
function deletarMedicamento(index){
    for(i in medicamentos){
        if(i == index){
            medicamentos.splice(index, 1);
        }
    }
    listaMedicamentos(medicamentos);
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
        <button type="button" class="btn btn-primary cad-btn" data-bs-toggle="modal" data-bs-target="#cliente" data-bs-whatever="@mdo">Cadastrar</button>
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
                <a href="#" class="btn btn-primary" id="editar" onclick="constroeModalCliente(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                <a href="#" class="btn btn-danger" id="deletar" onclick="deletarClientes(${index})"><?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
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


//IMPEDIR CAMPOS VAZIOS
function antiVazio(n){
    if(n == ""){
        return true;
    }else{
        return false
    }
}

//VALIDAR NOME CLIENTE ou FUNCIONARIO
function validaNome(nome){
    if((/^[a-zA-Z\s]+$/.test(nome)) && (nome.length >= 3)){
        return false;
    } else {
        return true; 
    }
}


////VALIDAR PRECO SALARIO
function validaPrecoSalario(num){
    if(/^\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?$/.test(num)){
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