//FUNÇÕES DE MANIPULAÇÃO
function adicionarLivro(titulo, autor) {
	biblioteca.push({
		titulo,
		autor,
		disponivel: true,
		emprestimos: 0
	});
}

function emprestarLivro(titulo) {
	const livro = biblioteca.find(l => l.titulo === titulo);

	if (livro && livro.disponivel) {
		livro.disponivel = false;
		livro.emprestimos += 1;
		console.log(`Livro "${titulo}" emprestado com sucesso.`);
	} else {
		console.log(`Livro "${titulo}" não está disponível.`);
	}
}

function listarLivrosDisponiveis() {
	return biblioteca.filter(livro => livro.disponivel);
}

function listarTitulosEmprestados() {
	return biblioteca.filter(livro => !livro.disponivel).map(livro => livro.titulo);
}

function totalDeEmprestimos() {
	return biblioteca.reduce((soma, livro) => soma + livro.emprestimos, 0);
}

//Testes

adicionarLivro("Olhai os Lírios do Campo", "Érico Veríssimo");
adicionarLivro("A Hora da Estrela", "Clarice Lispector");

emprestarLivro("A Hora da Estrela");


console.log("Livros disponíveis:", listarLivrosDisponiveis());
console.log("Títulos emprestados:", listarTitulosEmprestados());
console.log("Total de empréstimos:", totalDeEmprestimos());
