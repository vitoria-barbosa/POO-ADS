import Cliente from "./Cliente";

export default class Conta {
  private _id: number;
  private _numero: string;
  private _saldo: number;
  private _titular: Cliente;
  private _dataAbertura: string;

  constructor(id: number, numero: string, cliente: Cliente, saldo: number) {
    this._id = id;
    this._numero = numero;
    this._titular = cliente;
    this._saldo = saldo;
    this._dataAbertura = new Date().toLocaleDateString("pt-BR");
  }

  public sacar(valor: number): void {
    if (valor > 0) {
      this._saldo -= valor;
      console.log(`Saldo atualizado: R$ ${this._saldo.toFixed()}`);
    }
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this._saldo += valor;
      console.log(`Saldo atualizado: R$ ${this._saldo.toFixed()}`);
    }
  }

  public consultarSaldo(): number {
    return this._saldo;
  }

  public transferir(contaDestino: Conta, valor: number): void {
    this.sacar(valor);
    contaDestino.depositar(valor);
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
