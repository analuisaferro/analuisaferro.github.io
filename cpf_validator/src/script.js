let input = document.querySelector("#cpf-input");
let button = document.querySelector("#cpf-validate");
let res = document.querySelector(".response");
input.addEventListener('keypress', ()=>{
    let inputlength = input.value.length;
    
    if(inputlength==3){
        input.value += "."
    }
    if(inputlength==7){
        input.value += "."
    }
    if(inputlength==11){
        input.value += "-"
    }
});

button.addEventListener('click', ()=>{
    
    let formcpf = input.value;
    cpf = formcpf.replace(/[^\d]+/g,'');
    if(cpf.length != 11){
        alert("Digite os 11 números do CPF.")
    }
    else{
        
        if (validateCPF(cpf))
        {
            res.innerHTML = "";
            let text = document.createElement("h4");
            text.id = "text-res";
            text.style.color = "#43AB2E"
            text.innerHTML = "CPF válido!";
            res.appendChild(text);
        }
        else{
            res.innerHTML = "";
            let text = document.createElement("h4");
            text.id = "text-res";
            text.style.color = "#AD2323"
            text.innerHTML = "CPF Inválido!";
            res.appendChild(text);
        }
    }

    
})

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
        return true;
    }
    else{
        return false;
    }
}
