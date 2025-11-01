package classes;

import static utilitarios.Cadastro.*;
import static utilitarios.Utils.*;
import static utilitarios.EntradaDeDados.*;

import java.util.ArrayList;
import java.util.List;           

public class Banco {
    private List<Cliente> clientes = inicializarClientes();
    private List<Conta> contas = inicializarContas(clientes);

    // Inserir
    public void associarConta(){
        Cliente cliente = null;
        Conta conta = null;
        int opcao = recebeInt("Já é cliente do banco? (1-sim/2-não): ");
        limparBuffer();

        if(opcao == 1){
            String cpf = recebeStr("Digite seu CPF:");
            cliente = procurarPeloCPF(cpf);
            if(cliente != null){
                System.out.println("\nCliente encontrado(a)!\n" + cliente.dados());
                conta = criarConta(cliente, this.contas);
                
            }else{
                System.out.println("Cliente não encontrado.");
                return;
            }
        }
        else{
            cliente = cadastrarCliente(this.clientes);
            conta = criarConta(cliente, this.contas);
            this.clientes.add(cliente);
        }
        msgSucesso();
        this.contas.add(conta);
        cliente.adicionarConta(conta);
    }

    // Consultar
    public void consultarPeloNumero(){
        String numero = recebeStr("Número da conta:");

        for(Conta conta : this.contas){
            if(numero.equals(conta.getNumero())){
                System.out.println("Conta encontrada!");
                conta.mostrarInfo();
                return;
            }
        }
        msgContaInexistente();
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
        String numeroConta = recebeStr("Número da conta que quer atualizar:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if (contaProcurada != null) {
            System.out.println("Conta encontrada!\nDados do Titular:\n");
            Cliente clienteConta = contaProcurada.getTitular();
            System.out.println(clienteConta.dados());
            String nome = recebeStr("-> Novo nome do titular:");
            clienteConta.setNome(nome);
            msgSucesso();
            return;
        }  
        msgContaInexistente();
    }
    
    // excluir
    public void excluirConta(){
        String numeroConta = recebeStr("Número da conta que quer excluir:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            this.contas.remove(contaProcurada);
            Cliente cliente = contaProcurada.getTitular();
            cliente.getContas().remove(contaProcurada);
            msgSucesso();
            return;
        }
        msgContaInexistente();
    }

