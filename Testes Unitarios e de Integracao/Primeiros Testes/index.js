// Baixar a extensão Eslint

const somaHorasExtras = (salario, horasExtra) => salario + horasExtra;

const calculaDescontos = (salario, descontos) => salario - descontos;

export {
  somaHorasExtras,
  calculaDescontos,
};

// const verifiqueSe = (valor) => {
//   const assercoes = {
//     ehExatamenteIgual(esperado) {
//       if (valor !== esperado) {
//         // eslint-disable-next-line no-throw-literal
//         throw {};
//       }
//     },
//   };
//   return assercoes;
// };

// const teste = (titulo, funcaoTeste) => {
//   try {
//     funcaoTeste();
//     // eslint-disable-next-line no-console
//     console.log(`${titulo} passou!`);
//   } catch {
//     // eslint-disable-next-line no-console
//     console.error(`${titulo} não passou!!!`);
//   }
// };

// teste('somaHorasExtras', () => {
//   const esperado = 2500;
//   const retornado = somaHorasExtras(2000, 500);

//   verifiqueSe(retornado).ehExatamenteIgual(esperado);
// });

// teste('calculaDesconto', () => {
//   const esperado = 2300;
//   const retornado = calculaDescontos(2500, 200);

//   verifiqueSe(retornado).ehExatamenteIgual(esperado);
// });
