import Cliente from "./Cliente";
import Conta from "./Conta";
import Cadastro from "../utilidades/Cadastro";

import prompt from "prompt-sync";
let input = prompt();

export default class Banco {
  private _clientes: Cliente[] = Cadastro.inicializarClientes();
  private _contas: Conta[] = Cadastro.inicializarContas(this._clientes);

  public associarContaCliente(): void {
    let cliente: Cliente | undefined;
    let conta: Conta;
    let opcao: number = receberNumero("Já é cliente do banco? (1-sim/2-não): ");

    if (opcao == 1) {
      // se é cliente, procura na lista de clientes e adiciona a conta na lista de contas do cliente e do banco.
      let cpf: string = input("Digite seu CPF: ");
      cliente = this.procurarClientePeloCPF(cpf);

      if (cliente) {
        console.log(`\nCliente encontrado(a)!\n${cliente.mostrarDados()}`);
        conta = Cadastro.criarConta(this._contas, cliente);
      } else {
        msgErro();
        return;
      }
    } else {
      // se não é cliente, faz o cadastro do cliente e cria a conta para ele.
      cliente = Cadastro.cadastrarCliente(this._clientes);
      conta = Cadastro.criarConta(this._contas, cliente);
      this._clientes.push(cliente);
    }

    this._contas.push(conta);
    cliente.adicionarConta(conta);
    msgSucesso();
  }

  public cadastrarCliente(): void {
    let cliente: Cliente = Cadastro.cadastrarCliente(this._clientes);
    this._clientes.push(cliente);
  }

  public fazerDeposito(): void {
    let numero: string = input("Número da conta:");
    let conta: Conta | undefined = this.procurarContaPeloNumero(numero);

    if (conta) {
      let valor: number = receberNumero("Valor do depósito: ");
      conta.depositar(valor);
      msgSucesso();
      return;
    }
    msgErro();
  }

  public fazerSaque(): void {
    let numero: string = input("Número da conta: ");
    let conta: Conta | undefined = this.procurarContaPeloNumero(numero);

    if (conta) {
      let valor: number = receberNumero("Valor do saque: ");
      conta.sacar(valor);
      msgSucesso();
      return;
    }
    msgErro();
  }

  public fazerTransferencia(): void {
    let numeroContaOrigem: string = input("Número da conta de origem: ");
    let contaOrigem: Conta | undefined =
      this.procurarContaPeloNumero(numeroContaOrigem);

    if (contaOrigem) {
      let numeroContaDestino: string = input("Número da conta de destino: ");
      let contaDestino: Conta | undefined =
        this.procurarContaPeloNumero(numeroContaDestino);

      if (contaDestino) {
        let valor: number = receberNumero("Valor a tranferir: ");
        contaOrigem.transferir(contaDestino, valor);
        msgSucesso();
      } else {
        msgErro();
      }
    } else {
      msgErro();
    }
  }

  public consultarConta(): void {
    let numero: string = input("Número da conta: ");
    let conta: Conta | undefined = this.procurarContaPeloNumero(numero);

    if (conta) {
      conta.mostrarInfo();
      return;
    }
    msgErro();
  }

  public consultarCliente(): void {
    let cpf: string = input("CPF do cliente: ");
    let cliente: Cliente | undefined = this.procurarClientePeloCPF(cpf);

    if (cliente) {
      console.log("Dados do cliente: ");
      console.log(cliente.mostrarDados());
    } else {
      msgErro();
    }
  }

  public excluirConta(): void {
    let numero: string = input("Número da conta que quer excluir: ");
    let conta: Conta | undefined = this.procurarContaPeloNumero(numero);

    if (conta) {
      let indice: number = this.indiceDaConta(numero);
      let cliente: Cliente = conta.titular;
      let indiceConta: number = cliente.contas.findIndex(
        (conta: Conta) => conta.numero == numero
      );

      cliente.contas.splice(indiceConta, 1);
      this._contas.splice(indice, 1);
      msgSucesso();
    } else {
      msgErro();
    }
  }

  public excluirCliente(): void {
    let cpf: string = input("CPF do cliente: ");
    let cliente: Cliente | undefined = this.procurarClientePeloCPF(cpf);

    if (cliente) {
      let indice: number = this.indiceDoCliente(cpf);
      this._clientes.splice(indice, 1);

      for (let conta of cliente.contas) {
        let indiceConta: number = this.indiceDaConta(conta.numero);
        this._contas.splice(indiceConta, 1);
      }
      msgSucesso();
      return;
    }
    msgErro();
  }

