"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conta {
    _id;
    _numero;
    _saldo;
    _titular;
    _dataAbertura;
    constructor(id, numero, cliente, saldo) {
        this._id = id;
        this._numero = numero;
        this._titular = cliente;
        this._saldo = saldo;
        this._dataAbertura = new Date().toLocaleDateString("pt-BR");
    }
    sacar(valor) {
        if (valor > 0) {
            this._saldo -= valor;
            console.log(`Saldo atualizado após o saque: R$ ${this._saldo.toFixed(2)}`);
        }
    }
    depositar(valor) {
        if (valor > 0) {
            this._saldo += valor;
            console.log(`Saldo atualizado após o depósito: R$ ${this._saldo.toFixed(2)}`);
        }
    }
    consultarSaldo() {
        return this._saldo;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    mostrarInfo() {
        console.log(`
  | ID CONTA: ${this._id}
  | NÚMERO: ${this._numero}
  | DATA ABERTURA: ${this._dataAbertura}
  | TITULAR: ${this._titular.mostrarDados()}
  | SALDO: ${this._saldo.toFixed(2)}
  ---------------------------------------`);
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get numero() {
        return this._numero;
    }
    set numero(numero) {
        this._numero = numero;
    }
    get saldo() {
        return this._saldo;
    }
    set saldo(saldo) {
        this._saldo = saldo;
    }
    get titular() {
        return this._titular;
    }
    set titular(cliente) {
        this._titular = cliente;
    }
    get dataAbertura() {
        return this._dataAbertura;
    }
    set dataAbertura(dataAbertura) {
        this._dataAbertura = dataAbertura;
    }
}
exports.default = Conta;
