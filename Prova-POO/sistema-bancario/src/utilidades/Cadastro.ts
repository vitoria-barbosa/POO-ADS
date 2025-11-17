import Cliente from "../classes/Cliente";
import Conta from "../classes/Conta";
import { receberNumero } from "./Utils";

import prompt from "prompt-sync";
let input = prompt();

// Dupla: Kamila Rocha e Vitória Barbosa

export default class Cadastro {
  public static cadastrarCliente(clientes: Cliente[]): Cliente {
    console.log("\n>>> CADASTRAR CLIENTE: \n");

    let idCliente: number = this.definirID(clientes);
    let nome: string = input("Digite o nome do cliente: ");
    let dataNascimento: Date = new Date(
      input("Digite a data de nascimento (AAAA-MM-DD): ")
    );
    let cpf: string = this.receberCPFValido(clientes);

    console.log("\nCadastro realizado com sucesso!");
    return new Cliente(idCliente, nome, cpf, dataNascimento);
  }

  public static criarConta(contas: Conta[], cliente: Cliente): Conta {
    console.log("\n>>> CRIAR CONTA: \n");

    let idConta: number = this.definirID(contas);
    let numero: string = this.receberNumeroValido(contas);

    let saldo: number = receberNumero("Valor do depósito inicial: ");

    return new Conta(idConta, numero, cliente, saldo);
  }

  private static receberCPFValido(clientes: Cliente[]): string {
    let cpf: string = input("Digite o CPF do cliente: ");
    let jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);

    if (jaTemCPF) {
      console.log("Já existe um cliente com esse CPF. Tente novamente:");
      return this.receberCPFValido(clientes);
    }

    return cpf;
  }

  private static receberNumeroValido(contas: Conta[]): string {
    let numeroConta: string = input("Digite o número da conta: ");
    let jaTemNumero = contas.find((conta) => conta.numero == numeroConta);

    if (jaTemNumero) {
      console.log("Já existe uma conta com esse número. Tente novamente:");
      return this.receberNumeroValido(contas);
    }

    return numeroConta;
  }

  private static definirID(lista: Conta[] | Cliente[]): number {
    let ultimoId: number = lista.at(lista.length - 1)?.id ?? 1; // se for undefined atribui 1.
    let idConta: number = ultimoId + 1;

    return idConta;
  }
}
