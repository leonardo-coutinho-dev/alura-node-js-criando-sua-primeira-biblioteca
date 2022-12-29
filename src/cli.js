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

const caminho = process.argv;

pegaArquivo(caminho[2]);
