package utilitarios;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.InputMismatchException;
import static utilitarios.Utils.*;

public class EntradaDeDados {
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
}
