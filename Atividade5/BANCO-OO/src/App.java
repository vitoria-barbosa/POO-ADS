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
        00 - SAIR

        SUA OPÇÃO >>""";
        int opcao;
        Banco banco = new Banco();

        do{
            Utils.esperar(1000);
            opcao = Utils.receberInt(menu);
            Utils.limparBuffer();

            switch(opcao){
                case 1: banco.adicionarConta();
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
                case 8: banco.excluirConta();
                break;
                case 9: banco.listarContas();
                break;
                case 10: banco.listarClientes();
            }

        }while(opcao != 0);
    }
}