import fetch from "node-fetch";

function manejaErros(erro){
    throw new Error(erro.mesage);
}

async function checaStatus(arrayUrl) {
  try{
    const arrayStatus = await Promise.all(
      arrayUrl.map(async (url) => {
        const res = await fetch(url);
        return res.status;
      })
    );
    return arrayStatus;
  }
  catch(erro){
    manejaErros(erro);
  }
}

function geraArrayUrl(arrayLinks) {
  // Object.values - Vai pegar apenas os valores e colocar em outro array
  return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function validaUrl(arrayLinks) {
  const links = geraArrayUrl(arrayLinks);
  const statusLinks = await checaStatus(links);
  const resultados = arrayLinks.map((objeto, index) => ({
    ...objeto,
    status: statusLinks[index],
  }));
  return resultados;
}

export default validaUrl;
