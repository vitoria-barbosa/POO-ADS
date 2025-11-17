"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conta_1 = __importDefault(require("./classes/Conta"));
const Cliente_1 = __importDefault(require("./classes/Cliente"));
const Banco_1 = __importDefault(require("./classes/Banco"));
// Dupla: Kamila Rocha e Vitória Barbosa
class TestesBancoLimite {
    _banco;
    _pontosObtidos = 0;
    _pontosTotais = 0;
    // ---------------- Utilitários internos ----------------
    assert(condicao, mensagem) {
        if (!condicao) {
            throw new Error(mensagem);
        }
    }
    rodarTeste(nome, pontos, fn) {
        this._pontosTotais = this._pontosTotais + pontos;
        try {
            fn();
            this._pontosObtidos = this._pontosObtidos + pontos;
            console.log("✅ [OK] " + nome + " (+" + pontos + " pts)");
        }
        catch (e) {
            console.log("❌ [FALHOU] " + nome + " (0/" + pontos + " pts)");
            console.log("   Motivo: " + (e && e.message ? e.message : e));
        }
    }
    iniciarBanco() {
        this._banco = new Banco_1.default();
    }
    criarClienteNoBanco(nome, cpf) {
        const cliente = new Cliente_1.default(nome, cpf, new Date(1990, 0, 1));
        this._banco.inserirCliente(cliente);
        return cliente;
    }
    criarContaNoBanco(numero, saldo, limite) {
        const conta = new Conta_1.default(numero, saldo, limite);
        this._banco.inserirConta(conta);
        return conta;
    }
    // ---------------- Teste 1 (1,0 ponto): Depósito ----------------
    teste1Deposito() {
        this.rodarTeste("Teste 1: Depósito registra saldo e operação corretamente", 1.0, () => {
            const conta = new Conta_1.default("001", 0, 0);
            const op = conta.depositar(200);
            this.assert(conta.saldo == 200, "Saldo após depósito deveria ser 200.");
            const ops = conta.operacoes;
            this.assert(ops.length == 1, "Deveria existir 1 operação registrada.");
            const opRegistro = ops[0];
            this.assert(opRegistro.tipo == "CRÉDITO", "Operação deveria ser do tipo CRÉDITO.");
            this.assert(opRegistro.valor == 200, "Valor da operação deveria ser 200.");
            this.assert(opRegistro.conta == conta, "Operação deve estar ligada à conta correta.");
            this.assert(opRegistro == op, "Operação retornada pelo método deve ser a mesma registrada.");
        });
    }
    // -------- Teste 2 (1,5 ponto): Saques, limite e falha --------
    teste2SaqueComLimite() {
        this.rodarTeste("Teste 2: Saques respeitam limite e registram falha", 1.5, () => {
            const conta = new Conta_1.default("002", 100, 100); // saldo 100, limite 100
            const op1 = conta.sacar(50); // saldo 50
            const op2 = conta.sacar(100); // saldo -50
            const op3 = conta.sacar(100); // tentativa inválida → falha
            this.assert(conta.saldo == -50, "Saldo final deveria ser -50.");
            const ops = conta.operacoes;
            this.assert(ops.length == 3, "Devem existir 3 operações registradas (incluindo falha).");
            const maisRecente = ops[0];
            const segunda = ops[1];
            const terceira = ops[2];
            this.assert(maisRecente.tipo == "FALHA", "A operação mais recente deveria ser uma FALHA.");
            this.assert(segunda.tipo == "DÉBITO", "A segunda operação deveria ser DÉBITO.");
            this.assert(terceira.tipo == "DÉBITO", "A terceira operação deveria ser DÉBITO.");
            const valores = ops.map((o) => o.valor).sort((a, b) => a - b);
            this.assert(valores[0] == 50 && valores[1] == 100 && valores[2] == 100, "Os valores das operações deveriam ser 50, 100, 100.");
        });
    }
    // ---- Teste 3 (2,0 pontos): Transferência com sucesso e falha ----
    teste3TransferenciaComLimite() {
        this.rodarTeste("Teste 3: Transferências respeitam limite e retornam operações corretas", 2.0, () => {
            const origem = new Conta_1.default("100", 100, 200);
            const destino = new Conta_1.default("200", 50, 0);
            const ops1 = origem.transferir(destino, 250);
            this.assert(ops1.length == 2, "Transferência válida deve gerar 2 operações.");
            this.assert(origem.saldo == -150, "Saldo da conta origem deveria ser -150.");
            this.assert(destino.saldo == 300, "Saldo da conta destino deveria ser 300.");
            const ops2 = origem.transferir(destino, 100);
            this.assert(ops2.length == 1, "Transferência recusada deve gerar apenas 1 operação.");
            const opFalha = ops2[0];
            this.assert(opFalha.tipo == "FALHA", "Tipo da operação deve ser FALHA.");
            this.assert(origem.saldo == -150, "Saldo da origem não deve mudar após falha.");
            this.assert(destino.saldo == 300, "Saldo do destino não deve mudar após falha.");
            const opsOrigem = origem.operacoes;
            const qtdFalhas = opsOrigem.filter((o) => o.tipo == "FALHA").length;
            this.assert(qtdFalhas == 1, "Deveria haver exatamente 1 operação de falha na origem.");
            const opsDestino = destino.operacoes;
            const qtdCreditosDestino = opsDestino.filter((o) => o.tipo == "CRÉDITO").length;
            this.assert(qtdCreditosDestino == 1, "Destino deveria ter exatamente 1 crédito válido.");
        });
    }
    // -- Teste 4 (2,5 pontos): Operações via Banco x registro geral --
    teste4BancoRegistroGeral() {
        this.rodarTeste("Teste 4: Banco registra corretamente operações no extrato geral", 2.5, () => {
            this.iniciarBanco();
            const banco = this._banco;
            const cliente = this.criarClienteNoBanco("Ana", "11111111111");
            const conta1 = this.criarContaNoBanco("301", 100, 100);
            const conta2 = this.criarContaNoBanco("302", 0, 0);
            banco.associarContaCliente("301", cliente.cpf);
            banco.associarContaCliente("302", cliente.cpf);
            banco.depositar("301", 50); // saldo 150
            banco.sacar("301", 100); // saldo 50
            banco.transferir("301", "302", 200); // deve falhar (limite estourado)
            const extratoConta1 = banco.consultarExtratoConta("301");
            const extratoGeral = banco.consultarExtratoGeral();
            this.assert(extratoConta1.length == 3, "Conta 301 deveria ter 3 operações (depósito, saque e falha de transferência).");
            const qtdFalhasConta1 = extratoConta1.filter((o) => o.tipo == "FALHA").length;
            this.assert(qtdFalhasConta1 == 1, "Conta 301 deveria ter 1 operação de falha.");
            this.assert(conta1.saldo == 50, "Saldo final da conta 301 deveria ser 50.");
            this.assert(extratoGeral.length >= extratoConta1.length, "Extrato geral deve ter pelo menos as operações da conta 301.");
            const idsConta1 = extratoConta1.map((o) => o.id).sort((a, b) => a - b);
            const idsGeral = extratoGeral.map((o) => o.id).sort((a, b) => a - b);
            for (let i = 0; i < idsConta1.length; i++) {
                this.assert(idsGeral.indexOf(idsConta1[i]) != -1, "Operação da conta 301 não encontrada no extrato geral do banco.");
            }
        });
    }
    // ---- Teste 5 (3,0 pontos): Cliente com 3 contas, tudo via Banco ----
    teste5ClienteTresContas() {
        this.rodarTeste("Teste 5: Operações via Banco para cliente com 3 contas e consistência de extratos", 3.0, () => {
            this.iniciarBanco();
            const banco = this._banco;
            const cliente = this.criarClienteNoBanco("Bruno", "22222222222");
            const c1 = this.criarContaNoBanco("401", 200, 100);
            const c2 = this.criarContaNoBanco("402", 0, 50);
            const c3 = this.criarContaNoBanco("403", 50, 0);
            banco.associarContaCliente("401", cliente.cpf);
            banco.associarContaCliente("402", cliente.cpf);
            banco.associarContaCliente("403", cliente.cpf);
            banco.depositar("401", 100); // 200 + 100 = 300
            banco.sacar("401", 150); // 300 - 150 = 150
            banco.sacar("402", 30); // 0 - 30 = -30 (ok, limite 50)
            banco.sacar("402", 50); // -30 - 50 = -80 (passa limite) → falha
            banco.transferir("403", "401", 50); // 403: 50 - 50 = 0; 401: 150 + 50 = 200
            this.assert(c1.saldo == 200, "Saldo final da conta 401 deveria ser 200.");
            this.assert(c2.saldo == -30, "Saldo final da conta 402 deveria ser -30.");
            this.assert(c3.saldo == 0, "Saldo final da conta 403 deveria ser 0.");
            const extratoCliente = banco.consultarExtratoCliente(cliente.cpf);
            const extratoGeral = banco.consultarExtratoGeral();
            const extrato401 = banco.consultarExtratoConta("401");
            const extrato402 = banco.consultarExtratoConta("402");
            const extrato403 = banco.consultarExtratoConta("403");
            const uniaoContas = []
                .concat(extrato401)
                .concat(extrato402)
                .concat(extrato403);
            const idsCliente = extratoCliente
                .map((o) => o.id)
                .sort((a, b) => a - b);
            const idsUniao = uniaoContas.map((o) => o.id).sort((a, b) => a - b);
            this.assert(idsCliente.length == idsUniao.length, "Quantidade de operações no extrato do cliente difere da soma das 3 contas.");
            for (let i = 0; i < idsCliente.length; i++) {
                this.assert(idsCliente[i] == idsUniao[i], "Conjunto de operações do extrato do cliente não corresponde às operações das 3 contas.");
            }
            const idsGeral = extratoGeral.map((o) => o.id);
            for (let i = 0; i < idsCliente.length; i++) {
                this.assert(idsGeral.indexOf(idsCliente[i]) != -1, "Operação do extrato do cliente não encontrada no extrato geral do banco.");
            }
        });
    }
    // ---------------- Método público principal ----------------
    executar() {
        console.log("=======================================");
        console.log("   TESTES BANCO COM LIMITE E EXTRATOS  ");
        console.log("=======================================");
        // Deixe todos descomentados na final versão da prova:
        this.teste1Deposito();
        this.teste2SaqueComLimite();
        this.teste3TransferenciaComLimite();
        this.teste4BancoRegistroGeral();
        this.teste5ClienteTresContas();
        console.log("=======================================");
        console.log("Pontos obtidos: " + this._pontosObtidos + " / " + this._pontosTotais);
        const nota = (this._pontosObtidos / this._pontosTotais) * 10;
        console.log("Nota final (0 a 10): " + nota.toFixed(1));
        console.log("=======================================");
    }
}
// Execução direta do teste
const suite = new TestesBancoLimite();
suite.executar();
