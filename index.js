// const chalk = require('chalk'); - maneira antiga de importar código

import fs from "fs";

import chalk from "chalk";

// testando a lib chalk

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

// Usando o fetch();

// let pegaArquivo = (caminhoDoArquivo) => {
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => {
//       console.log(chalk.green(texto));
//     })
//     .catch((err) => trataErro(err));
// };

// Usando o async/await

let pegaArquivo = async (caminhoDoArquivo) => {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(chalk.green(texto));
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.blue("Execução finalizada!"));
  }
};

pegaArquivo("./arquivo/texto.md");

// Qual a diferença entre os dois?

/**
 *

  Os métodos then e async/await funcionaram, mas a diferença entre eles está na escrita. Em termos de processamento e performance, elas são similares. A primeira opção tem uma escrita um pouco mais funcional, com encadeamento de funções uma abaixo da outra, enquanto a segunda faz com que escrevamos código assíncrono de uma maneira semelhante ao código síncrono.
  
 */
