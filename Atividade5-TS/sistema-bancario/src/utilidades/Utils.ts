import prompt from "prompt-sync";
let input = prompt();

export function msgSucesso(): void {
  console.log("Operação efetuada com sucesso!");
}

export function msgErro(): void {
  console.log("Algo deu errado. Tente novamente:");
}

export function receberNumero(texto: string): number {
  let valor: number = parseFloat(input(texto));

  while (Number.isNaN(valor)) {
    console.log("Entrada inválida. Digite um valor.");
    valor = parseFloat(input(texto));
  }

  return valor;
}
