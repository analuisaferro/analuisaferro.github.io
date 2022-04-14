let inputn1 = document.querySelector(".campo1");
let inputn2 = document.querySelector('.campo2');
let inputn3 = document.querySelector('.campo3');
let soma = document.querySelector("#somaDoisCampos");
let maior = document.querySelector("#RetornaOMaior");
let primo = document.querySelector("#VerificaPrimo");
let hipo = document.querySelector("#calculaHipotenusa");
let reajuste = document.querySelector("#reajusteSalarial");
let ftoC = document.querySelector("#transformaFparaC");
let media = document.querySelector("#calculaMedia");
soma.addEventListener("click", function(){
    let num1 = Number(inputn1.value);
    let num2 = Number(inputn2.value);
    let resultado = num1 + num2;
    return document.querySelector("#textinho").innerHTML = resultado;

})
maior.addEventListener("click", function(){
    let num1 = Number(inputn1.value);
    let num2 = Number(inputn2.value);
    if (num1>num2){
        return document.querySelector("#textinho").innerHTML = num1;
    } 
    else {
        return document.querySelector("#textinho").innerHTML = num2;
    }
})
primo.addEventListener("click", function(){
    let num1 = Number(inputn1.value);
    let divisores=0;
    for(let i=1; i<=num1; i++){
        if (num1 % i == 0){
            divisores++;
        }
    }
    if (divisores == 2){
        return document.querySelector("#textinho").innerHTML = num1 + ' é primo';
    }
    else{
        return document.querySelector("#textinho").innerHTML = num1 + ' não é primo';
    }
})
hipo.addEventListener("click", function(){
    let num1 = Number(inputn1.value);
    let num2 = Number(inputn2.value);
    let resultado = Math.hypot(num1, num2);
    return document.querySelector("#textinho").innerHTML = resultado;
})
reajuste.addEventListener("click",function(){
    let num1 = Number(inputn1.value);
    let num2 = Number(inputn2.value);
    num2 = num2/100;
    let resultado = num1 + (num1 * num2);
    return document.querySelector("#textinho").innerHTML = resultado;
})
ftoC.addEventListener("click",function(){
    let num1 = Number(inputn1.value);
    let resultado = (num1 - 32)*5/9;
    return document.querySelector("#textinho").innerHTML = resultado;

})
media.addEventListener("click",function(){
    let num1 = Number(inputn1.value);
    let num2 = Number(inputn2.value);
    let num3 = Number(inputn3.value);
    let resultado = (num1 * 2 + num2 * 3 + num3 * 5)/10;
    return document.querySelector("#textinho").innerHTML = resultado;
})