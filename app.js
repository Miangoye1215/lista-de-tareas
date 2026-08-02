// 1. Referencias a los elementos del HTML
let input = document.getElementById("inputTarea");
let boton = document.getElementById("botonAgregar");
let listaPendientes = document.getElementById("listaPendientes");
let listaCompletadas = document.getElementById("listaCompletadas");

// 2. Array para guardar las tareas (ahora cada tarea es un objeto)
let tareas = [];

// 3. Escuchamos el clic en el botón
boton.addEventListener("click", function() {
  let textoTarea = input.value;

  if (textoTarea === "") {
    return;
  }

  tareas.push({ texto: textoTarea, completada: false });
  input.value = "";

  mostrarTareas();
});

// 4. Función que dibuja la lista completa en pantalla
function mostrarTareas() {
  listaPendientes.innerHTML = "";
  listaCompletadas.innerHTML = "";

  for (let i = 0; i < tareas.length; i++) {
    let item = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tareas[i].completada;
    checkbox.addEventListener("change", function() {
      tareas[i].completada = checkbox.checked;
      mostrarTareas();
    });

    let texto = document.createElement("span");
    texto.textContent = tareas[i].texto;
    if (tareas[i].completada) {
      texto.style.textDecoration = "line-through";
    }

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function() {
      tareas.splice(i, 1);
      mostrarTareas();
    });

    item.appendChild(checkbox);
    item.appendChild(texto);
    item.appendChild(botonEliminar);

    if (tareas[i].completada) {
      listaCompletadas.appendChild(item);
    } else {
      listaPendientes.appendChild(item);
    }
  }
}