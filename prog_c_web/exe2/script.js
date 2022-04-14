let inputn1 = document.querySelector(".campo1");
let inputn2 = document.querySelector('.campo2');
let inputn3 = document.querySelector('.campo3');
let inverte = document.querySelector("#InverteCarac");
let boold = document.querySelector("#vogaisNegrito");
let tabelita = document.querySelector("#separaTabela");
let maior = document.querySelector("#maiorOcorr");
let subs = document.querySelector("#substitue");
let dias = document.querySelector("#diasVida");
let ext = document.querySelector("#extenso");
let semanas = document.querySelector("#semana")
let senhas = document.querySelector("#verSenha")
let cod = document.querySelector("#tenispolar")
inverte.addEventListener("click", function(){
    let text1 = String(inputn1.value);
    console.log(text1);
    let aux = text1.split("");
    console.log(aux);
    aux = aux.reverse();
    return document.querySelector("#resultado").innerHTML = aux.join("");
})
boold.addEventListener("click", function(){
    let text1 = String(inputn1.value);
    let aux = text1.split("");
    let i = 0;
    let final = []
    aux.forEach(function(){
        switch(aux[i]){
            case 'a': final[i]= "<b>a</b>"; break;
            case 'e': final[i]= "<b>e</b>"; break;
            case 'i': final[i]= "<b>i</b>"; break;
            case 'o': final[i]= "<b>o</b>"; break;
            case 'u': final[i]= "<b>u</b>"; break;
            case 'A': final[i]= "<b>A</b>"; break;
            case 'E': final[i]= "<b>E</b>"; break;
            case 'I': final[i]= "<b>I</b>"; break;
            case 'O': final[i]= "<b>O</b>"; break;
            case 'U': final[i]= "<b>U</b>"; break;
            default : final[i] = aux[i];
        }
        i++;
    })
    return document.querySelector("#resultado").innerHTML = final.join("");

})
tabelita.addEventListener("click",function(){
    let text1 = String(inputn1.value);
    let aux = text1.split(" ");
    const counts = {};
    for (const palavra of aux) {
    if (counts[palavra]){
        counts[palavra] = counts[palavra]+1;
    }
    else {
        counts[palavra] = 1;
    }
}
    let texto = "Palavra x Ocorrências <br>";
    var elemen = document.getElementById("resultado");
    elemen.innerHTML = texto;
    for (prop in counts){
        console.log(prop);
        console.log(counts[prop]);
        texto += prop + " : " + counts[prop] + ". <br>";
    }
    elemen.innerHTML = texto;
})
maior.addEventListener("click", function(){
    let text1 = String(inputn1.value);
    let aux = text1.split(" ");
    const counts = {};
    for (const palavra of aux) {
    if (counts[palavra]){
        counts[palavra] = counts[palavra]+1;
    }
    else {
        counts[palavra] = 1;
    }}
let aux2 = 0;
let nome = "";
    for (prop in counts){
        if (aux2 < counts[prop]){
            aux2 = counts[prop];
            nome = prop;
        }
    }
    let elemen = document.getElementById("resultado");
    let texto = "";
    elemen.innerHTML = "A palavra com maior ocorrência: "+ nome + ". <br>Número de ocorrências: " + aux2 + ".";
})
subs.addEventListener("click", function(){
    text1= String(inputn1.value);
    palavravelha = String(inputn2.value);
    palavranova = String(inputn3.value);
    aux = text1.split(" ");
    for(i in aux){
        if (aux[i]==palavravelha){
            aux[i]=palavranova;
        }
    }
    return document.querySelector("#resultado").innerHTML = aux.join(" "); 
})
diasVida.addEventListener("click", function(){
    datanas = String(inputn1.value);
    let dia = datanas.split("/")[0];
    let mes = datanas.split("/")[1];
    let ano = datanas.split("/")[2];
    var data = new Date();
    let meshj = (data.getMonth()+1)
    var anohj = data.getFullYear();

    let vividos = parseInt((anohj - ano - 1) * 365 + meshj - mes + meshj);
    return document.querySelector("#resultado").innerHTML = vividos + " dias.";
})
ext.addEventListener("click", function(){
    text1 = String(inputn1.value);
    data = text1.split("/");
    mesextenso = "";
    let i = 1;
    switch(data[i]){
        case '01' : mesextenso = 'janeiro'; break;
        case '02' : mesextenso = 'fevereiro'; break; //1315098000000
        case '03' : mesextenso = 'março'; break;
        case '04' : mesextenso = 'abril'; break;
        case '05' : mesextenso = 'maio'; break;
        case '06' : mesextenso = 'junho'; break;
        case '07' : mesextenso = 'julho'; break;
        case '08' : mesextenso = 'agosto'; break;
        case '09' : mesextenso = 'setembro'; break;
        case '10' : mesextenso = 'outubro'; break;
        case '11' : mesextenso = 'novembro'; break;
        case '12' : mesextenso = 'dezembro'; break;
    }
    return document.querySelector("#resultado").innerHTML = data[0] + " de " + mesextenso + " de " + data[2];

})
semanas.addEventListener("click", function(){
    let data1 = new Date(inputn1.value);
    let data2 = new Date(inputn2.value);
    let dif = Date.parse(data2) - Date.parse(data1);
    console.log(dif);
    dif /= 1000;
    console.log(dif);
    dif /= 604800;
    console.log(dif);
    return document.querySelector("#resultado").innerHTML = Math.round(dif);
})
senhas.addEventListener("click", function(){
    let senha = String(inputn1.value);
    let verificacao = [0, 0, 0];
    if (senha.match(/[a-z]+/)){
        verificacao[0] = 1;
        if (senha.match(/[A-Z]+/) && senha.match(/[0-9]+/)){
            verificacao[1] = 1;
            if (senha.match(/[\W]/)){
                verificacao[2]=1;
            }
        }
    }
    
    if (verificacao[0] == 1){
        if (verificacao[1] == 1){
            if (verificacao[2] == 1){
                return document.querySelector("#resultado").innerHTML = "Senha forte."
            }
            else {
                return document.querySelector("#resultado").innerHTML = "Senha moderada."
            }
        }
        else {
            return document.querySelector("#resultado").innerHTML = "Senha fraca."
        }
    }
})
cod.addEventListener("click", function(){
    let text1 = String(inputn1.value)
    let codigo = text1;
    if (text1.match(/t/gi)){
        codigo = codigo.replace(/t/gi,'p')
    }
    if (text1.match(/e/gi)){
        codigo = codigo.replace(/e/gi,'o')
    }
    if (text1.match(/n/gi)){
        codigo = codigo.replace(/n/gi,'l')
    }
    if (text1.match(/i/gi)){
        codigo = codigo.replace(/i/gi,'a')
    }
    if (text1.match(/s/gi)){
        codigo = codigo.replace(/s/gi,'r')
    }


    return document.querySelector("#resultado").innerHTML = codigo;
})
