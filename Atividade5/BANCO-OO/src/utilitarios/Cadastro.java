package utilitarios;

import static utilitarios.EntradaDeDados.*;
import classes.Cliente;
import classes.Conta;

import java.time.LocalDate;
import java.util.List;
public class Cadastro {

    public static Cliente cadastrarCliente(List<Cliente> clientes){        
        System.out.println("\n>>> CADASTRAR CLIENTE:\n");

        int ultimoId = clientes.getLast().getId();
        int idCliente = ultimoId+1;
        String nome = recebeStr("Nome:");
        String cpf = recebeStr("CPF:");
        LocalDate dataNasc = recebeData("Data de nascimento (DD/MM/AAAA): ");

        if(isCPFValido(cpf, clientes)){
            return new Cliente(idCliente, nome, cpf, dataNasc);
        }

        System.out.println("Já existe um cliente com esse CPF. Tente novamente:");
        return cadastrarCliente(clientes);
    } 

    public static Conta criarConta(Cliente cliente, List<Conta> contas){
        System.out.println("\n>>> CRIAR CONTA:\n");

        int ultimoId = contas.getLast().getIdConta();
        int idConta = ultimoId+1;
        String numero = recebeStr("Número da conta:");
        LocalDate dataAbertura = recebeData("Data de abertura (DD/MM/AAAA): ");

        if(isNumContaValido(numero, contas)){
            return new Conta(idConta, numero, cliente, dataAbertura);
        }

        System.out.println("Número da conta indisponível para uso. Tente novamente:");
        return criarConta(cliente, contas);
    }

    public static boolean isCPFValido(String cpf, List<Cliente> clientes){
        for(Cliente cliente : clientes){
            if(cliente.getCPF().equals(cpf)){
                return false;
            }
        }
        return true;
    }

    public static boolean isNumContaValido(String numero, List<Conta> contas){
       for(Conta conta : contas){
            if(conta.getNumero().equals(numero)){
                return false;
            }
        }
        return true; 
    }
}
