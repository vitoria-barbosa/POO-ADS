"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cadastro_1 = __importDefault(require("../utilidades/Cadastro"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
class Banco {
    _clientes = Cadastro_1.default.inicializarClientes();
    _contas = Cadastro_1.default.inicializarContas(this._clientes);
    associarContaCliente() {
        let cliente;
        let conta;
        let opcao = (0, Utils_1.receberNumero)("Já é cliente do banco? (1-sim/2-não): ");
        if (opcao == 1) {
            // se é cliente, procura na lista de clientes e adiciona a conta na lista de contas do cliente e do banco.
            let cpf = input("Digite seu CPF: ");
            cliente = this.procurarClientePeloCPF(cpf);
            if (cliente) {
                console.log(`\nCliente encontrado(a)!\n${cliente.mostrarDados()}`);
                conta = Cadastro_1.default.criarConta(this._contas, cliente);
            }
            else {
                (0, Utils_1.msgErro)();
                return;
            }
        }
        else {
            // se não é cliente, faz o cadastro do cliente e cria a conta para ele.
            cliente = Cadastro_1.default.cadastrarCliente(this._clientes);
            conta = Cadastro_1.default.criarConta(this._contas, cliente);
            this._clientes.push(cliente);
        }
        this._contas.push(conta);
        cliente.adicionarConta(conta);
        (0, Utils_1.msgSucesso)();
    }
    cadastrarCliente() {
        let cliente = Cadastro_1.default.cadastrarCliente(this._clientes);
        this._clientes.push(cliente);
    }
    fazerDeposito() {
        let numero = input("Número da conta:");
        let conta = this.procurarContaPeloNumero(numero);
        if (conta) {
            let valor = (0, Utils_1.receberNumero)("Valor do depósito: ");
            conta.depositar(valor);
            (0, Utils_1.msgSucesso)();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    fazerSaque() {
        let numero = input("Número da conta: ");
        let conta = this.procurarContaPeloNumero(numero);
        if (conta) {
            let valor = (0, Utils_1.receberNumero)("Valor do saque: ");
            conta.sacar(valor);
            (0, Utils_1.msgSucesso)();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    fazerTransferencia() {
        let numeroContaOrigem = input("Número da conta de origem: ");
        let contaOrigem = this.procurarContaPeloNumero(numeroContaOrigem);
        if (contaOrigem) {
            let numeroContaDestino = input("Número da conta de destino: ");
            let contaDestino = this.procurarContaPeloNumero(numeroContaDestino);
            if (contaDestino) {
                let valor = (0, Utils_1.receberNumero)("Valor a tranferir: ");
                contaOrigem.transferir(contaDestino, valor);
                (0, Utils_1.msgSucesso)();
            }
            else {
                (0, Utils_1.msgErro)();
            }
        }
        else {
            (0, Utils_1.msgErro)();
        }
    }
    consultarConta() {
        let numero = input("Número da conta: ");
        let conta = this.procurarContaPeloNumero(numero);
        if (conta) {
            conta.mostrarInfo();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    consultarCliente() {
        let cpf = input("CPF do cliente: ");
        let cliente = this.procurarClientePeloCPF(cpf);
        if (cliente) {
            console.log("Dados do cliente: ");
            console.log(cliente.mostrarDados());
        }
        else {
            (0, Utils_1.msgErro)();
        }
    }
    excluirConta() {
        let numero = input("Número da conta que quer excluir: ");
        let conta = this.procurarContaPeloNumero(numero);
        if (conta) {
            let indice = this.indiceDaConta(numero);
            let cliente = conta.titular;
            let indiceConta = cliente.contas.findIndex((conta) => conta.numero == numero);
            cliente.contas.splice(indiceConta, 1);
            this._contas.splice(indice, 1);
            (0, Utils_1.msgSucesso)();
        }
        else {
            (0, Utils_1.msgErro)();
        }
    }
    excluirCliente() {
        let cpf = input("CPF do cliente: ");
        let cliente = this.procurarClientePeloCPF(cpf);
        if (cliente) {
            let indice = this.indiceDoCliente(cpf);
            this._clientes.splice(indice, 1);
            for (let conta of cliente.contas) {
                let indiceConta = this.indiceDaConta(conta.numero);
                this._contas.splice(indiceConta, 1);
            }
            (0, Utils_1.msgSucesso)();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    listarContasBanco() {
        console.log("\nContas do banco:");
        this._contas.forEach((conta) => conta.mostrarInfo());
    }
    listarClientesBanco() {
        console.log("\nClientes do banco:");
        this._clientes.forEach((cliente) => console.log(cliente.mostrarDados()));
    }
    listarContasCliente() {
        let cpf = input("CPF do cliente: ");
        let cliente = this.procurarClientePeloCPF(cpf);
        if (cliente) {
            console.log(`\nContas do(a) cliente ${cliente.nome}`);
            cliente.contas.forEach((conta) => conta.mostrarInfo());
            return;
        }
        (0, Utils_1.msgErro)();
    }
    totalizarSaldoCliente() {
        let total = 0;
        let cpf = input("CPF do cliente:");
        let cliente = this.procurarClientePeloCPF(cpf);
        if (cliente) {
            for (let conta of cliente.contas) {
                conta.mostrarInfo();
                total += conta.saldo;
            }
            console.log(`Saldo total de todas as contas: R$ ${total.toFixed(2)}`);
            return;
        }
        (0, Utils_1.msgErro)();
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
        console.log(`Média do saldo de todas as contas do banco: R$ ${mediaSaldo.toFixed(2)}`);
    }
    totalAplicadoCliente() {
        let totalAplicado = 0;
        let cpf = input("CPF do cliente: ");
        let cliente = this.procurarClientePeloCPF(cpf);
        if (cliente) {
            cliente.contas.forEach((conta) => (totalAplicado += conta.saldo));
            console.log(`Total aplicado pelo(a) cliente ${cliente.nome}: R$ ${totalAplicado.toFixed(2)}`);
            return;
        }
        (0, Utils_1.msgErro)();
    }
    realizarOrdemBancaria() {
        let numeroContaOrigem = input("Número da conta de origem: ");
        let contaOrigem = this.procurarContaPeloNumero(numeroContaOrigem);
        if (contaOrigem) {
            let qtdContas = (0, Utils_1.receberNumero)("Quantidade de contas que quer transferir: ");
            let contasDestino = this.receberContasDestino(qtdContas);
            for (let conta of contasDestino) {
                let valor = (0, Utils_1.receberNumero)(`Valor a ser transferido a conta ${conta.numero}: `);
                contaOrigem.transferir(conta, valor);
            }
            (0, Utils_1.msgSucesso)();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    receberContasDestino(qtdContas) {
        let contasDestino = [];
        for (let i = 0; i < qtdContas; i++) {
            let numeroConta = input("Número da conta:");
            let conta = this.procurarContaPeloNumero(numeroConta);
            while (!conta) {
                console.log("\nConta não encontrada. Tente novamente:");
                numeroConta = input("Número da conta:");
                conta = this.procurarContaPeloNumero(numeroConta);
            }
            contasDestino.push(conta);
        }
        return contasDestino;
    }
    transferirTitularidade() {
        let numero = input("Número da conta: ");
        let conta = this.procurarContaPeloNumero(numero);
        if (conta) {
            let cpf = input("Digite o CPF do novo titular:");
            let novoTitular = this.procurarClientePeloCPF(cpf);
            if (!novoTitular) {
                // novo titular não é cliente do banco
                console.log("Cliente não cadastrado. Fazer cadastro: ");
                novoTitular = Cadastro_1.default.cadastrarCliente(this._clientes);
                this._clientes.push(novoTitular);
            }
            let clienteAntigo = conta.titular;
            let indiceConta = this.indiceDaConta(conta.numero);
            clienteAntigo.contas.splice(indiceConta, 1);
            conta.titular = novoTitular;
            novoTitular.adicionarConta(conta);
            (0, Utils_1.msgSucesso)();
            return;
        }
        (0, Utils_1.msgErro)();
    }
    procurarContaPeloNumero(numero) {
        return this._contas.find((conta) => conta.numero === numero);
    }
    procurarClientePeloCPF(CPF) {
        return this._clientes.find((cliente) => cliente.cpf == CPF);
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
