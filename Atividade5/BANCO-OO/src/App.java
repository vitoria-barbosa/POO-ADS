import static utilitarios.Utils.*;
import static utilitarios.EntradaDeDados.*;

import classes.Banco;
public class App {
    public static void main(String[] args) throws Exception {
        String menu = 
        """
        \n\n
        ---------- BANCO DO BRASIL ----------
        01 - CRIAR CONTA
        02 - CONSULTAR CONTA
        03 - ATUALIZAR NOME TITULAR
        04 - FAZER DEPÓSITO
        05 - FAZER SAQUE
        06 - FAZER TRANFERÊNCIA
        07 - LISTAR CONTAS CLIENTE
        08 - EXCLUIR CONTA
        09 - LISTAR CONTAS DO BANCO
        10 - LISTAR CLIENTES DO BANCO
        11 - SOMAR SALDO CONTAS CLIENTE
        12 - QUANTIDADE DE CONTAS DO BANCO
        13 - SALDO TOTAL CONTAS BANCO
        14 - MÉDIA DO SALDO DAS CONTAS DO BANCO
        15 - MUDAR TITULARIDADE DE CONTA
        16 - EXCLUIR CLIENTE
        17 - TRANSFERIR PARA VÁRIAS CONTAS
        00 - SAIR

        SUA OPÇÃO >>""";
        int opcao;
        Banco banco = new Banco();

        do{
            esperar(1800);
            opcao = recebeInt(menu);
            limparBuffer();

            switch(opcao){
                case 1: banco.associarConta();
                break;
                case 2: banco.consultarPeloNumero();
                break;
                case 3: banco.atualizarNomeTitular();
                break;
                case 4: banco.fazerDeposito();
                break;
                case 5: banco.fazerSaque();
                break;
                case 6: banco.fazerTransferencia();
                break;
                case 7: banco.listarContasCliente();
                break;
                case 8: banco.excluirConta();
                break;
                case 9: banco.listarContas();
                break;
                case 10: banco.listarClientes();
                break;
                case 11: banco.somarSaldoContasCliente();
                break;
                case 12: banco.mostrarQtdContas();
                break;
                case 13: banco.mostrarSaldoTotalContasBanco();
                break;
                case 14: banco.mostrarMediaSaldoContasBanco();
                break;
                case 15: banco.mudarTitularidade();
                break;
                case 16: banco.excluirCliente();
                break;
                case 17: banco.TransferenciaVariasContas();
                break;
            }

        }while(opcao != 0);
    }
}