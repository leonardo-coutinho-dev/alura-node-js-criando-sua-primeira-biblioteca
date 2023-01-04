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

let imprimeResultado = (resultado, identificador = "") => {
  console.log(
    chalk.white.bgBlack(identificador),
    chalk.magentaBright("A lista de itens é: "),
    resultado,
    `\n`
  );
};

let processaTexto = async (argumento) => {
  const caminho = argumento[2];

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
    imprimeResultado(resultados);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimeResultado(lista, nomeDoArquivo);
    });
  }
};

processaTexto(caminho);
