/**
 * Precisamos fazer com que a função pegaArquivo não receba mais uma string com valor fixo. Ela precisa receber o valor a
 * partir do mesmo terminal onde executamos o arquivo.
 *
 * (até então it's hard coded)
 *
 * Criar uma CLI, interface de linha de comando, criando um ponto de contato entre
 * nossa biblioteca e o terminal de onde virão as informações.
 */

import fs from "fs";

import pegaArquivo from "./index.js";

import chalk from "chalk";

const caminho = process.argv;

let imprimeResultado = (resultado, i) => {
  if (i) {
    console.log(chalk.magentaBright(`A lista[${i}] de itens é: `), resultado);
  } else {
    console.log(chalk.magentaBright("A lista de itens é: "), resultado);
  }
};

let processaTexto = async (argumento) => {
  const caminho = argumento[2];
  if (fs.lstatSync(caminho).isFile()) {
    const resultados = await pegaArquivo(caminho);
    imprimeResultado(resultados);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    let i = 1;
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimeResultado(lista, i);
      i++;
    });
  }
};

processaTexto(caminho);
