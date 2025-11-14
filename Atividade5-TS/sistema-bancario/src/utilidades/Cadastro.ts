import Cliente from "../classes/Cliente";
import Conta from "../classes/Conta";

import prompt from "prompt-sync";
let input = prompt();

export default class Cadastro {
  public static cadastrarCliente(clientes: Cliente[]): Cliente {
    console.log("\n>>> CADASTRAR CLIENTE: \n");

    let ultimoId: number = clientes.at(clientes.length - 1)?.id ?? 1; // se for undefined atribui 1.
    let idCliente: number = ultimoId + 1;
    let nome: string = input("Digite o nome do cliente: ");
    let dataNascimento: Date = new Date(
      input("Digite a data de nascimento (AAAA-MM-DD): ")
    );

    let cpf: string = input("Digite o CPF do cliente: ");
    let jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);

    while (jaTemCPF) {
      console.log("Já existe um cliente com esse CPF. Tente novamente:");
      cpf = input("Digite o CPF do cliente: ");
      jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);
    }

    console.log("\nCadastro realizado com sucesso!");
    return new Cliente(idCliente, nome, cpf, dataNascimento);
  }

  public static criarConta(contas: Conta[], cliente: Cliente): Conta {
    console.log("\n>>> CRIAR CONTA: \n");

    let ultimoId: number = contas.at(contas.length - 1)?.id ?? 1; // se for undefined atribui 1.
    let idConta: number = ultimoId + 1;
    let numero: string = input("Digite o número da conta: ");

    let jaTemNumero = contas.find((conta) => conta.numero == numero);

    while (jaTemNumero) {
      console.log("Já existe uma conta com esse número. Tente novamente:");
      numero = input("Digite o número da conta: ");

      jaTemNumero = contas.find((conta) => conta.numero == numero);
    }

    let saldo: number = parseFloat(input("Valor do depósito inicial: "));

    return new Conta(idConta, numero, cliente, saldo);
  }

  public static inicializarClientes(): Cliente[] {
    let clientes: Cliente[] = [];

    let cliente1: Cliente = new Cliente(
      1,
      "Vitória",
      "123",
      new Date(2006, 11, 2)
    );
    let conta1: Conta = new Conta(1, "111-1", cliente1, 10);
    cliente1.adicionarConta(conta1);
    clientes.push(cliente1);

    let cliente2: Cliente = new Cliente(
      2,
      "Júlia",
      "456",
      new Date(2006, 11, 2)
    );
    let conta2: Conta = new Conta(2, "222-2", cliente2, 10);
    cliente2.adicionarConta(conta2);
    clientes.push(cliente2);

    let cliente3: Cliente = new Cliente(
      3,
      "Joana",
      "789",
      new Date(2006, 11, 2)
    );
    let conta3: Conta = new Conta(3, "333-3", cliente3, 10);
    cliente3.adicionarConta(conta3);
    clientes.push(cliente3);

    let cliente4: Cliente = new Cliente(
      4,
      "Kamila",
      "654",
      new Date(2006, 11, 2)
    );
    let conta4: Conta = new Conta(4, "444-4", cliente4, 10);
    cliente4.adicionarConta(conta4);
    clientes.push(cliente4);

    return clientes;
  }

  public static inicializarContas(clientes: Cliente[]): Conta[] {
    let contas: Conta[] = [];

    for (let cliente of clientes) {
      let conta = cliente.contas.at(0);
      if (conta) {
        contas.push(conta);
      }
    }

    return contas;
  }
}
