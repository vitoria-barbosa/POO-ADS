public class App {
    public static void main(String[] args) throws Exception {
        Banco banco = new Banco();

        banco.listarContas();
        banco.listarClientes();
        banco.adicionarConta();
        banco.listarContas();
        banco.consultarPelorNumero("111-1");
        banco.atualizarNomeTitular();
        banco.excluirConta();
    }
}