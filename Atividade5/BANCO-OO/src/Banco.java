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
    public void consultarPelorNumero(String numero){
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
            Cliente clienteConta = contaProcurada.getTitular();
            String nome = Utils.receberString("-> Nome do titular:");
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
            System.out.println("Conta excluida com sucesso!");
        }
        else{
            System.out.println("Conta não encontrada.");
        }
    }

    public void listarContas(){
        for(Conta conta : this.contas){
            conta.mostarInfo();
        }
    }

    public void listarClientes(){
        for(Cliente cliente : this.clientes){
            System.out.println(cliente.dados());
            System.out.println();
        }
    }
}
