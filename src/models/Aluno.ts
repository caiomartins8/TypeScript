import { IAluno } from "../interfaces/IAluno";

export class Aluno implements IAluno {
  constructor(
    public matricula: string,
    public nome: string,
    public idade: number
  ) {}

  exibirDetalhes(): void {
    console.log(`Matrícula: ${this.matricula}`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Idade: ${this.idade}`);
    console.log("---------------------------");
  }
}
