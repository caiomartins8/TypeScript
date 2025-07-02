import { IAluno } from "../interfaces/IAluno";
import { Aluno } from "../models/Aluno";
import * as fs from "fs";
import * as path from "path";

export class AlunoManager {
  private alunos: IAluno[] = [];
  private dbPath = path.resolve(__dirname, "../../database");
  private dbFile = path.join(this.dbPath, "alunos.json");

  constructor() {
    this.loadFromFile();
  }

  private loadFromFile(): void {
    if (!fs.existsSync(this.dbPath)) {
      fs.mkdirSync(this.dbPath);
    }
    if (fs.existsSync(this.dbFile)) {
      const data = fs.readFileSync(this.dbFile, "utf-8");
      try {
        this.alunos = JSON.parse(data) as IAluno[];
      } catch {
        this.alunos = [];
      }
    }
  }

  private saveToFile(): void {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.alunos, null, 2));
  }

  public adicionarAluno(novoAluno: IAluno): void {
    const exists = this.alunos.some(a =>
      a.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()
    );
    if (exists) {
      console.error(
        `Erro: O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!`
      );
      return;
    }
    this.alunos.push(novoAluno);
    this.saveToFile();
    console.log(
      `Sucesso: Aluno '${novoAluno.nome}' (matrícula ${novoAluno.matricula}) adicionado!`
    );
  }

  public listarAlunos(): void {
    if (this.alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }
    this.alunos.forEach(a => {
      const aluno = new Aluno(a.matricula, a.nome, a.idade);
      aluno.exibirDetalhes();
    });
  }
}
