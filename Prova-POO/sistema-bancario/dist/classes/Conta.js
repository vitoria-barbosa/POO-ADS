"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operacao_1 = __importDefault(require("./Operacao"));
const CREDITO = "CRÉDITO";
const DEBITO = "DÉBITO";
const FALHA = "FALHA";
// Dupla: Kamila Rocha e Vitória Barbosa
class Conta {
    _id;
    _numero;
    _saldo;
    _titular;
    _dataAbertura;
    _limiteNegativo;
    _operacoes = [];
    _idOperacaoAtual = 1;
    constructor(numero, saldo, limite) {
        this._numero = numero;
        this._saldo = saldo;
        this._dataAbertura = new Date();
        this._limiteNegativo = -limite;
    }
    sacar(valor) {
        this._idOperacaoAtual++;
        let operacao;
        let saldoApos = this._saldo - valor;
        if (saldoApos >= this._limiteNegativo) {
            this._saldo -= valor;
            console.log(`Saldo atualizado após o saque: R$ ${this._saldo.toFixed(2)}`);
            operacao = new Operacao_1.default(this._idOperacaoAtual, this, DEBITO, valor, `Saque na conta${this._numero}`);
        }
        else {
            console.log("Limite de saldo negativo: Não foi possível fazer o saque.");
            operacao = new Operacao_1.default(this._idOperacaoAtual, this, FALHA, valor, `Falha na transferência: saque não autorizado (limite excedido)`);
        }
        this.adicionarOperacao(operacao);
        return operacao;
    }
    depositar(valor) {
        this._idOperacaoAtual++;
        this._saldo += valor;
        console.log(`Saldo atualizado após o depósito: R$ ${this._saldo.toFixed(2)}`);
        let operacao = new Operacao_1.default(this._idOperacaoAtual, this, CREDITO, valor, `Depósito na conta ${this._numero}`);
        this.adicionarOperacao(operacao);
        return operacao;
    }
    consultarSaldo() {
        return this._saldo;
    }
    transferir(contaDestino, valor) {
        this._idOperacaoAtual++;
        let operacoesTranferencia = [];
        let operacaoSaque = this.sacar(valor);
        operacoesTranferencia.push(operacaoSaque);
        if (operacaoSaque.tipo != FALHA) {
            let operacaoDeposito = contaDestino.depositar(valor);
            operacoesTranferencia.push(operacaoDeposito);
        }
        return operacoesTranferencia;
    }
    adicionarOperacao(operacao) {
        this._operacoes.unshift(operacao);
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
    get operacoes() {
        return this._operacoes;
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
