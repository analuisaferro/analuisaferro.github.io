async function converterMoedaUSD(valor, mDestino) {
    const resposta = await fetch('https://v6.exchangerate-api.com/v6/75eb4c854d173561826ea68e/latest/USD');
    if (!resposta.ok) console.error('Erro na requisição');
    else {
        const dados = await resposta.json();
        const taxa = dados.conversion_rates[mDestino];
        const convertido = valor * taxa;
        console.log(`${valor} USD = ${convertido.toFixed(2)} ${mDestino}`)
    }
}

converterMoedaUSD(50, 'BRL');