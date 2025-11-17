"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Banco_1 = __importDefault(require("./classes/Banco"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Utils_1 = require("./utilidades/Utils");
// Dupla: Kamila Rocha e Vitória Barbosa
class App {
    menu() {
        let input = (0, prompt_sync_1.default)();
        let opcao;
        const banco = new Banco_1.default();
        const menu = `\n\n\n
  =========== BANCO ===========
  CONTAS:
  01 - CRIAR CONTA
  02 - CONSULTAR 
  03 - DEPOSITAR
  04 - SACAR
  05 - FAZER TRANSFERÊNCIA
  06 - REALIZAR ORDEM BANCÁRIA
  07 - TRANSFERIR TITULARIDADE
  08 - EXCLUIR

  CLIENTES:
  20 - CADASTRAR CLIENTE
  21 - CONSULTAR
  22 - TOTAL APLICADO POR CLIENTE
  23 - LISTAR CONTAS
  24 - EXCLUIR CLIENTE

  BANCO:
  30 - LISTAR CONTAS
  31 - LISTAR CLIENTES
  32 - MÉDIA SALDO DEPOSITADO

  00 - SAIR

  OPÇÃO >> `;
        do {
            opcao = (0, Utils_1.receberNumero)(menu);
            switch (opcao) {
                case 1:
                    banco.associarContaCliente();
                    break;
                case 2:
                    banco.consultarConta();
                    break;
                case 3:
                    banco.fazerDeposito();
                    break;
                case 4:
                    banco.fazerSaque();
                    break;
                case 5:
                    banco.fazerTransferencia();
                    break;
                case 6:
                    banco.realizarOrdemBancaria();
                    break;
                case 7:
                    banco.transferirTitularidade();
                    break;
                case 8:
                    banco.excluirConta();
                    break;
                case 20:
                    banco.cadastrarCliente();
                    break;
                case 21:
                    banco.consultarCliente();
                    break;
                case 22:
                    banco.totalAplicadoCliente();
                    break;
                case 23:
                    banco.listarContasCliente();
                    break;
                case 24:
                    banco.excluirCliente();
                    break;
                case 30:
                    banco.listarContasBanco();
                    break;
                case 31:
                    banco.listarClientesBanco();
                    break;
                case 32:
                    banco.mediaSaldoContasBanco();
                    break;
                case 0:
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida!");
            }
        } while (opcao != 0);
    }
}
const app = new App();
app.menu();
