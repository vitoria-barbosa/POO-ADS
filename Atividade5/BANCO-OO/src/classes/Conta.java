package classes;

import java.time.LocalDate;

public class Conta {
    private int idConta;
    private String numero;
    private Cliente titular;
    private LocalDate dataAbertura;
    private double saldo;

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
        if(this.saldo >= 0 && this.saldo > 0){
            this.sacar(valor);
            conta.depositar(valor);
                
            System.out.println("Transferência realizada com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f\n", this.saldo);
        }
        else{
            System.out.println("Saldo insuficiente para fazer a transferência!");
        }
    }

    public void mostarInfo(){
    System.out.printf(
    """
    | ID: %d
    | NÚMERO: %s
    | DATA ABERTURA: %s
    | TITULAR:
    %s
    | SALDO: %.2f
    ------------------------------------
    """, this.idConta, this.numero, this.dataAbertura, this.titular.dados(), this.saldo);
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
