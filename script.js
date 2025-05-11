const puntajes = {
  565: 127.5, 564: 97.5, 563: 37.5, 555: 112.5, 554: 82.5, 553: 52.5,
  545: 97.5, 544: 67.5, 543: 37.5, 535: 82.5, 534: 52.5, 533: 22.5,
  465: 120.0, 464: 90.0, 463: 30.0, 455: 105.0, 454: 75.0, 453: 45.0,
  445: 90.0, 444: 60.0, 443: 30.0, 435: 75.0, 434: 45.0, 433: 15.0,
  365: 112.5, 364: 82.5, 363: 22.5, 355: 97.5, 354: 67.5, 353: 37.5,
  345: 82.5, 344: 52.5, 343: 22.5, 335: 67.5, 334: 37.5, 333: 7.5
};

let seleccionActual = { clase: null, tipo: null, nota: null };
let lineas = [];
let multiplicadores = {
  grupo: false, calidad: false, responsabilidad: false, disciplina: false, ahorro: false
};

function selectValue(categoria, valor, texto) {
  seleccionActual[categoria] = { valor, texto };
  mostrarSeleccion();
}

function mostrarSeleccion() {
  const s = seleccionActual;
  if (s.clase && s.tipo && s.nota) {
    document.getElementById('seleccion').textContent =
      `Clase: ${s.clase.texto}, Tipo: ${s.tipo.texto}, Nota: ${s.nota.texto}`;
  }
}

function guardarLinea() {
  if (!seleccionActual.clase || !seleccionActual.tipo || !seleccionActual.nota) return alert("Selecciona todos los campos");
  const codigo = `${seleccionActual.clase.valor}${seleccionActual.tipo.valor}${seleccionActual.nota.valor}`;
  const puntos = puntajes[codigo] || 0;
  lineas.push({ ...seleccionActual, codigo, puntos });
  renderizarLineas();
  calcularResultados();
  seleccionActual = { clase: null, tipo: null, nota: null };
  document.getElementById('seleccion').textContent = '';
}

function eliminarLinea(index) {
  lineas.splice(index, 1);
  renderizarLineas();
  calcularResultados();
}

function renderizarLineas() {
  const ul = document.getElementById('lineas');
  ul.innerHTML = '';
  lineas.forEach((l, i) => {
    const li = document.createElement('li');
    li.textContent = `${l.clase.texto} - ${l.tipo.texto} - ${l.nota.texto} => ${l.puntos.toFixed(2)} pts `;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => eliminarLinea(i);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function toggleMultiplicador(nombre) {
  multiplicadores[nombre] = !multiplicadores[nombre];
  calcularResultados();
}

function calcularResultados() {
  let subtotal = lineas.reduce((sum, l) => sum + l.puntos, 0);
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);

  let porcentajeExtra = 0;
  if (multiplicadores.grupo) porcentajeExtra += 0.07;
  if (multiplicadores.calidad) porcentajeExtra += 0.15;
  if (multiplicadores.responsabilidad) porcentajeExtra += 0.15;
  if (multiplicadores.disciplina) porcentajeExtra += 0.05;
  if (multiplicadores.ahorro) porcentajeExtra += 0.08;

  let resultado = subtotal * (1 + porcentajeExtra);
  document.getElementById('resultado').textContent = resultado.toFixed(2);
}
