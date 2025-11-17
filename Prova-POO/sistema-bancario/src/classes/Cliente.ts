import Conta from "./Conta";

// Dupla: Kamila Rocha e Vitória Barbosa

export default class Cliente {
  private _id: number;
  private _nome: string;
  private _cpf: string;
  private _dataNascimento: Date;
  private _contas: Conta[] = [];

  constructor(nome: string, cpf: string, dataNascimento: Date) {
    this._nome = nome;
    this._cpf = cpf;
    this._dataNascimento = dataNascimento;
  }

  public adicionarConta(conta: Conta): void {
    this._contas.push(conta);
  }

  public mostrarDados(): string {
    return `
  | NOME: ${this._nome}
  | ID: ${this._id}
  | CPF: ${this._cpf}
  | DATA NASC: ${this._dataNascimento}
   `;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get cpf(): string {
    return this._cpf;
  }

  public set cpf(cpf: string) {
    this._cpf = cpf;
  }

  public get dataNascimento(): string {
    return this._dataNascimento;
  }

  public set dataNascimento(data: string) {
    this._dataNascimento = data;
  }

  public get contas(): Conta[] {
    return this._contas;
  }

  public set contas(contas: Conta[]) {
    this._contas = contas;
  }
}
