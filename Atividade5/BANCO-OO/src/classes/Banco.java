package classes;

import static utilitarios.Cadastro.*;
import static utilitarios.Utils.*;
import static utilitarios.EntradaDeDados.*;

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
                conta.mostarInfo();
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
            this.clientes.remove(contaProcurada.getTitular());
            msgSucesso();
            return;
        }
        msgContaInexistente();
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
                if(valor <= contaProcurada.getSaldo()){
                    contaProcurada.sacar(valor);
                    contaDestino.depositar(valor);
                    msgSucesso();
                }
                else System.out.println("Saldo Insuficiente.");
            }
            else System.out.println("Conta de destino não encontrada.");
        }
        else msgContaInexistente();
    }

    public void somarSaldoContasCliente(){
        double somaSaldo = 0;
        String cpf = recebeStr("CPF: ");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
            for(Conta conta : cliente.getContas()){
                somaSaldo += conta.getSaldo();
                conta.mostarInfo();
            }

            System.out.printf("\nSaldo total de todas as contas do cliente %s: R$ %.2f", cliente.getNome(), somaSaldo);
            return;
        }

        msgContaInexistente();
    }

    public void listarContasCliente(){
        String cpf = recebeStr("CPF: ");
        Cliente cliente = procurarPeloCPF(cpf);

        if(cliente != null){
            for(Conta conta : cliente.getContas()){
                conta.mostarInfo();
            }
            return;
        }
        msgContaInexistente();
    }

    public void listarContas(){
        System.out.println("------- CONTAS DO BANCO -------");
        for(Conta conta : this.contas){
            esperar(2000);
            conta.mostarInfo();
        }
    }

    public void listarClientes(){
        System.out.println("------- CLIENTES DO BANCO -------");
        for(Cliente cliente : this.clientes){
            esperar(2000);
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
