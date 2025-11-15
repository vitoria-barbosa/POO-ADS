import Cliente from "./Cliente";
import Conta from "./Conta";
import Cadastro from "../utilidades/Cadastro";

import prompt from "prompt-sync";
let input = prompt();

export default class Banco {
  private _clientes: Cliente[] = inicializarClientes();
  private _contas: Conta[] = inicializarContas(this._clientes);

  public associarContaCliente(): void {
    let cliente: Cliente;
    let conta: Conta;
    let opcao: number = receberNumero("Já é cliente do banco? (1-sim/2-não): ");

    if (opcao == 1) {
      // se é cliente, procura na lista de clientes.
      cliente = this.procurarClientePeloCPF();
    } else {
      // se não é cliente, faz o cadastro do cliente.
      cliente = this.cadastrarCliente();
    }

    conta = Cadastro.criarConta(this._contas, cliente);
    this._contas.push(conta);
    cliente.adicionarConta(conta);
    msgSucesso();
  }

  public cadastrarCliente(): Cliente {
    let cliente: Cliente = Cadastro.cadastrarCliente(this._clientes);
    this._clientes.push(cliente);

    return cliente;
  }

  public fazerDeposito(): void {
    let conta: Conta = this.procurarContaPeloNumero();

    let valor: number = receberNumero("Valor do depósito: ");
    conta.depositar(valor);
    msgSucesso();
  }

  public fazerSaque(): void {
    let conta: Conta = this.procurarContaPeloNumero();

    let valor: number = receberNumero("Valor do saque: ");
    conta.sacar(valor);
    msgSucesso();
  }

  public fazerTransferencia(): void {
    let contaOrigem: Conta = this.procurarContaPeloNumero();
    let contaDestino: Conta = this.procurarContaPeloNumero();

    let valor: number = receberNumero("Valor a tranferir: ");
    contaOrigem.transferir(contaDestino, valor);
    msgSucesso();
  }

  public consultarConta(): void {
    let conta: Conta = this.procurarContaPeloNumero();
    conta.mostrarInfo();
  }

  public consultarCliente(): void {
    this.procurarClientePeloCPF();
  }

  public excluirConta(): void {
    let conta: Conta = this.procurarContaPeloNumero();

    let indice: number = this.indiceDaConta(conta.numero);
    this._contas.splice(indice, 1);

    let cliente: Cliente = conta.titular;
    let indiceConta: number = cliente.contas.findIndex(
      (contaCliente: Conta) => contaCliente.numero == conta.numero
    );
    cliente.contas.splice(indiceConta, 1);

    msgSucesso();
  }

  public excluirCliente(): void {
    let cliente: Cliente = this.procurarClientePeloCPF();

    let indice: number = this.indiceDoCliente(cliente.cpf);
    this._clientes.splice(indice, 1);

    for (let conta of cliente.contas) {
      let indiceConta: number = this.indiceDaConta(conta.numero);
      this._contas.splice(indiceConta, 1);
    }

    msgSucesso();
  }

  public listarContasCliente(): void {
    let cliente: Cliente = this.procurarClientePeloCPF();

    console.log(`\nContas do(a) cliente ${cliente.nome}`);
    cliente.contas.forEach((conta) => conta.mostrarInfo());
  }

  public totalizarSaldoCliente(): void {
    let total: number = 0;
    let cliente: Cliente = this.procurarClientePeloCPF();

    for (let conta of cliente.contas) {
      conta.mostrarInfo();
      total += conta.saldo;
    }

    console.log(`\nSaldo total de todas as contas: R$ ${total.toFixed(2)}`);
  }

  public totalAplicadoCliente() {
    let totalAplicado: number = 0;
    let cliente: Cliente = this.procurarClientePeloCPF();

    cliente.contas.forEach((conta) => (totalAplicado += conta.saldo));

    console.log(
      `\nTotal aplicado pelo(a) cliente ${
        cliente.nome
      }: R$ ${totalAplicado.toFixed(2)}`
    );
  }

