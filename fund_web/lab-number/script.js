function calcularSoma() {
    const a = Number(document.querySelector("#soma_num1").value);
    const b = Number(document.querySelector("#soma_num2").value);
    document.querySelector("#resultado_soma").innerText = `Resultado: ${a + b}`;
}

function verificarMaior() {
    const a = Number(document.querySelector("#maior_num1").value);
    const b = Number(document.querySelector("#maior_num2").value);
    const resultado = a > b ? a : b === a ? "Ambos são iguais" : b;
    document.querySelector("#resultado_maior").innerText = `Maior número: ${resultado}`;
}

function verificarPrimo() {
    const num = Number(document.querySelector("#num_primo").value);
    let ehPrimo = num > 1;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            ehPrimo = false;
            break;
        }
    }

    document.querySelector("#resultado_primo").innerText = ehPrimo
        ? `${num} é primo`
        : `${num} não é primo`;
}

function calcularHipotenusa() {
    const catA = Number(document.querySelector("#cateto_a").value);
    const catB = Number(document.querySelector("#cateto_b").value);
    const h = Math.sqrt(catA ** 2 + catB ** 2);
    document.querySelector("#resultado_hipotenusa").innerText = `Hipotenusa: ${h.toFixed(2)}`;
}

function calcularNovoSalario() {
    const salario = Number(document.querySelector("#salario_atual").value);
    const percentual = Number(document.querySelector("#percentual_reajuste").value);
    const novo = salario + (salario * percentual / 100);
    document.querySelector("#resultado_salario").innerText = `Novo salário: R$ ${novo.toFixed(2)}`;
}

function converterParaCelsius() {
    const f = Number(document.querySelector("#temp_fahrenheit").value);
    const c = (f - 32) * 5 / 9;
    document.querySelector("#resultado_celsius").innerText = `Temperatura em Celsius: ${c.toFixed(2)}°C`;
}

function calcularMediaPonderada() {
    const n1 = Number(document.querySelector("#nota1").value);
    const n2 = Number(document.querySelector("#nota2").value);
    const n3 = Number(document.querySelector("#nota3").value);
    const media = (n1 * 2 + n2 * 3 + n3 * 5) / 10;
    document.querySelector("#resultado_media").innerText = `Média final: ${media.toFixed(2)}`;
}