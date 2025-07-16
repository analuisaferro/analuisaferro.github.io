async function buscarClimaExtremo(cidade) {
    const apiKey = '54a06451d9da40f28c776dbf31a2c366';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            console.error('Cidade não encontrada ou erro na API');
            return;
        }
        const dados = await resposta.json();

        const temperatura = dados.main.temp;
        const umidade = dados.main.humidity;
        const condicao = dados.weather.map(w => w.main);

        const extremos = condicao.filter(() => temperatura > 35 || temperatura < 5);

        if (extremos.length > 0) {
            console.log(`Clima extremo em ${cidade}!`);
            console.log(`Temperatura: ${temperatura}°C`);
            console.log(`Umidade: ${umidade}%`);
            console.log(`Condição(s): ${condicao.join(', ')}`);
        } else {
            console.log(`Clima normal em ${cidade}.`);
            console.log(`Temperatura: ${temperatura}°C`);
            console.log(`Umidade: ${umidade}%`);
            console.log(`Condição(s): ${condicao.join(', ')}`);
        }
    } catch (erro) {
        console.error('Erro:', erro.message);
    }
}

buscarClimaExtremo('São Paulo');
