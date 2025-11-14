"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculadora {
    _operando1;
    _operando2;
    constructor(op1, op2) {
        this._operando1 = op1;
        this._operando2 = op2;
    }
    get operando1() {
        return this._operando1;
    }
    set operando1(valor) {
        this._operando1 = valor;
    }
    get operando2() {
        return this._operando2;
    }
    set operando2(valor) {
        this._operando2 = valor;
    }
    somar() {
        return this._operando1 + this._operando2;
    }
    subtrair() {
        return this._operando1 - this.operando2;
    }
}
let calculadora = new Calculadora(10, 2);
console.log(`Operandos: ${calculadora.operando1} e ${calculadora.operando2}`);
console.log("Soma:");
console.log(calculadora.somar());
console.log("Subtração:");
console.log(calculadora.subtrair());
