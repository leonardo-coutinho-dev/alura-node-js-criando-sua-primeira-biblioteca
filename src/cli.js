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

import listaValidada from "./http-validacao.js";

const caminho = process.argv;

let imprimeResultado = async (valida, resultado, identificador = "") => {
  if (valida) {
    console.log(
      chalk.white.bgBlack(identificador),
      chalk.magentaBright("A lista de itens (validada) é: "),
      await listaValidada(resultado),
      `\n`
    );
  } else {
    console.log(
      chalk.white.bgBlack(identificador),
      chalk.magentaBright("A lista de itens (não validada) é: "),
      resultado,
      `\n`
    );
  }
};

let processaTexto = async (argumento) => {
  const caminho = argumento[2];
  const valida = argumento[3];

  console.log(valida);

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log(
        "Arquivo ou diretório não encontrados, verifique o caminho passado como parâmetro!"
      );
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultados = await pegaArquivo(caminho);
    imprimeResultado(valida, resultados);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimeResultado(valida, lista, nomeDoArquivo);
    });
  }
};

processaTexto(caminho);
