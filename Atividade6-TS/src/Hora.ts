class Hora{
    private _horas: number;
    private _minutos: number;
    private _segundos: number;

    constructor(horas: number, minutos: number, segundos: number){
        this._horas = horas;
        this._minutos = minutos;
        this._segundos = segundos;
    }

    public exibirHoraCompleta(): string{
        let horasStr = String(this._horas).padStart(2, "0");
        let minutosStr = String(this._minutos).padStart(2, "0");
        let segundosStr = String(this._segundos).padStart(2, "0");
        return `Hora: ${horasStr}:${minutosStr}:${segundosStr}`
    }
}

const hora: Hora = new Hora(3,16,4);
console.log(hora.exibirHoraCompleta());