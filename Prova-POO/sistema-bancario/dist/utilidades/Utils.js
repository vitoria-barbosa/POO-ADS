"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgSucesso = msgSucesso;
exports.receberNumero = receberNumero;
exports.inicializarClientes = inicializarClientes;
exports.inicializarContas = inicializarContas;
const Cliente_1 = __importDefault(require("../classes/Cliente"));
const Conta_1 = __importDefault(require("../classes/Conta"));
// Dupla: Kamila Rocha e Vitória Barbosa
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
function msgSucesso() {
    console.log("Operação efetuada com sucesso!");
}
function receberNumero(texto) {
    let valor = parseFloat(input(texto));
    while (Number.isNaN(valor)) {
        console.log("Entrada inválida. Digite um valor.");
        valor = parseFloat(input(texto));
    }
    return valor;
}
function inicializarClientes() {
    let clientes = [];
    let cliente1 = new Cliente_1.default(1, "Vitória", "123", new Date(2006, 11, 2));
    cliente1.adicionarConta(new Conta_1.default(1, "111-1", cliente1, 10));
    let cliente2 = new Cliente_1.default(2, "Júlia", "456", new Date(2006, 11, 2));
    cliente2.adicionarConta(new Conta_1.default(2, "222-2", cliente2, 10));
    let cliente3 = new Cliente_1.default(3, "Joana", "789", new Date(2006, 11, 2));
    cliente3.adicionarConta(new Conta_1.default(3, "333-3", cliente3, 10));
    let cliente4 = new Cliente_1.default(4, "Kamila", "654", new Date(2006, 11, 2));
    cliente4.adicionarConta(new Conta_1.default(4, "444-4", cliente4, 10));
    clientes.push(cliente1, cliente2, cliente3, cliente4);
    return clientes;
}
function inicializarContas(clientes) {
    let contas = [];
    for (let cliente of clientes) {
        let conta = cliente.contas.at(0);
        if (conta) {
            contas.push(conta);
        }
    }
    return contas;
}
