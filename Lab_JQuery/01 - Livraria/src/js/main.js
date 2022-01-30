//função construtora de objetos Produto
function Livro(id, nome, autores, estilo, descricao){
	this.id = id;
	this.nome = nome;
	this.autores = autores;
	this.estilo = estilo;
	this.descricao = descricao;
}
var listaLivros = [];
// programar a inserção dos novos livros no array listaLivros e sua adição no DOM
function adicionarLivro(livro){
	listaLivros.push(livro)
}

// programar a remoção do livro no array listaLivros e sua remoção no DOM
function removerLivro(id){
let suma = listaLivros.findIndex(livrinho => livrinho.id == id);
listaLivros.splice(suma,1);
}
$(function(){
let a = 0;
	$("#add").click(function(){
		var id = a;
		a++;
		var tituloLivro = $("#titulo").val();
		var autores = $("#autores").val();
		var estilo = $("#estilo").val();
		var descricao = $("#descricao").val();
		adicionarLivro(new Livro (id, tituloLivro, autores, estilo, descricao));
		console.log(listaLivros);
		$("#acervo").append(
				$("<tr>")
					.append($("<td>").text(tituloLivro))
					.append($("<td>").text(autores))
					.append($("<td>").text(estilo))
					.append($("<td>").text(descricao))
					.append($("<td>")
						.append($("<a>")
								.attr("href", "#")
								.attr("id", id)
								.text("Apagar"))
					)
		)
		$("#titulo").val("");
		$("#autores").val("");
		$("#estilo").val("");
	});
	$("#acervo").on("click", "a", function(){
		$(this).parents("tr").remove();
		removerLivro($(this).attr("id"));
		console.log(listaLivros);
		
	})
	$("#apagarAcervo").click(function(){
		$("#acervo").empty();
		$("#acervo")
			.append($("<tr>")
						.append($("<th>").text("Título"))
						.append($("<th>").text("Autores"))
						.append($("<th>").text("Estilo"))
						.append($("<th>").text(""))
					)
	})

	$("#enviar").click(function(){
		
		let url = "http://httpbin.org/post";
		let dados = listaLivros;
		$.post(url, dados, function(data,status){
			alert("Data: " + data + "\nStatus: " + status);
		  }
		);
	})

});