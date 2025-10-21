import java.util.Date;

public class Conta {
    private int idConta;
    private String numero;
    private Cliente titular;
    //private Date DataAbertura;
    private double saldo;

    public Conta(int idConta, String numero, Cliente titular) {
        this.idConta = idConta;
        this.numero = numero;
        this.titular = titular;
        //this.DataAbertura = DataAbertura;
        this.saldo = 0;
    }

    public void sacar(double valor){
        if (this.saldo >= valor && this.saldo > 0){
            this.saldo -= valor;

            System.out.println("Saque realizado com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f", this.saldo);
        }
        else{
            System.out.println("Saldo insuficiente para fazer o saque!");
        }
    }

    public void depositar(double valor){
        if(valor > 0){
            this.saldo += valor;

            System.out.println("Depósito realizado com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f", this.saldo);
        }
    }

    public void transferir(Conta conta, double valor){
        if(this.saldo >= 0 && this.saldo > 0){
            this.sacar(valor);
            conta.depositar(valor);
                
            System.out.println("Transferência realizada com sucesso!");
            System.out.printf("Saldo atualizado: R$ %.2f", this.saldo);
        }
        else{
            System.out.println("Saldo insuficiente para fazer a transferência!");
        }
    }

    public void mostarInfo(){
    System.out.printf(
    """
    ------- CONTA INFO -------
    | ID: %d
    | NÚMERO: %s
    | TITULAR:
    %s
    | SALDO: %.2f
    --------------------------
    """, this.idConta, this.numero, this.titular.dados(), this.saldo);
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
}
