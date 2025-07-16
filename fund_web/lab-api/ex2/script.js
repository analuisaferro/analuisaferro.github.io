async function buscarFilme(titulo) {
    const resposta =  await fetch(`http://www.omdbapi.com/?s=${titulo}&apikey=c5df7abd`)
    if(!resposta.ok) {
        console.error("Não foi possivel estabeler conexão");
        return;
    } else {
        const data = await resposta.json();
        let filmes = [];
        filmes = data.Search;
        const filmesXXI = filmes.filter(filme => filme.Year >= 2000);
        console.log(filmesXXI);
        const info = filmesXXI.map(filme => ({
            titulo: filme.Title,
            ano: filme.Year,
        }));

        console.log(info);
    }
}

buscarFilme('authority');