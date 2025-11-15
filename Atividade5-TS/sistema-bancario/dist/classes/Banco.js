"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cadastro_1 = __importDefault(require("../utilidades/Cadastro"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
class Banco {
    _clientes = (0, Utils_1.inicializarClientes)();
    _contas = (0, Utils_1.inicializarContas)(this._clientes);
    associarContaCliente() {
        let cliente;
        let conta;
        let opcao = (0, Utils_1.receberNumero)("Já é cliente do banco? (1-sim/2-não): ");
        if (opcao == 1) {
            // se é cliente, procura na lista de clientes.
            cliente = this.procurarClientePeloCPF();
        }
        else {
            // se não é cliente, faz o cadastro do cliente.
            cliente = this.cadastrarCliente();
        }
        conta = Cadastro_1.default.criarConta(this._contas, cliente);
        this._contas.push(conta);
        cliente.adicionarConta(conta);
        (0, Utils_1.msgSucesso)();
    }
    cadastrarCliente() {
        let cliente = Cadastro_1.default.cadastrarCliente(this._clientes);
        this._clientes.push(cliente);
        return cliente;
    }
    fazerDeposito() {
        let conta = this.procurarContaPeloNumero();
        let valor = (0, Utils_1.receberNumero)("Valor do depósito: ");
        conta.depositar(valor);
        (0, Utils_1.msgSucesso)();
    }
    fazerSaque() {
        let conta = this.procurarContaPeloNumero();
        let valor = (0, Utils_1.receberNumero)("Valor do saque: ");
        conta.sacar(valor);
        (0, Utils_1.msgSucesso)();
    }
    fazerTransferencia() {
        let contaOrigem = this.procurarContaPeloNumero();
        let contaDestino = this.procurarContaPeloNumero();
        let valor = (0, Utils_1.receberNumero)("Valor a tranferir: ");
        contaOrigem.transferir(contaDestino, valor);
        (0, Utils_1.msgSucesso)();
    }
    consultarConta() {
        let conta = this.procurarContaPeloNumero();
        conta.mostrarInfo();
    }
    consultarCliente() {
        this.procurarClientePeloCPF();
    }
    excluirConta() {
        let conta = this.procurarContaPeloNumero();
        let indice = this.indiceDaConta(conta.numero);
        this._contas.splice(indice, 1);
        let cliente = conta.titular;
        let indiceConta = cliente.contas.findIndex((contaCliente) => contaCliente.numero == conta.numero);
        cliente.contas.splice(indiceConta, 1);
        (0, Utils_1.msgSucesso)();
    }
    excluirCliente() {
        let cliente = this.procurarClientePeloCPF();
        let indice = this.indiceDoCliente(cliente.cpf);
        this._clientes.splice(indice, 1);
        for (let conta of cliente.contas) {
            let indiceConta = this.indiceDaConta(conta.numero);
            this._contas.splice(indiceConta, 1);
        }
        (0, Utils_1.msgSucesso)();
    }
    listarContasCliente() {
        let cliente = this.procurarClientePeloCPF();
        console.log(`\nContas do(a) cliente ${cliente.nome}`);
        cliente.contas.forEach((conta) => conta.mostrarInfo());
    }
    totalizarSaldoCliente() {
        let total = 0;
        let cliente = this.procurarClientePeloCPF();
        for (let conta of cliente.contas) {
            conta.mostrarInfo();
            total += conta.saldo;
        }
        console.log(`\nSaldo total de todas as contas: R$ ${total.toFixed(2)}`);
    }
    totalAplicadoCliente() {
        let totalAplicado = 0;
        let cliente = this.procurarClientePeloCPF();
        cliente.contas.forEach((conta) => (totalAplicado += conta.saldo));
        console.log(`\nTotal aplicado pelo(a) cliente ${cliente.nome}: R$ ${totalAplicado.toFixed(2)}`);
    }
    realizarOrdemBancaria() {
        let contaOrigem = this.procurarContaPeloNumero();
        let contasDestino = this.receberContasDestino();
        for (let conta of contasDestino) {
            let valor = (0, Utils_1.receberNumero)(`Valor a ser transferido a conta ${conta.numero}: `);
            contaOrigem.transferir(conta, valor);
        }
        (0, Utils_1.msgSucesso)();
    }
    receberContasDestino() {
        let qtdContas = (0, Utils_1.receberNumero)("Quantidade de contas que quer transferir: ");
        let contasDestino = [];
        for (let i = 0; i < qtdContas; i++) {
            let conta = this.procurarContaPeloNumero();
            contasDestino.push(conta);
        }
        return contasDestino;
    }
    transferirTitularidade() {
        let conta = this.procurarContaPeloNumero();
        let opcao = (0, Utils_1.receberNumero)("\nO novo titular é cliente do banco? (1-sim/2-não): ");
        let novoTitular;
        if (opcao == 2) {
            // novo titular não é cliente do banco, cadastra primeiro
            novoTitular = Cadastro_1.default.cadastrarCliente(this._clientes);
            this._clientes.push(novoTitular);
        }
        else {
            novoTitular = this.procurarClientePeloCPF();
        }
        // remove a conta da lista de contas do cliente antigo:
        let clienteAntigo = conta.titular;
        let indiceConta = clienteAntigo.contas.findIndex((contaCliente) => contaCliente.numero == conta.numero);
        clienteAntigo.contas.splice(indiceConta, 1);
        conta.titular = novoTitular;
        novoTitular.adicionarConta(conta);
        (0, Utils_1.msgSucesso)();
    }
    obterTotalDinheiroDepositadoBanco() {
        let dinheiroTotal = 0;
        for (let conta of this._contas) {
            dinheiroTotal += conta.saldo;
        }
        return dinheiroTotal;
    }
    mediaSaldoContasBanco() {
        let mediaSaldo = this.obterTotalDinheiroDepositadoBanco() / this._contas.length;
        console.log(`\nMédia do saldo de todas as contas do banco: R$ ${mediaSaldo.toFixed(2)}`);
    }
    listarContasBanco() {
        console.log("\nContas do banco:");
        this._contas.forEach((conta) => conta.mostrarInfo());
    }
    listarClientesBanco() {
        console.log("\nClientes do banco:");
        this._clientes.forEach((cliente) => console.log(cliente.mostrarDados()));
    }
    procurarContaPeloNumero() {
        let numero = input("\nNúmero da conta: ");
        let conta = this._contas.find((conta) => conta.numero === numero);
        if (!conta) {
            console.log("Conta não encontrada. Tente novamente:");
            return this.procurarContaPeloNumero();
        }
        console.log("\nConta encontrada!");
        conta.mostrarInfo();
        return conta;
    }
    procurarClientePeloCPF() {
        let CPF = input("\nCPF do cliente: ");
        let cliente = this._clientes.find((cliente) => cliente.cpf == CPF);
        if (!cliente) {
            console.log("Cliente não encontrado. Tente novamente: ");
            return this.procurarClientePeloCPF();
        }
        console.log(`\nCliente encontrado(a)!\n${cliente.mostrarDados()}`);
        return cliente;
    }
    indiceDaConta(numero) {
        return this._contas.findIndex((conta) => conta.numero == numero);
    }
    indiceDoCliente(CPF) {
        return this._clientes.findIndex((cliente) => cliente.cpf == CPF);
    }
    get clientes() {
        return this._clientes;
    }
    set clientes(clientes) {
        this._clientes = clientes;
    }
    get contas() {
        return this._contas;
    }
    set contas(contas) {
        this._contas = contas;
    }
}
exports.default = Banco;
const Utils_1 = require("../utilidades/Utils");
