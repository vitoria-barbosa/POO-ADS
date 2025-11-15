import Cliente from "../classes/Cliente";
import Conta from "../classes/Conta";

import prompt from "prompt-sync";
let input = prompt();

export function msgSucesso(): void {
  console.log("Operação efetuada com sucesso!");
}

export function receberNumero(texto: string): number {
  let valor: number = parseFloat(input(texto));

  while (Number.isNaN(valor)) {
    console.log("Entrada inválida. Digite um valor.");
    valor = parseFloat(input(texto));
  }

  return valor;
}

export function inicializarClientes(): Cliente[] {
  let clientes: Cliente[] = [];

  let cliente1: Cliente = new Cliente(
    1,
    "Vitória",
    "123",
    new Date(2006, 11, 2)
  );
  cliente1.adicionarConta(new Conta(1, "111-1", cliente1, 10));

  let cliente2: Cliente = new Cliente(2, "Júlia", "456", new Date(2006, 11, 2));
  cliente2.adicionarConta(new Conta(2, "222-2", cliente2, 10));

  let cliente3: Cliente = new Cliente(3, "Joana", "789", new Date(2006, 11, 2));
  cliente3.adicionarConta(new Conta(3, "333-3", cliente3, 10));

  let cliente4: Cliente = new Cliente(
    4,
    "Kamila",
    "654",
    new Date(2006, 11, 2)
  );
  cliente4.adicionarConta(new Conta(4, "444-4", cliente4, 10));

  clientes.push(cliente1, cliente2, cliente3, cliente4);

  return clientes;
}

export function inicializarContas(clientes: Cliente[]): Conta[] {
  let contas: Conta[] = [];

  for (let cliente of clientes) {
    let conta = cliente.contas.at(0);
    if (conta) {
      contas.push(conta);
    }
  }

  return contas;
}
