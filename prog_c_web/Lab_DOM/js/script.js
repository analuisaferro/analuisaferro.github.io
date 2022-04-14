window.onload= function() {
    //console.log(receitas);
    let body = document.getElementsByTagName("body")[0];
    let tdsrec = document.createElement("div");
    tdsrec.classList.add("todas-receitas");
    body.appendChild(tdsrec);
    for (receita of receitas){
        tdsrec.appendChild(montaDiv(receita));
    }
}
function montaDiv (receita){
    let divReceita = document.createElement("div");
    divReceita.classList.add("receita");
    let titulo = document.createElement("h3");
    titulo.classList.add("t1");
    titulo.innerHTML = receita.nome;
    divReceita.appendChild(titulo);
    let desc = document.createElement("p");
    desc.classList.add("d1");
    desc.innerHTML = receita.descricao;
    divReceita.appendChild(desc);
    let photo = document.createElement("img");
    photo.classList.add("f1");
    photo.src = receita.foto;
    divReceita.appendChild(photo);
    let tituloIngredientes = document.createElement("p");
    tituloIngredientes.classList.add("tituloIngr");
    tituloIngredientes.innerHTML = "Ingredientes";
    divReceita.appendChild(tituloIngredientes);
    let ingredientes = document.createElement("ul");
    ingredientes.classList.add("ingredi1");
    for (let ingr of receita.ingredientes){
        let condimento = document.createElement("li");
        condimento.classList.add("condi1");
        condimento.innerHTML = ingr;
        ingredientes.appendChild(condimento)
    }
    divReceita.appendChild(ingredientes);
    let tituloPreparo = document.createElement("p");
    tituloPreparo.classList.add("tituloprep1");
    tituloPreparo.innerHTML = "Preparo";
    divReceita.appendChild(tituloPreparo);
    let preparo = document.createElement("ol");
    preparo.classList.add("p1");
    for (let passo of receita.preparo){
        let passos = document.createElement("li");
        passos.classList.add("pass1");
        passos.innerHTML = passo;
        preparo.appendChild(passos);
    }
    divReceita.appendChild(preparo);

    return divReceita;
}