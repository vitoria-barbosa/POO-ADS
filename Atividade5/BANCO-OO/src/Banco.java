/* 
    CRUD - Create (inserir), Read (consultar), 
           Update (atualizar) e Delete (excluir)
*/           
import java.util.List;

public class Banco {
    private List<Cliente> clientes = Utils.inicializarClientes();
    private List<Conta> contas = Utils.inicializarContas(clientes);

    // Inserir
    public void associarConta(){
        Cliente cliente;
        Conta conta;
        int opcao = Utils.recebeInt("Já é cliente do banco? (1-sim/2-não): ");
        Utils.limparBuffer();

        if(opcao == 1){
            String cpf = Utils.recebeStr("Digite seu CPF:");
            cliente = procurarPeloCPF(cpf);
            System.out.println("\nCliente encontrado(a)!\n" + cliente.dados());
            conta = Utils.criarConta(cliente);
        }
        else{
            cliente = Utils.cadastrarCliente();
            conta = Utils.criarConta(cliente);
            this.clientes.add(conta.getTitular());
        }
        System.out.println("\nConta criada com sucesso!\n");
        this.contas.add(conta);
        cliente.getContas().add(conta);
    }

    // Consultar
    public void consultarPeloNumero(){
        String numero = Utils.recebeStr("Número da conta:");

        for(Conta conta : this.contas){
            if(numero.equals(conta.getNumero())){
                System.out.println("Conta encontrada!");
                conta.mostarInfo();
                return;
            }
        }
        System.out.println("Conta inexistente!");
    }

    public Cliente procurarPeloCPF(String cpf){
    
        for(Cliente cliente : this.clientes){
            if(cpf.equals(cliente.getCPF())) {
                return cliente;
            }
        }
       
        return null;
    }

    public Conta procurarPeloNumero(String numero){

        for(Conta conta : this.contas){
            if(numero.equals(conta.getNumero())){
                return conta;
            }
        }

        return null;
    }

    // atualizar
    public void atualizarNomeTitular(){
        String numeroConta = Utils.recebeStr("Número da conta que quer atualizar:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if (contaProcurada != null) {
            System.out.println("Conta encontrada!\nDados do Titular:\n");
            Cliente clienteConta = contaProcurada.getTitular();
            System.out.println(clienteConta.dados());
            String nome = Utils.recebeStr("-> Novo nome do titular:");
            clienteConta.setNome(nome);
            System.out.println("\nNome atualizado com sucesso!");
            return;
        }  
        System.out.println("Conta não encontrada.");
    }
    
    // excluir
    public void excluirConta(){
        String numeroConta = Utils.recebeStr("Número da conta que quer excluir:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            this.contas.remove(contaProcurada);
            this.clientes.remove(contaProcurada.getTitular());
            System.out.println("Conta excluida com sucesso!");
            return;
        }
        System.out.println("Conta não encontrada.");
    }

    public void fazerSaque(){
        String numeroConta = Utils.recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            double valor = Utils.recebeValor("Valor do saque:");
            contaProcurada.sacar(valor);
            return;
        }
        System.out.println("Conta não encontrada.");
    }

    public void fazerDeposito(){
        String numeroConta = Utils.recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            contaProcurada.depositar( Utils.recebeValor("Valor do Depósito:"));
            return;
        }
        System.out.println("Conta não encontrada.");
    }

    public void fazerTransferencia(){
        String numeroConta = Utils.recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            Conta contaDestino = procurarPeloNumero( Utils.recebeStr("Número da conta que quer transferir:"));
            if(contaDestino != null){
                double valor = Utils.recebeValor("Valor da tranferência:");
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

    public void listarContasCliente(){
        String cpf = Utils.recebeStr("CPF: ");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
            for(Conta conta : cliente.getContas()){
                conta.mostarInfo();
            }
        }
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

    public List<Conta> getContas() {
        return this.contas;
    }

    public void setContas(List<Conta> contas) {
        this.contas = contas;
    }

    public List<Cliente> getClientes() {
        return this.clientes;
    }

    public void setClientes(List<Cliente> clientes) {
        this.clientes = clientes;
    }
    
}
