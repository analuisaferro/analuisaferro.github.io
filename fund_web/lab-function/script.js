// Parte 1 – Funções Simples

function saudacao() {
  console.log("Olá, bem-vindo!");
}

saudacao();

// Desafio: mostrar a hora atual
function mostrarHora() {
  const agora = new Date();
  console.log("Hora atual:", agora.toLocaleTimeString());
}

mostrarHora();


// Parte 2 – Funções com Parâmetros

function saudacaoPersonalizada(nome) {
  console.log(`Olá, ${nome}! Como vai?`);
}

saudacaoPersonalizada("Lucas");

// Desafio: calcular área do retângulo
function calcularAreaRetangulo(largura, altura) {
  const area = largura * altura;
  console.log(`Área do retângulo: ${area}`);
}

calcularAreaRetangulo(5, 3);


// Parte 3 – Funções com Retorno

function somar(a, b) {
  return a + b;
}

let resultado = somar(5, 3);
console.log("Soma:", resultado);

// Desafio: verificar se número é par
function ehPar(numero) {
  return numero % 2 === 0;
}

console.log("8 é par?", ehPar(8));
console.log("7 é par?", ehPar(7));


// Parte 4 – Mini-projeto: Sistema de Notas

function calcularMedia(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

function verificarSituacao(media) {
  if (media >= 7) return "Aprovado";
  if (media >= 5) return "Em recuperação";
  return "Reprovado";
}

let media = calcularMedia(6.5, 8.0, 7.0);
console.log(`Média: ${media.toFixed(2)} - Situação: ${verificarSituacao(media)}`);

// Desafio Bônus: função completa de avaliação

function avaliarAluno(nome, n1, n2, n3) {
  const mediaFinal = calcularMedia(n1, n2, n3);
  const situacao = verificarSituacao(mediaFinal);
  console.log(`Aluno: ${nome} | Média: ${mediaFinal.toFixed(2)} | Situação: ${situacao}`);
}

avaliarAluno("Luciana", 8, 9.5, 7);
