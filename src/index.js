// const chalk = require('chalk'); - maneira antiga de importar código

import fs from "fs";

import chalk from "chalk";

// #1 TESTANDO A LIB CHALK

// console.log("olá mundo, esse é o meu programa!");

// console.log(chalk.blue.bgWhite("Olá mundo, com esse texto agora em azul!"));

// console.log(
//   chalk.yellowBright.bgRed("Olá mundo, com esse texto agora em amarelo!")
// );

// console.log(
//   chalk.redBright.bgBlue("Olá mundo, com esse texto agora em vermelho!")
// );

// console.log(
//   chalk.cyanBright.bgGreen("Olá mundo, com esse texto agora em ciano!")
// );

// #2 FUNÇÃO COM REGEX PARA FILTRAR O TEXTO

let extraiLinks = (texto) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.][^\s]*)\)/gm;
  const captura = [...texto.matchAll(regex)];
  const resultados = captura.map((item) => ({ [item[1]]: item[2] }));
  return resultados.length !== 0
    ? resultados
    : "Não foram encontradas informações com os parâmetros passados!";
};

// #3 FUNÇÃO PARA TRATAMENTO DE ERRO

let trataErro = (erro) => {
  console.log(erro);
  if (erro.code === "ENOENT") {
    throw new Error(
      chalk.red(
        erro.code,
        "O caminho do arquivo está incorreto (arquivo não encontrado)!"
      )
    );
  } else if (erro.code === "EISDIR") {
    throw new Error(
      chalk.red(erro.code, "Não há arquvivo no diretório (ação não permitida)!")
    );
  }
};

// #4 USANDO O fetch();

// let pegaArquivo = (caminhoDoArquivo) => {
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => {
//       console.log(chalk.green(texto));
//     })
//     .catch((err) => trataErro(err));
// };

// #5 USANDO O ASYNC/AWAIT

let pegaArquivo = async (caminhoDoArquivo) => {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.green("Execução finalizada!"));
  }
};

export default pegaArquivo;

// Qual a diferença entre os dois?

/**
 *

  Os métodos then e async/await funcionaram, mas a diferença entre eles está na escrita. Em termos de processamento e performance, elas são similares. A primeira opção tem uma escrita um pouco mais funcional, com encadeamento de funções uma abaixo da outra, enquanto a segunda faz com que escrevamos código assíncrono de uma maneira semelhante ao código síncrono.
  
  Regular expression to capture the title of the link:

  \[[^[\]]*?\]

  Regular expression to capture the link itself:

  \(https?:\/\/[^\s?#.][^\s]*\)

  Complete regular expression, capturing the title and the link separeted in groups:

  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.][^\s]*)\)

  Now that we have the two regular expressions, let's move forward!

 */
