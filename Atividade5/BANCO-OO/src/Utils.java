import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

public class Utils {
    static Scanner ler = new Scanner(System.in).useLocale(Locale.US);

    public static int recebeInt(String texto){
        try{
            System.out.println(texto);
            int valor = ler.nextInt();
            return valor;
        }catch(InputMismatchException e){
            System.out.println("Entrada inválida, Digite um número inteiro.");

            return recebeInt(texto);
        }
    }

    public static double recebeValor(String texto){
        try{
            System.out.println(texto);
            double valor = ler.nextDouble();
            limparBuffer();
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
        
        Cliente cliente1 = new Cliente(1, "Vitória", "12345", "02/11/2006");
        Conta conta1 = new Conta(1, "111-1", cliente1, "21/10/2025");
        cliente1.adicionarConta(conta1);
        clientes.add(cliente1);
        
        Cliente cliente2 = new Cliente(2, "Thalisson", "23456", "02/11/2006");
        Conta conta2 = new Conta(2, "222-2", cliente2, "21/10/2025");
        cliente2.adicionarConta(conta2);
        clientes.add(cliente2);
        
        Cliente cliente3 = new Cliente(3, "Anna", "45678", "02/11/2006");
        Conta conta3 = new Conta(3, "333-3", cliente3, "21/10/2025");
        cliente3.adicionarConta(conta3);
        clientes.add(cliente3);
        
        Cliente cliente4 = new Cliente(4, "Bianca", "56789", "02/11/2006");
        Conta conta4 = new Conta(4, "444-4", cliente4, "21/10/2025");
        cliente4.adicionarConta(conta4);
        clientes.add(cliente4);
        
        Cliente cliente5 = new Cliente(5, "Júnior", "67890", "02/11/2006");
        Conta conta5 = new Conta(5, "555-5", cliente5, "21/10/2025");
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
        int id = recebeInt("Id do Cliente:");
        limparBuffer();
        String nome = recebeStr("Nome:");
        String cpf = recebeStr("CPF:");
        String dataNasc = recebeStr("Data de nascimento (DD/MM/AAAA): ");
        return new Cliente(id, nome, cpf, dataNasc);
    } 

    public static Conta criarConta(Cliente cliente){
        System.out.println(">>> CRIAR CONTA:\n");
        int idConta = recebeInt("Id da conta:");
        limparBuffer();
        String numero = recebeStr("Número da conta:");
        String dataAbertura = recebeStr("Data da abertura (DD/MM/AAAA): ");
        return new Conta(idConta, numero, cliente, dataAbertura);
    }
}
