import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Cliente {
    private int id;
    private String nome;
    private String CPF;
    //private Date DataNasc;
    private List<Conta> contas = new ArrayList<>();

    public Cliente(int id, String nome, String CPF) {
        this.id = id;
        this.nome = nome;
        this.CPF = CPF;
        //this.DataNasc = DataNasc;
    }

    public String dados(){
        return String.format(
        """
        | ID CLIENTE: %d
        | NOME: %s
        | CPF: %s
        """, this.id, this.nome, this.CPF);
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