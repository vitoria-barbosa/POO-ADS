import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Utils {
    static Scanner ler = new Scanner(System.in);

    public static String receberString(String texto){
        System.out.println(texto);
        return ler.nextLine();
    }

    public static Number receberNumero(String texto){
        System.out.println(texto);
        return ler.nextInt();
    }

    public static void limparBuffer(){
        if(ler.hasNextLine()){
            ler.nextLine();
        }
    }

    public static List<Conta> inicializarContas(){
        List<Conta> contas = new ArrayList<>();

        contas.add(new Conta(1, "111-1", new Cliente(1, "Vitória", "12345")));
        contas.add(new Conta(2, "222-2", new Cliente(2, "Thalisson", "23456")));
        contas.add(new Conta(3, "333-3", new Cliente(3, "Mariana", "34567")));
        contas.add(new Conta(4, "444-4", new Cliente(4, "Anna", "45678")));
        contas.add(new Conta(5, "555-5", new Cliente(5, "Bianca", "56789")));
        contas.add(new Conta(6, "666-6", new Cliente(6, "Júnior", "67890")));

        return contas;
    }

    public static List<Cliente> inicializaClientes(List<Conta> contas){
        List<Cliente> clientes = new ArrayList<>();

        for(Conta conta : contas){
            clientes.add(conta.getTitular());
        }

        return clientes;
    }

    public static Cliente cadastrarCliente(){
        int id = (int) receberNumero("Id do Cliente:");
        limparBuffer();
        String nome = receberString("Nome:");
        String cpf = receberString("CPF:");
        return new Cliente(id, nome, cpf);
    } 

    public static Conta criarConta(){
        System.out.println(">>> CRIAR CONTA <<<");
        int idConta = (int) receberNumero("Id da conta:");
        limparBuffer();
        String numero = receberString("Número da conta:");
        Cliente cliente = cadastrarCliente();
        return new Conta(idConta, numero, cliente);
    }
}