  public realizarOrdemBancaria(): void {
    let contaOrigem: Conta = this.procurarContaPeloNumero();
    let contasDestino: Conta[] = this.receberContasDestino();

    for (let conta of contasDestino) {
      let valor: number = receberNumero(
        `Valor a ser transferido a conta ${conta.numero}: `
      );
      contaOrigem.transferir(conta, valor);
    }
    msgSucesso();
  }

  public receberContasDestino(): Conta[] {
    let qtdContas: number = receberNumero(
      "Quantidade de contas que quer transferir: "
    );
    let contasDestino: Conta[] = [];

    for (let i: number = 0; i < qtdContas; i++) {
      let conta: Conta = this.procurarContaPeloNumero();

      contasDestino.push(conta);
    }

    return contasDestino;
  }

  public transferirTitularidade(): void {
    let conta: Conta = this.procurarContaPeloNumero();
    let opcao = receberNumero(
      "\nO novo titular é cliente do banco? (1-sim/2-não): "
    );
    let novoTitular: Cliente;

    if (opcao == 2) {
      // novo titular não é cliente do banco, cadastra primeiro
      novoTitular = Cadastro.cadastrarCliente(this._clientes);
      this._clientes.push(novoTitular);
    } else {
      novoTitular = this.procurarClientePeloCPF();
    }

    // remove a conta da lista de contas do cliente antigo:
    let clienteAntigo: Cliente = conta.titular;
    let indiceConta: number = clienteAntigo.contas.findIndex(
      (contaCliente) => contaCliente.numero == conta.numero
    );
    clienteAntigo.contas.splice(indiceConta, 1);

    conta.titular = novoTitular;
    novoTitular.adicionarConta(conta);

    msgSucesso();
  }

  public obterTotalDinheiroDepositadoBanco(): number {
    let dinheiroTotal: number = 0;

    for (let conta of this._contas) {
      dinheiroTotal += conta.saldo;
    }

    return dinheiroTotal;
  }

  public mediaSaldoContasBanco(): void {
    let mediaSaldo: number =
      this.obterTotalDinheiroDepositadoBanco() / this._contas.length;

    console.log(
      `\nMédia do saldo de todas as contas do banco: R$ ${mediaSaldo.toFixed(
        2
      )}`
    );
  }

  public listarContasBanco(): void {
    console.log("\nContas do banco:");
    this._contas.forEach((conta) => conta.mostrarInfo());
  }

  public listarClientesBanco(): void {
    console.log("\nClientes do banco:");
    this._clientes.forEach((cliente) => console.log(cliente.mostrarDados()));
  }

  private procurarContaPeloNumero(): Conta {
    let numero: string = input("\nNúmero da conta: ");
    let conta: Conta | undefined = this._contas.find(
      (conta) => conta.numero === numero
    );

    if (!conta) {
      console.log("Conta não encontrada. Tente novamente:");
      return this.procurarContaPeloNumero();
    }

    console.log("\nConta encontrada!");
    conta.mostrarInfo();

    return conta;
  }

  private procurarClientePeloCPF(): Cliente {
    let CPF = input("\nCPF do cliente: ");
    let cliente: Cliente | undefined = this._clientes.find(
      (cliente) => cliente.cpf == CPF
    );

    if (!cliente) {
      console.log("Cliente não encontrado. Tente novamente: ");
      return this.procurarClientePeloCPF();
    }

    console.log(`\nCliente encontrado(a)!\n${cliente.mostrarDados()}`);

    return cliente;
  }

  private indiceDaConta(numero: string): number {
    return this._contas.findIndex((conta) => conta.numero == numero);
  }

  private indiceDoCliente(CPF: string): number {
    return this._clientes.findIndex((cliente) => cliente.cpf == CPF);
  }

  public get clientes(): Cliente[] {
    return this._clientes;
  }

  public set clientes(clientes: Cliente[]) {
    this._clientes = clientes;
  }

  public get contas(): Conta[] {
    return this._contas;
  }

  public set contas(contas: Conta[]) {
    this._contas = contas;
  }
}

import {
  inicializarClientes,
  inicializarContas,
  msgSucesso,
  receberNumero,
} from "../utilidades/Utils";
