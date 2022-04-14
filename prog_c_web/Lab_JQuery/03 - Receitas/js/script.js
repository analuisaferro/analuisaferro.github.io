let url = 'https://rafaelescalfoni.github.io/desenv_web/receitas.json';
$.get(url, (data,status) => {
        data.forEach(receita => {
            const divReceita = $("<div>");
            divReceita.attr('class', "receita");
            divReceita.append(`<h3 class="t1">${receita.nome}</h3>
                               <p class="d1">${receita.descricao}</p>
                               <img src="${receita.foto}" class='f1'>`);
            divReceita.append('<p class="tituloIngr">Ingredientes</p>');
            const ingredienteul = $("<ul class='ingredi1'>");
            receita.ingredientes.forEach((preparo) =>{
                const itlistaing = $("<li class='condi1'>")
                itlistaing.text(preparo);
                ingredienteul.append(itlistaing);
            })
            divReceita.append(ingredienteul);
            divReceita.append('<p class="tituloprep1">Preparo</p>');
            const preparool = $("<ol class='p1'>");
            receita.preparo.forEach((preparo) =>{
                const itlista = $("<li class='pass1'>");
                itlista.text(preparo);
                preparool.append(itlista);
            })
            
            divReceita.append(preparool);
            const receitas = $("<div class='todas-receitas'>")
            receitas.append(divReceita);
            $('body').append(receitas);
        })







  
    })