  public listarContasBanco(): void {
    console.log("\nContas do banco:");
    this._contas.forEach((conta) => conta.mostrarInfo());
  }

  public listarClientesBanco(): void {
    console.log("\nClientes do banco:");
    this._clientes.forEach((cliente) => console.log(cliente.mostrarDados()));
  }

  public listarContasCliente(): void {
    let cpf: string = input("CPF do cliente: ");
    let cliente: Cliente | undefined = this.procurarClientePeloCPF(cpf);

    if (cliente) {
      console.log(`\nContas do(a) cliente ${cliente.nome}`);
      cliente.contas.forEach((conta) => conta.mostrarInfo());
      return;
    }

    msgErro();
  }

  public totalizarSaldoCliente(): void {
    let total: number = 0;
    let cpf: string = input("CPF do cliente:");
    let cliente: Cliente | undefined = this.procurarClientePeloCPF(cpf);

    if (cliente) {
      for (let conta of cliente.contas) {
        conta.mostrarInfo();
        total += conta.saldo;
      }

      console.log(`Saldo total de todas as contas: R$ ${total.toFixed(2)}`);
      return;
    }

    msgErro();
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
      `Média do saldo de todas as contas do banco: R$ ${mediaSaldo.toFixed(2)}`
    );
  }

  public totalAplicadoCliente() {
    let totalAplicado: number = 0;
    let cpf: string = input("CPF do cliente: ");
    let cliente: Cliente | undefined = this.procurarClientePeloCPF(cpf);

    if (cliente) {
      cliente.contas.forEach((conta) => (totalAplicado += conta.saldo));

      console.log(
        `Total aplicado pelo(a) cliente ${
          cliente.nome
        }: R$ ${totalAplicado.toFixed(2)}`
      );
      return;
    }

    msgErro();
  }

  public realizarOrdemBancaria(): void {
    let numeroContaOrigem: string = input("Número da conta de origem: ");
    let contaOrigem: Conta | undefined =
      this.procurarContaPeloNumero(numeroContaOrigem);

    if (contaOrigem) {
      let qtdContas: number = receberNumero(
        "Quantidade de contas que quer transferir: "
      );
      let contasDestino: Conta[] = this.receberContasDestino(qtdContas);

      for (let conta of contasDestino) {
        let valor: number = receberNumero(
          `Valor a ser transferido a conta ${conta.numero}: `
        );
        contaOrigem.transferir(conta, valor);
      }
      msgSucesso();
      return;
    }

    msgErro();
  }

  public receberContasDestino(qtdContas: number): Conta[] {
    let contasDestino: Conta[] = [];

    for (let i: number = 0; i < qtdContas; i++) {
      let numeroConta: string = input("Número da conta:");
      let conta: Conta | undefined = this.procurarContaPeloNumero(numeroConta);

      while (!conta) {
        console.log("\nConta não encontrada. Tente novamente:");
        numeroConta = input("Número da conta:");
        conta = this.procurarContaPeloNumero(numeroConta);
      }

      contasDestino.push(conta);
    }

    return contasDestino;
  }

  public transferirTitularidade(): void {
    let numero: string = input("Número da conta: ");
    let conta: Conta | undefined = this.procurarContaPeloNumero(numero);

    if (conta) {
      let cpf: string = input("Digite o CPF do novo titular:");
      let novoTitular: Cliente | undefined = this.procurarClientePeloCPF(cpf);

      if (!novoTitular) {
        // novo titular não é cliente do banco
        console.log("Cliente não cadastrado. Fazer cadastro: ");
        novoTitular = Cadastro.cadastrarCliente(this._clientes);
        this._clientes.push(novoTitular);
      }

      let clienteAntigo: Cliente = conta.titular;
      let indiceConta: number = this.indiceDaConta(conta.numero);
      clienteAntigo.contas.splice(indiceConta, 1);

      conta.titular = novoTitular;
      novoTitular.adicionarConta(conta);
      msgSucesso();
      return;
    }

    msgErro();
  }

  private procurarContaPeloNumero(numero: string): Conta | undefined {
    return this._contas.find((conta) => conta.numero === numero);
  }

  private procurarClientePeloCPF(CPF: string): Cliente | undefined {
    return this._clientes.find((cliente) => cliente.cpf == CPF);
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

import { msgSucesso, msgErro, receberNumero } from "../utilidades/Utils";
