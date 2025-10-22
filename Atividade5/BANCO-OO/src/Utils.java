import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

public class Utils {
    static Scanner ler = new Scanner(System.in).useLocale(Locale.US);

    public static int receberInt(String texto){
        try{
            System.out.println(texto);
            int valor = ler.nextInt();
            limparBuffer();
            return valor;
        }catch(InputMismatchException e){
            System.out.println("Entrada inválida, Digite um número inteiro.");
            return receberInt(texto);
        }
    }

    public static double receberDouble(String texto){
        try{
            System.out.println(texto);
            double valor = ler.nextDouble();
            limparBuffer();
            return valor;
        }catch(InputMismatchException e){
            System.out.println("Entrada inválida, Digite um número double.");
            return receberDouble(texto);
        }
    }

    public static String receberString(String texto){
        System.out.println(texto);
        return ler.nextLine();
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

    public static List<Conta> inicializarContas(){
        List<Conta> contas = new ArrayList<>();

        contas.add(new Conta(1, "111-1", new Cliente(1, "Vitória", "12345", "02/11/2006"), "21/10/2025"));
        contas.add(new Conta(2, "222-2", new Cliente(2, "Thalisson", "23456", "02/11/2006" ),  "21/10/2025"));
        contas.add(new Conta(3, "333-3", new Cliente(3, "Mariana", "34567", "02/11/2006"),  "21/10/2025"));
        contas.add(new Conta(4, "444-4", new Cliente(4, "Anna", "45678", "02/11/2006"),  "21/10/2025"));
        contas.add(new Conta(5, "555-5", new Cliente(5, "Bianca", "56789", "02/11/2006"),  "21/10/2025"));
        contas.add(new Conta(6, "666-6", new Cliente(6, "Júnior", "67890", "02/11/2006"),  "21/10/2025"));

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
        int id = receberInt("Id do Cliente:");
        limparBuffer();
        String nome = receberString("Nome:");
        String cpf = receberString("CPF:");
        String dataNasc = receberString("Data de nascimento (DD/MM/AAAA): ");
        return new Cliente(id, nome, cpf, dataNasc);
    } 

    public static Conta criarConta(){
        System.out.println(">>> CRIAR CONTA <<<");
        int idConta = receberInt("Id da conta:");
        limparBuffer();
        String numero = receberString("Número da conta:");
        Cliente cliente = cadastrarCliente();
        String dataAbertura = receberString("Data da abertura (DD/MM/AAAA): ");
        return new Conta(idConta, numero, cliente, dataAbertura);
    }
}
