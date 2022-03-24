
var xhr = new XMLHttpRequest();
var filmes;
xhr.onreadystatechange = function (){
    if(xhr.readyState == 4 && xhr.status == 200){
        filmes = JSON.parse(xhr.response);
        console.log(xhr.response)
        montahtml(filmes)
    }
}

xhr.open("GET", "https://rafaelescalfoni.github.io/desenv_web/filmes.json")
xhr.send();
function montahtml(filmes){
    for(let filme of filmes){
        let divPrincipal = document.querySelector("#todos-filmes")
        let filmeIndividual = document.createElement("div");
        filmeIndividual.classList.add("filme");
        let titulo = document.createElement("h2");
        titulo.classList.add("titulo");
        titulo.innerHTML = filme.titulo;
        filmeIndividual.appendChild(titulo);

        let clas = document.createElement("p");
        if(filme.classificacao <=14){
            clas.classList.add("classificacao-0-14");
        }
        else {
            if(filme.classificacao <=16){
                clas.classList.add("classificacao-15-16")
            }
            else {
                clas.classList.add("classificacao-18")
            }
        }
        clas.innerHTML = filme.classificacao;
        filmeIndividual.appendChild(clas);

        let conjunto = document.createElement("ul");
        conjunto.classList.add("generos");
        for(let genero of filme.generos){
            let gen = document.createElement("li");
            gen.classList.add("genero");
            gen.innerHTML = genero + " ";
            conjunto.appendChild(gen);
        }
        filmeIndividual.appendChild(conjunto);

        let front = document.createElement("div");
        front.classList.add("front-img");
        let img = document.createElement("img");
        img.classList.add("imagem");
        img.src = filme.figura;
        front.appendChild(img);

        let back = document.createElement("div");
        back.classList.add("back-txt");
        let res = document.createElement("p");
        res.classList.add("resumo");
        res.innerHTML = filme.resumo;
        back.appendChild(res);

        let tituloElenco = document.createElement("p");
        tituloElenco.classList.add("titulo-elenco");
        tituloElenco.innerHTML = "Elenco";
        
        let elen = document.createElement("ul");
        elen.classList.add("elenco");
        for (let ator of filme.elenco){
            let actor = document.createElement("li");
            actor.classList.add("ator");
            actor.innerHTML = ator;
            elen.appendChild(actor);
        }
        

        let tituloOpinioes = document.createElement("p");
        tituloOpinioes.classList.add("titulo-opinioes");
        tituloOpinioes.innerHTML = "Opiniões";
        back.appendChild(tituloOpinioes);

        let op = document.createElement("ul");
        op.classList.add("opinioes");
        for (let opiniao of filme.opinioes){
        let opiniaoin = document.createElement("li");
        opiniaoin.classList.add("opiniao");
        opiniaoin.innerHTML = opiniao.descricao;
        op.appendChild(opiniaoin);
        let estrelinha = "avaliação: ";
        for(let i=0; i<opiniao.rating; i++){
            estrelinha += "★";
        }
        let star = document.createElement("li");
        star.classList.add("opiniao");
        star.innerHTML = estrelinha;
        op.appendChild(star);
        }
        back.appendChild(op);

        let tituloSemelhan = document.createElement("p");
        tituloSemelhan.classList.add("titulo-Tsemelhantes");
        tituloSemelhan.innerHTML = "Títulos semalhantes";
        

        let TSemelelhante = document.createElement("ul");
        TSemelelhante.classList.add("Titulos-semelhantes");

        for (let TSem of filme.titulosSemelhantes){
            for (let filminho of filmes){
                if(TSem == filminho.id){
                    let tituloSem = document.createElement("li");
                    tituloSem.classList.add("Titulo-semel");
                    tituloSem.innerHTML = filminho.titulo + "   ";
                    TSemelelhante.appendChild(tituloSem);
                }
            }
        }

        let elenTitu = document.createElement("div");
        elenTitu.classList.add("elenco-titulos");
        let titulosDIV = document.createElement("div");
        titulosDIV.classList.add("titulos-div");
        let elencoDIV = document.createElement("div");
        elencoDIV.classList.add("elenco-div");


        elencoDIV.appendChild(tituloElenco);
        elencoDIV.appendChild(elen);
        titulosDIV.appendChild(tituloSemelhan);
        titulosDIV.appendChild(TSemelelhante);
        elenTitu.appendChild(elencoDIV);
        elenTitu.appendChild(titulosDIV);
        back.appendChild(elenTitu);


        let tudo = document.createElement("div");
        tudo.classList.add("inteiro");
        tudo.appendChild(front);
        tudo.appendChild(filmeIndividual);
        tudo.appendChild(back);
        divPrincipal.appendChild(tudo)
    }
}