    public void excluirCliente(){
        String cpf = recebeStr("Digite seu CPF:");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
           
            for(Conta conta : cliente.getContas()){
                this.contas.remove(conta);
            }

            this.clientes.remove(cliente);
            msgSucesso();
            return;
        }
        System.out.println("Cliente não encontrado.");
    }

    public void fazerSaque(){
        String numeroConta = recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            double valor = recebeValor("Valor do saque:");
            contaProcurada.sacar(valor);
            return;
        }
        msgContaInexistente();
    }

    public void fazerDeposito(){
        String numeroConta = recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            contaProcurada.depositar( recebeValor("Valor do Depósito:"));
            return;
        }
        msgContaInexistente();
    }

    public void fazerTransferencia(){
        String numeroConta = recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            Conta contaDestino = procurarPeloNumero(recebeStr("Número da conta que quer transferir:"));
            if(contaDestino != null){
                double valor = recebeValor("Valor da tranferência:");
                contaProcurada.transferir(contaDestino, valor);
                msgSucesso();
            }
            else msgContaInexistente();
        }
        else msgContaInexistente();
    }

    public List<Conta> receberContasDestinoTranferencia(int qtdContas){
        List<Conta> contasDestino = new ArrayList<>();

        for(int i = 0; i < qtdContas; i++){
            String numeroConta = recebeStr("Número da conta:");
            Conta contaProcurada = procurarPeloNumero(numeroConta);

            while(contaProcurada == null){
                System.out.println("\nConta não encontrada. Tente novamente:");
                numeroConta = recebeStr("Número da conta:");
                contaProcurada = procurarPeloNumero(numeroConta);
            }

            contasDestino.add(contaProcurada);
        }

        return contasDestino;
    }

    public void TransferenciaVariasContas(){
        String numeroConta = recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            int qtdContas = recebeInt("Quantidade de contas que quer tranferir:");
            limparBuffer();
            List<Conta> contasDestino = receberContasDestinoTranferencia(qtdContas);

            for(Conta conta : contasDestino){
                if(contaProcurada.getSaldo() == 0){
                    System.out.println("\nSaldo insuficiente para continuar as tranferências.");
                    return;
                }

                double valor = recebeValor("Valor da transferência para conta " + conta.getNumero() + ":");

                while(valor > contaProcurada.getSaldo()){
                    System.out.println("Valor acima do saldo. Tente novamente:");
                    valor = recebeValor("Valor da transferência para conta " + conta.getNumero() + ":");

                }
                contaProcurada.transferir(conta, valor);
            }
            msgSucesso();
            return;
        }
        msgContaInexistente();
    }

    public void mudarTitularidade(){
        String numeroConta = recebeStr("Número da conta:");
        Conta contaProcurada = procurarPeloNumero(numeroConta);

        if(contaProcurada != null){
            String cpf = recebeStr("Digite o CPF do novo titular:");
            Cliente clienteNovo = procurarPeloCPF(cpf);

            if(clienteNovo == null){       // novo titular não é cliente do banco
                System.out.println("Cliente não cadastrado. Fazer cadastro: ");
                clienteNovo = cadastrarCliente(this.clientes);
                this.clientes.add(clienteNovo);
            }
            
            Cliente clienteAntigo = contaProcurada.getTitular();
            clienteAntigo.getContas().remove(contaProcurada);

            contaProcurada.setTitular(clienteNovo);
            clienteNovo.adicionarConta(contaProcurada);
            msgSucesso();
        }
        else{
            msgContaInexistente();
        }

    }

    public void somarSaldoContasCliente(){
        double somaSaldo = 0;
        String cpf = recebeStr("CPF: ");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
            for(Conta conta : cliente.getContas()){
                somaSaldo += conta.getSaldo();
                conta.mostrarInfo();
            }

            System.out.printf("\nSaldo total de todas as contas do cliente %s: R$ %.2f", cliente.getNome(), somaSaldo);
            return;
        }

        msgContaInexistente();
    }

    public void mostrarQtdContas(){
        System.out.printf("\n> QUANTIDADE DE CONTAS DO BANCO: %d", this.contas.size());
    }

    public double somarSaldoContasBanco(){
        double saldoTotal = 0;

        for (Conta conta : this.contas){
            saldoTotal += conta.getSaldo();
        }

        return saldoTotal;
    }

    public void mostrarSaldoTotalContasBanco(){
        System.out.printf("\n> SALDO TOTAL DE TODAS AS CONTAS DO BANCO: %.2f", somarSaldoContasBanco());

    }

    public void mostrarMediaSaldoContasBanco(){
        double saldoTotal = somarSaldoContasBanco();
        double mediaSaldo = saldoTotal / this.contas.size();

        System.out.printf("> MÉDIA DO SALDO DAS CONTAS DO BANCO: %.2f", mediaSaldo);
    }

    public void listarContasCliente(){
        String cpf = recebeStr("CPF: ");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
            System.out.printf("---- CONTAS DO(A) CLIENTE %s ----\n", cliente.getNome().toUpperCase());
            for(Conta conta : cliente.getContas()){
                conta.mostrarInfo();
            }
            return;
        }
        msgContaInexistente();
    }

    public void listarContas(){
        System.out.println("------- CONTAS DO BANCO -------");
        for(Conta conta : this.contas){
            esperar(1800);
            conta.mostrarInfo();
        }
    }

    public void listarClientes(){
        System.out.println("------- CLIENTES DO BANCO -------");
        for(Cliente cliente : this.clientes){
            esperar(1800);
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
