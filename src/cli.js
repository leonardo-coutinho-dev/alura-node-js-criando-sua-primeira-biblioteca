/**
 * Precisamos fazer com que a função pegaArquivo não receba mais uma string com valor fixo. Ela precisa receber o valor a
 * partir do mesmo terminal onde executamos o arquivo.
 *
 * (até então it's hard coded)
 *
 * Criar uma CLI, interface de linha de comando, criando um ponto de contato entre
 * nossa biblioteca e o terminal de onde virão as informações.
 */

import pegaArquivo from "./index.js";

import chalk from "chalk";

const caminho = process.argv;

let processaTexto = async (caminho) => {
  const resultados = await pegaArquivo(caminho[2]);
  console.log(
    chalk.red(`O resultado da busca com expressões regulares é: `),
    resultados
  );
};

processaTexto(caminho);
