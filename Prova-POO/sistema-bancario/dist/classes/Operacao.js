"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dupla: Kamila Rocha e Vitória Barbosa
class Operacao {
    _id;
    _conta;
    _tipo;
    _valor;
    _descricao;
    _dataHora;
    constructor(id, conta, tipo, valor, descricao) {
        this._id = id;
        this._conta = conta;
        this._tipo = tipo;
        this._descricao = descricao;
        this._valor = valor;
        this._dataHora = new Date();
    }
    get id() {
        return this._id;
    }
    get conta() {
        return this._conta;
    }
    get valor() {
        return this._valor;
    }
    get tipo() {
        return this._tipo;
    }
    get descricao() {
        return this._descricao;
    }
    get dataHora() {
        return this._dataHora;
    }
    set descricao(texto) {
        this._descricao = texto;
    }
}
exports.default = Operacao;
