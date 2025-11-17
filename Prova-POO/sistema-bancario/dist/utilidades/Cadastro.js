"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../classes/Cliente"));
const Conta_1 = __importDefault(require("../classes/Conta"));
const Utils_1 = require("./Utils");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
// Dupla: Kamila Rocha e Vitória Barbosa
class Cadastro {
    static cadastrarCliente(clientes) {
        console.log("\n>>> CADASTRAR CLIENTE: \n");
        let idCliente = this.definirID(clientes);
        let nome = input("Digite o nome do cliente: ");
        let dataNascimento = new Date(input("Digite a data de nascimento (AAAA-MM-DD): "));
        let cpf = this.receberCPFValido(clientes);
        console.log("\nCadastro realizado com sucesso!");
        return new Cliente_1.default(idCliente, nome, cpf, dataNascimento);
    }
    static criarConta(contas, cliente) {
        console.log("\n>>> CRIAR CONTA: \n");
        let idConta = this.definirID(contas);
        let numero = this.receberNumeroValido(contas);
        let saldo = (0, Utils_1.receberNumero)("Valor do depósito inicial: ");
        return new Conta_1.default(idConta, numero, cliente, saldo);
    }
    static receberCPFValido(clientes) {
        let cpf = input("Digite o CPF do cliente: ");
        let jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);
        if (jaTemCPF) {
            console.log("Já existe um cliente com esse CPF. Tente novamente:");
            return this.receberCPFValido(clientes);
        }
        return cpf;
    }
    static receberNumeroValido(contas) {
        let numeroConta = input("Digite o número da conta: ");
        let jaTemNumero = contas.find((conta) => conta.numero == numeroConta);
        if (jaTemNumero) {
            console.log("Já existe uma conta com esse número. Tente novamente:");
            return this.receberNumeroValido(contas);
        }
        return numeroConta;
    }
    static definirID(lista) {
        let ultimoId = lista.at(lista.length - 1)?.id ?? 1; // se for undefined atribui 1.
        let idConta = ultimoId + 1;
        return idConta;
    }
}
exports.default = Cadastro;
