package utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import classes.Cliente;
import classes.Conta;

public class Utils {
    static Scanner ler = new Scanner(System.in).useLocale(Locale.US);
    static DateTimeFormatter formatoBR = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static int recebeInt(String texto){
        try{
            System.out.println(texto);
            int valor = ler.nextInt();
            return valor;
        }catch(InputMismatchException e){
            System.out.println("Entrada inválida, Digite um número inteiro.");
            limparBuffer();
            return recebeInt(texto);
        }
    }

    public static double recebeValor(String texto){
        try{
            System.out.println(texto);
            double valor = ler.nextDouble();
            return valor;
        }catch(InputMismatchException e){
            System.out.println("Entrada inválida, Digite um número double.");
            limparBuffer();
            return recebeValor(texto);
        }
    }

    public static String recebeStr(String texto){
        System.out.println(texto);
        return ler.nextLine();
    }

    public static LocalDate recebeData(String texto){
        try{
            System.out.println(texto);
            String entrada = ler.nextLine();
            return LocalDate.parse(entrada, formatoBR);
        }catch(DateTimeParseException e){
            System.out.println("Data inválida.");
            return recebeData(texto);
        }
    }

    public static void msgSucesso(){
        System.out.println("\nOperação bem sucedida!!\n");
    }

    public static void msgContaInexistente(){
        System.out.println("\nConta não encontrada.\n");
    }

    public static void limparBuffer(){
        if(ler.hasNextLine()){
            ler.nextLine();
        }
    }

    public static void esperar(int milissegundos) {
        try {
            Thread.sleep(milissegundos);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static List<Cliente> inicializarClientes(){
        List<Cliente> clientes = new ArrayList<>();
        
        Cliente cliente1 = new Cliente(1, "Vitória", "12345", LocalDate.parse("02/11/2006", formatoBR));
        Conta conta1 = new Conta(1, "111-1", cliente1, LocalDate.parse("21/10/2025", formatoBR));
        cliente1.adicionarConta(conta1);
        clientes.add(cliente1);
        
        Cliente cliente2 = new Cliente(2, "Thalisson", "23456", LocalDate.parse("02/11/2006", formatoBR));
        Conta conta2 = new Conta(2, "222-2", cliente2, LocalDate.parse("21/10/2025", formatoBR));
        cliente2.adicionarConta(conta2);
        clientes.add(cliente2);
        
        Cliente cliente3 = new Cliente(3, "Anna", "45678", LocalDate.parse("02/11/2006", formatoBR));
        Conta conta3 = new Conta(3, "333-3", cliente3, LocalDate.parse("21/10/2025", formatoBR));
        cliente3.adicionarConta(conta3);
        clientes.add(cliente3);
        
        Cliente cliente4 = new Cliente(4, "Bianca", "56789", LocalDate.parse("02/11/2006", formatoBR));
        Conta conta4 = new Conta(4, "444-4", cliente4, LocalDate.parse("21/10/2025", formatoBR));
        cliente4.adicionarConta(conta4);
        clientes.add(cliente4);
        
        Cliente cliente5 = new Cliente(5, "Júnior", "67890", LocalDate.parse("02/11/2006", formatoBR));
        Conta conta5 = new Conta(5, "555-5", cliente5, LocalDate.parse("21/10/2025", formatoBR));
        cliente5.adicionarConta(conta5);
        clientes.add(cliente5);
        
        return clientes;
    }
    
    public static List<Conta> inicializarContas(List<Cliente> clientes){
        List<Conta> contas = new ArrayList<>();

        for(Cliente cliente : clientes){
            Conta conta = cliente.getContas().getFirst();
            contas.add(conta);
        }

        return contas;
    }

    public static Cliente cadastrarCliente(){
        System.out.println(">>> CADASTRAR CLIENTE:\n");
        int id = recebeInt("Id do Classes.Cliente:");
        limparBuffer();
        String nome = recebeStr("Nome:");
        String cpf = recebeStr("CPF:");
        LocalDate dataNasc = recebeData("Data de nascimento (DD/MM/AAAA): ");
        return new Cliente(id, nome, cpf, dataNasc);
    } 

    public static Conta criarConta(Cliente cliente){
        System.out.println(">>> CRIAR CONTA:\n");
        int idConta = recebeInt("Id da conta:");
        limparBuffer();
        String numero = recebeStr("Número da conta:");
        LocalDate dataAbertura = recebeData("Data de abertura (DD/MM/AAAA): ");
        return new Conta(idConta, numero, cliente, dataAbertura);
    }
}
