// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Cliente {
    private int id;
    private String nome;
    private String CPF;
    private LocalDate dataNasc;
    //private List<Conta> contas = new ArrayList<>();

    static DateTimeFormatter formatoBR = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Cliente(int id, String nome, String CPF, String dataNasc) {
        this.id = id;
        this.nome = nome;
        this.CPF = CPF;
        this.dataNasc = LocalDate.parse(dataNasc, formatoBR);
    }

    public String dados(){
        return String.format(
        """
        | ID CLIENTE: %d
        | NOME: %s
        | CPF: %s
        | DATA DE NASCIMENTO: %s
        """, this.id, this.nome, this.CPF, this.dataNasc.format(formatoBR));
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCPF() {
        return this.CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }
}