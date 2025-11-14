"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgSucesso = msgSucesso;
exports.msgErro = msgErro;
exports.receberNumero = receberNumero;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
function msgSucesso() {
    console.log("Operação efetuada com sucesso!");
}
function msgErro() {
    console.log("Algo deu errado. Tente novamente:");
}
function receberNumero(texto) {
    let valor = parseFloat(input(texto));
    while (Number.isNaN(valor)) {
        console.log("Entrada inválida. Digite um valor.");
        valor = parseFloat(input(texto));
    }
    return valor;
}
