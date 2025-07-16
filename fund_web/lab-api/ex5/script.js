// Função para buscar uma frase aleatória
async function buscarFraseAleatoria() {
  try {
    const resposta = await fetch('https://api.quotable.io/random');
    const dados = await resposta.json();

    const frase = dados.content;
    const autor = dados.author;

    console.log(`"${frase}" — ${autor}`);
  } catch (erro) {
    console.error('Erro ao buscar a frase:', erro);
  }
}

async function buscar5Frases() {
  for (let i = 1; i <= 5; i++) {
    await buscarFraseAleatoria();
  }
}

buscar5Frases();
