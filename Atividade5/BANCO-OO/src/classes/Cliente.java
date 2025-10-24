package classes;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

public class Cliente {
    private int id;
    private String nome;
    private String CPF;
    private LocalDate dataNasc;
    private List<Conta> contas = new ArrayList<>();

    public Cliente(int id, String nome, String CPF, LocalDate dataNasc) {
        this.id = id;
        this.nome = nome;
        this.CPF = CPF;
        this.dataNasc = dataNasc;
    }

    public String dados(){
        return String.format(
        """
        | ID CLIENTE: %d
        | NOME: %s
        | CPF: %s
        | DATA DE NASCIMENTO: %s
        """, this.id, this.nome, this.CPF, this.dataNasc);
    }

    public void adicionarConta(Conta conta){
        this.contas.add(conta);
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


    public LocalDate getDataNasc() {
        return this.dataNasc;
    }

    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }

    public List<Conta> getContas() {
        return this.contas;
    }

    public void setContas(List<Conta> contas) {
        this.contas = contas;
    }

}