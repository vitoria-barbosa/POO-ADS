package classes;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Conta {
    private int idConta;
    private String numero;
    private Cliente titular;
    private LocalDate dataAbertura;
    private double saldo;

    static DateTimeFormatter formatoBR = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Conta(int idConta, String numero, Cliente titular, LocalDate dataAbertura) {
        this.idConta = idConta;
        this.numero = numero;
        this.titular = titular;
        this.dataAbertura = dataAbertura;
        this.saldo = 0.0;
    }
    
    public void sacar(double valor){
        if (this.saldo >= valor && this.saldo > 0){
            this.saldo -= valor;

            System.out.println("Saque realizado com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f\n", this.saldo);
        }
        else{
            System.out.println("Saldo insuficiente para fazer o saque!");
        }
    }

    public void depositar(double valor){
        if(valor > 0){
            this.saldo += valor;

            System.out.println("Depósito realizado com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f\n", this.saldo);
        }
    }

    public void transferir(Conta conta, double valor){
        if(this.saldo > 0 && valor <= this.saldo){
            this.sacar(valor);
            conta.depositar(valor);
        }
        else{
            System.out.println("Saldo insuficiente para fazer a transferência!");
        }
    }

    public void mostrarInfo(){
    System.out.printf(
    """
    | ID: %d
    | NÚMERO: %s
    | DATA ABERTURA: %s
    | TITULAR:
    %s
    | SALDO: %.2f
    ------------------------------------
    """, this.idConta, this.numero, this.dataAbertura.format(formatoBR), this.titular.dados(), this.saldo);
    }

    public int getIdConta() {
        return this.idConta;
    }

    public void setIdConta(int idConta) {
        this.idConta = idConta;
    }

    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Cliente getTitular() {
        return this.titular;
    }

    public void setTitular(Cliente titular) {
        this.titular = titular;
    }

    public double getSaldo() {
        return this.saldo;
    }

    public LocalDate getDataAbertura() {
        return this.dataAbertura;
    }

    public void setDataAbertura(LocalDate dataAbertura) {
        this.dataAbertura = dataAbertura;
    }
}
