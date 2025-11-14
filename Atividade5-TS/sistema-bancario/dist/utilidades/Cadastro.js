"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../classes/Cliente"));
const Conta_1 = __importDefault(require("../classes/Conta"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
class Cadastro {
    static cadastrarCliente(clientes) {
        console.log("\n>>> CADASTRAR CLIENTE: \n");
        let ultimoId = clientes.at(clientes.length - 1)?.id ?? 1; // se for undefined atribui 1.
        let idCliente = ultimoId + 1;
        let nome = input("Digite o nome do cliente: ");
        let dataNascimento = new Date(input("Digite a data de nascimento (AAAA-MM-DD): "));
        let cpf = input("Digite o CPF do cliente: ");
        let jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);
        while (jaTemCPF) {
            console.log("Já existe um cliente com esse CPF. Tente novamente:");
            cpf = input("Digite o CPF do cliente: ");
            jaTemCPF = clientes.find((cliente) => cliente.cpf == cpf);
        }
        console.log("\nCadastro realizado com sucesso!");
        return new Cliente_1.default(idCliente, nome, cpf, dataNascimento);
    }
    static criarConta(contas, cliente) {
        console.log("\n>>> CRIAR CONTA: \n");
        let ultimoId = contas.at(contas.length - 1)?.id ?? 1; // se for undefined atribui 1.
        let idConta = ultimoId + 1;
        let numero = input("Digite o número da conta: ");
        let jaTemNumero = contas.find((conta) => conta.numero == numero);
        while (jaTemNumero) {
            console.log("Já existe uma conta com esse número. Tente novamente:");
            numero = input("Digite o número da conta: ");
            jaTemNumero = contas.find((conta) => conta.numero == numero);
        }
        let saldo = parseFloat(input("Valor do depósito inicial: "));
        return new Conta_1.default(idConta, numero, cliente, saldo);
    }
    static inicializarClientes() {
        let clientes = [];
        let cliente1 = new Cliente_1.default(1, "Vitória", "123", new Date(2006, 11, 2));
        let conta1 = new Conta_1.default(1, "111-1", cliente1, 10);
        cliente1.adicionarConta(conta1);
        clientes.push(cliente1);
        let cliente2 = new Cliente_1.default(2, "Júlia", "456", new Date(2006, 11, 2));
        let conta2 = new Conta_1.default(2, "222-2", cliente2, 10);
        cliente2.adicionarConta(conta2);
        clientes.push(cliente2);
        let cliente3 = new Cliente_1.default(3, "Joana", "789", new Date(2006, 11, 2));
        let conta3 = new Conta_1.default(3, "333-3", cliente3, 10);
        cliente3.adicionarConta(conta3);
        clientes.push(cliente3);
        let cliente4 = new Cliente_1.default(4, "Kamila", "654", new Date(2006, 11, 2));
        let conta4 = new Conta_1.default(4, "444-4", cliente4, 10);
        cliente4.adicionarConta(conta4);
        clientes.push(cliente4);
        return clientes;
    }
    static inicializarContas(clientes) {
        let contas = [];
        for (let cliente of clientes) {
            let conta = cliente.contas.at(0);
            if (conta) {
                contas.push(conta);
            }
        }
        return contas;
    }
}
exports.default = Cadastro;
