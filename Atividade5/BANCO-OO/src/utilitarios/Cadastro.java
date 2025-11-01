package utilitarios;

import static utilitarios.Utils.*;
import static utilitarios.EntradaDeDados.*;

import java.time.LocalDate;
import java.util.List;

import classes.Cliente;
import classes.Conta;

public class Cadastro {

    public static Cliente cadastrarCliente(List<Cliente> clientes){
        System.out.println("\n>>> CADASTRAR CLIENTE:\n");

        int id = recebeInt("Id do Cliente:");
        limparBuffer();
        String nome = recebeStr("Nome:");
        String cpf = recebeStr("CPF:");
        LocalDate dataNasc = recebeData("Data de nascimento (DD/MM/AAAA): ");

        if( isCPFValido(cpf, clientes) && isIdClienteValido(id, clientes)){
            return new Cliente(id, nome, cpf, dataNasc);
        }

        if(!isCPFValido(cpf, clientes)){
            System.out.println("CPF indisponível para uso.");
        }
        if(!isIdClienteValido(id, clientes)){
            System.out.println("Id escolhido indisponível para uso.");
        }
        return cadastrarCliente(clientes);
    } 

    public static Conta criarConta(Cliente cliente, List<Conta> contas){
        System.out.println("\n>>> CRIAR CONTA:\n");

        int idConta = recebeInt("Id da conta:");
        limparBuffer();
        String numero = recebeStr("Número da conta:");
        LocalDate dataAbertura = recebeData("Data de abertura (DD/MM/AAAA): ");

        if (isIdContaValida(idConta, contas) && isNumContaValido(numero, contas)){
            return new Conta(idConta, numero, cliente, dataAbertura);
        }

        if(!isIdContaValida(idConta, contas)){
            System.out.println("Id da conta indisponível para uso.");
        }
        if(!isNumContaValido(numero, contas)){
            System.out.println("Número da conta indisponível para uso.");
        }
        return criarConta(cliente, contas);
    }

    public static boolean isIdClienteValido(int id, List<Cliente> clientes){
        for(Cliente cliente : clientes){
            if(cliente.getId() == id){
                return false;
            }
        }
        return true;
    }

    public static boolean isIdContaValida(int id, List<Conta> contas){
        for(Conta conta : contas){
            if(conta.getIdConta() == id){
                return false;
            }
        }
        return true;
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


