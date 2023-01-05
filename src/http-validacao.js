let extraiLinks = (arrLinks) => {
  return arrLinks.map((objectLink) => {
    return Object.values(objectLink).join();
  });
};

let checaStatus = async (listaURLs) => {
  const arrayStatus = await Promise.all(
    listaURLs.map(async (url) => {
      const response = await fetch(url);
      return response.status;
    })
  );
  return arrayStatus;
};

// extrai links retorna um array

export default async function listaValidada(listaDeLinks) {
  let links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
}
