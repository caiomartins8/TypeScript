#!/usr/bin/env node
import { AlunoManager } from "./managers/AlunoManager";
import {
  promptMenuPrincipal,
  promptParaDetalhesDoAluno,
} from "./utils/prompts";

async function main() {
  const manager = new AlunoManager();
  let running = true;

  while (running) {
    const escolha = await promptMenuPrincipal();
    switch (escolha) {
      case "Adicionar Aluno":
        const novo = await promptParaDetalhesDoAluno();
        manager.adicionarAluno(novo);
        break;
      case "Listar Alunos":
        manager.listarAlunos();
        break;
      case "Sair":
        running = false;
        console.log("Encerrando aplicação. Até mais!");
        break;
    }
  }
}

main();
