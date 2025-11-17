import Conta from "./Conta";

// Dupla: Kamila Rocha e Vitória Barbosa

export default class Operacao {
  private _id: number;
  private _conta: Conta;
  private _tipo: string;
  private _valor: number;
  private _descricao: string;
  private _dataHora: Date;

  constructor(
    id: number,
    conta: Conta,
    tipo: string,
    valor: number,
    descricao: string
  ) {
    this._id = id;
    this._conta = conta;
    this._tipo = tipo;
    this._descricao = descricao;
    this._valor = valor;
    this._dataHora = new Date();
  }

  public get id(): number {
    return this._id;
  }

  public get conta(): Conta {
    return this._conta;
  }

  public get valor(): number {
    return this._valor;
  }

  public get tipo(): string {
    return this._tipo;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public get dataHora(): Date {
    return this._dataHora;
  }

  public set descricao(texto: string) {
    this._descricao = texto;
  }
}
