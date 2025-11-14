class Calculadora{
    private _operando1: number;
    private _operando2: number;

    constructor(op1: number, op2: number){
        this._operando1 = op1;
        this._operando2 = op2;
    }

    public get operando1() : number {
        return this._operando1;
    }
    
    public set operando1(valor: number) {
        this._operando1 = valor;
    }

    public get operando2() : number {
        return this._operando2;
    }

    public set operando2(valor: number) {
        this._operando2 = valor;
    }

    public somar(): number{
        return this._operando1 + this._operando2;
    }

    public subtrair(){
        return this._operando1 - this.operando2;
    }
}

let calculadora: Calculadora = new Calculadora(10, 2);
console.log(`Operandos: ${calculadora.operando1} e ${calculadora.operando2}`);
console.log("Soma:");
console.log(calculadora.somar());
console.log("Subtração:");
console.log(calculadora.subtrair());