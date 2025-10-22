/* 
    CRUD - Create (inserir), Read (consultar), 
           Update (atualizar) e Delete (excluir)
*/           
import java.util.List;

public class Banco {
    private List<Conta> contas = Utils.inicializarContas();
    private List<Cliente> clientes = Utils.inicializaClientes(contas);

    // Inserir
    public void adicionarConta(){
        Conta conta = Utils.criarConta();
        this.contas.add(conta);
        this.clientes.add(conta.getTitular());
    }

    // Consultar
    public void consultarPeloNumero(){
        String numero = Utils.receberString("Número da conta:");

        for(Conta conta : this.contas){
            if(numero.equals(conta.getNumero())){
                System.out.println("Conta encontrada!");
                conta.mostarInfo();
                return;
            }
        }
        System.out.println("Conta inexistente!");
    }

    public Conta procurarPeloNumero(String numero){
        Conta contaProcurada = null;

        for(Conta conta : this.contas){
            if(numero.equals(conta.getNumero())) contaProcurada = conta;
        }

        return contaProcurada;
    }

    // atualizar
    public void atualizarNomeTitular(){
        Conta contaProcurada = procurarPeloNumero(Utils.receberString("Número da conta que quer atualizar:"));

        if (contaProcurada != null) {
            System.out.println("Conta encontrada!\nDados do Titular:\n");
            Cliente clienteConta = contaProcurada.getTitular();
            System.out.println(clienteConta.dados());
            String nome = Utils.receberString("-> Novo nome do titular:");
            clienteConta.setNome(nome);
        }  
        else{
            System.out.println("Conta não encontrada.");
        }
    }
    
    // excluir
    public void excluirConta(){
        Conta contaProcurada = procurarPeloNumero( Utils.receberString("Número da conta que quer excluir:"));

        if(contaProcurada != null){
            this.contas.remove(contaProcurada);
            this.clientes.remove(contaProcurada.getTitular());
            System.out.println("Conta excluida com sucesso!");
        }
        else{
            System.out.println("Conta não encontrada.");
        }
    }

    public void fazerSaque(){
        Conta contaProcurada = procurarPeloNumero( Utils.receberString("Número da conta:"));

        if(contaProcurada != null){
            contaProcurada.sacar(Utils.receberDouble("Valor do saque:"));
        }
        else{
            System.out.println("Conta não encontrada.");
        }
    }

    public void fazerDeposito(){
        Conta contaProcurada = procurarPeloNumero( Utils.receberString("Número da conta:"));

        if(contaProcurada != null){
            contaProcurada.depositar( Utils.receberDouble("Valor do Depósito:"));
        }
        else{
            System.out.println("Conta não encontrada.");
        }

    }

    public void fazerTransferencia(){
        Conta contaProcurada = procurarPeloNumero( Utils.receberString("Número da conta:"));

        if(contaProcurada != null){
            Conta contaDestino = procurarPeloNumero( Utils.receberString("Número da conta que quer transferir:"));
            if(contaDestino != null){
                double valor = Utils.receberDouble("Valor da tranferência:");
                if(valor <= contaProcurada.getSaldo()){
                    contaProcurada.sacar(valor);
                    contaDestino.depositar(valor);
                    System.out.println("Transferência realizada com sucesso!");
                }
                else System.out.println("Saldo Insuficiente.");
            }
            else System.out.println("Conta de destino não encontrada.");
        }
        else System.out.println("Conta não encontrada.");
    }

    public void listarContas(){
        System.out.println("------- CONTAS DO BANCO -------");
        for(Conta conta : this.contas){
            Utils.esperar(2000);
            conta.mostarInfo();
        }
    }

    public void listarClientes(){
        System.out.println("------- CLIENTES DO BANCO -------");
        for(Cliente cliente : this.clientes){
            Utils.esperar(2000);
            System.out.println(cliente.dados());
            System.out.println();
        }
    }
}
