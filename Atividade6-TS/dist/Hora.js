"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hora {
    _horas;
    _minutos;
    _segundos;
    constructor(horas, minutos, segundos) {
        this._horas = horas;
        this._minutos = minutos;
        this._segundos = segundos;
    }
    exibirHoraCompleta() {
        let horasStr = String(this._horas).padStart(2, "0");
        let minutosStr = String(this._minutos).padStart(2, "0");
        let segundosStr = String(this._segundos).padStart(2, "0");
        return `Hora: ${horasStr}:${minutosStr}:${segundosStr}`;
    }
}
const hora = new Hora(3, 16, 4);
console.log(hora.exibirHoraCompleta());
