import Cliente from "./Cliente";
import Operacao from "./Operacao";

const CREDITO: string = "CRÉDITO";
const DEBITO: string = "DÉBITO";
const FALHA: string = "FALHA";

// Dupla: Kamila Rocha e Vitória Barbosa

export default class Conta {
  private _id: number;
  private _numero: string;
  private _saldo: number;
  private _titular?: Cliente;
  private _dataAbertura: Date;
  private _limiteNegativo: number;
  private _operacoes: Operacao[] = [];
  private _idOperacaoAtual: number = 1;

  constructor(numero: string, saldo: number, limite: number) {
    this._numero = numero;
    this._saldo = saldo;
    this._dataAbertura = new Date();
    this._limiteNegativo = -limite;
  }

  public sacar(valor: number): Operacao {
    this._idOperacaoAtual++;
    let operacao: Operacao;
    let saldoApos: number = this._saldo - valor;
    if (saldoApos >= this._limiteNegativo) {
      this._saldo -= valor;
      console.log(
        `Saldo atualizado após o saque: R$ ${this._saldo.toFixed(2)}`
      );
      operacao = new Operacao(
        this._idOperacaoAtual,
        this,
        DEBITO,
        valor,
        `Saque na conta${this._numero}`
      );
    } else {
      console.log("Limite de saldo negativo: Não foi possível fazer o saque.");
      operacao = new Operacao(
        this._idOperacaoAtual,
        this,
        FALHA,
        valor,
        `Falha na transferência: saque não autorizado (limite excedido)`
      );
    }

    this.adicionarOperacao(operacao);
    return operacao;
  }

  public depositar(valor: number): Operacao {
    this._idOperacaoAtual++;
    this._saldo += valor;
    console.log(
      `Saldo atualizado após o depósito: R$ ${this._saldo.toFixed(2)}`
    );
    let operacao = new Operacao(
      this._idOperacaoAtual,
      this,
      CREDITO,
      valor,
      `Depósito na conta ${this._numero}`
    );

    this.adicionarOperacao(operacao);
    return operacao;
  }

  public consultarSaldo(): number {
    return this._saldo;
  }

  public transferir(contaDestino: Conta, valor: number): Operacao[] {
    this._idOperacaoAtual++;
    let operacoesTranferencia: Operacao[] = [];
    let operacaoSaque: Operacao = this.sacar(valor);
    operacoesTranferencia.push(operacaoSaque);
    if (operacaoSaque.tipo != FALHA) {
      let operacaoDeposito = contaDestino.depositar(valor);
      operacoesTranferencia.push(operacaoDeposito);
    }

    return operacoesTranferencia;
  }

  public adicionarOperacao(operacao: Operacao): void {
    this._operacoes.unshift(operacao);
  }

  public mostrarInfo(): void {
    console.log(`
  | ID CONTA: ${this._id}
  | NÚMERO: ${this._numero}
  | DATA ABERTURA: ${this._dataAbertura}
  | TITULAR: ${this._titular.mostrarDados()}
  | SALDO: ${this._saldo.toFixed(2)}
  ---------------------------------------`);
  }

  public get operacoes() {
    return this._operacoes;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get numero(): string {
    return this._numero;
  }

  public set numero(numero: string) {
    this._numero = numero;
  }

  public get saldo(): number {
    return this._saldo;
  }

  public set saldo(saldo: number) {
    this._saldo = saldo;
  }

  public get titular(): Cliente {
    return this._titular;
  }

  public set titular(cliente: Cliente) {
    this._titular = cliente;
  }

  public get dataAbertura(): string {
    return this._dataAbertura;
  }

  public set dataAbertura(dataAbertura: string) {
    this._dataAbertura = dataAbertura;
  }
}
