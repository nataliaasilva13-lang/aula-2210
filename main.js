
import { criarPessoa, escutarPessoas, atualizarPessoa, excluirPessoa } from "./crud.js";


const form = document.getElementById("pessoa-form");
const inputId = document.getElementById("pessoa-id");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const listaPessoas = document.getElementById("lista-pessoas");
const btnSalvar = document.getElementById("btn-salvar");


escutarPessoas((pessoas) => {
  listaPessoas.innerHTML = "";

  if (pessoas.length === 0) {
    listaPessoas.innerHTML = "<li>Nenhuma pessoa cadastrada.</li>";
    return;
  }

  pessoas.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${p.nome}</strong> - ${p.idade} anos</span>
      <div>
        <button class="btn-editar" data-id="${p.id}" data-nome="${p.nome}" data-idade="${p.idade}">Editar</button>
        <button class="btn-excluir" data-id="${p.id}">Excluir</button>
      </div>
    `;
    listaPessoas.appendChild(li);
  });
});


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = inputId.value;
  const nome = inputNome.value.trim();
  const idade = Number(inputIdade.value);

  if (id) {
  
    await atualizarPessoa(id, nome, idade);
  } else {
  
    await criarPessoa(nome, idade);
  }

  limparFormulario();
});


listaPessoas.addEventListener("click", async (e) => {
  const elemento = e.target;

 
  if (elemento.classList.contains("btn-excluir")) {
    const id = elemento.getAttribute("data-id");
    if (confirm("Deseja realmente excluir?")) {
      await excluirPessoa(id);
    }
  }


  if (elemento.classList.contains("btn-editar")) {
    inputId.value = elemento.getAttribute("data-id");
    inputNome.value = elemento.getAttribute("data-nome");
    inputIdade.value = elemento.getAttribute("data-idade");
    btnSalvar.innerText = "Atualizar";
  }
});

function limparFormulario() {
  form.reset();
  inputId.value = "";
  btnSalvar.innerText = "Salvar";
}

