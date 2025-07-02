import inquirer from "inquirer";
import { IAluno } from "../interfaces/IAluno";

export async function promptParaDetalhesDoAluno(): Promise<IAluno> {
  const respostas = await inquirer.prompt([
    {
      name: "matricula",
      type: "input",
      message: "Matrícula:",
      validate: (input: string) =>
        input.trim() !== "" ? true : "A matrícula não pode ser vazia.",
    },
    {
      name: "nome",
      type: "input",
      message: "Nome do aluno:",
      validate: (input: string) =>
        input.trim() !== "" ? true : "O nome não pode ser vazio.",
    },
    {
      name: "idade",
      type: "input", 
      message: "Idade:",
      validate: (input: string) => {
        const idade = Number(input);
        return Number.isInteger(idade) && idade > 0
          ? true
          : "Digite uma idade válida (número inteiro positivo).";
      },
      filter: (input: string) => Number(input), 
    },
  ]);

  return {
    matricula: respostas.matricula.trim(),
    nome: respostas.nome.trim(),
    idade: respostas.idade,
  };
}

export async function promptMenuPrincipal(): Promise<string> {
  const resposta = await inquirer.prompt([
    {
      name: "acao",
      type: "list",
      message: "O que deseja fazer?",
      choices: ["Adicionar Aluno", "Listar Alunos", "Sair"],
    },
  ]);

  return resposta.acao;
}
