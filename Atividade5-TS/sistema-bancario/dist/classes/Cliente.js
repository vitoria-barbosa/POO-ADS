"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    _id;
    _nome;
    _cpf;
    _dataNascimento;
    _contas = [];
    constructor(id, nome, cpf, dataNascimento) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento.toLocaleDateString("pt-BR");
    }
    adicionarConta(conta) {
        this._contas.push(conta);
    }
    mostrarDados() {
        return `
  | NOME: ${this._nome}
  | ID: ${this._id}
  | CPF: ${this._cpf}
  | DATA NASC: ${this._dataNascimento}
   `;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        this._nome = nome;
    }
    get cpf() {
        return this._cpf;
    }
    set cpf(cpf) {
        this._cpf = cpf;
    }
    get dataNascimento() {
        return this._dataNascimento;
    }
    set dataNascimento(data) {
        this._dataNascimento = data;
    }
    get contas() {
        return this._contas;
    }
    set contas(contas) {
        this._contas = contas;
    }
}
exports.default = Cliente;
