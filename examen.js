// examen.js
// Funcionalidad interactiva para exámenes

class Examen {
    constructor(preguntas) {
        this.preguntas = preguntas;
        this.respuestas = new Array(preguntas.length).fill(null);
        this.resuelto = false;
        this.inicializar();
    }

    inicializar() {
        this.crearFormulario();
        this.attachEventListeners();
        this.actualizarBarra();
    }

    crearFormulario() {
        const formulario = document.getElementById('exam-form');

        this.preguntas.forEach((pregunta, index) => {
            const bloque = document.createElement('div');
            bloque.className = 'question-block';
            bloque.id = `pregunta-${index}`;
            bloque.innerHTML = `
        <div class="question-number">Pregunta ${index + 1} de ${this.preguntas.length}</div>
        <div class="question-text">${pregunta.texto}</div>
        <div class="options-container">
          ${pregunta.opciones.map((opcion, i) => `
            <label class="option-label">
              <input 
                type="radio" 
                name="pregunta-${index}" 
                value="${i}" 
                class="option-input"
                data-pregunta="${index}"
              >
              <span class="option-text"><strong>${String.fromCharCode(65 + i)})</strong> ${opcion}</span>
            </label>
          `).join('')}
        </div>
      `;
            formulario.appendChild(bloque);
        });
    }

    attachEventListeners() {
        // Event listeners para opciones
        document.querySelectorAll('.option-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const preguntaIdx = parseInt(e.target.dataset.pregunta);
                const opcionIdx = parseInt(e.target.value);

                this.respuestas[preguntaIdx] = opcionIdx;
                this.actualizarBarra();
                this.marcarSeleccionada(preguntaIdx, opcionIdx);
            });
        });

        // Event listener para enviar
        document.getElementById('btn-submit').addEventListener('click', () => {
            this.verificarRespuestas();
        });

        // Event listener para reiniciar
        document.getElementById('btn-reset').addEventListener('click', () => {
            this.reiniciar();
        });
    }

    marcarSeleccionada(preguntaIdx, opcionIdx) {
        const bloque = document.getElementById(`pregunta-${preguntaIdx}`);
        bloque.classList.add('answered');

        bloque.querySelectorAll('.option-label').forEach((label, i) => {
            label.classList.remove('selected');
            if (i === opcionIdx) {
                label.classList.add('selected');
            }
        });
    }

    actualizarBarra() {
        const respondidas = this.respuestas.filter(r => r !== null).length;
        const total = this.preguntas.length;
        const porcentaje = (respondidas / total) * 100;

        const barra = document.querySelector('.progress-fill');
        const texto = document.querySelector('.progress-text');

        barra.style.width = porcentaje + '%';
        texto.textContent = `Pregunta respondida: ${respondidas} de ${total}`;
    }

    verificarRespuestas() {
        // Verificar que todas las preguntas estén respondidas
        const sinResponder = this.respuestas.findIndex(r => r === null);
        if (sinResponder !== -1) {
            alert(`Por favor, responde la pregunta ${sinResponder + 1}`);
            document.getElementById(`pregunta-${sinResponder}`).scrollIntoView({ behavior: 'smooth' });
            return;
        }

        this.resuelto = true;

        // Calcular resultados
        let correctas = 0;
        let incorrectas = 0;

        this.preguntas.forEach((pregunta, index) => {
            const respuestaUsuario = this.respuestas[index];
            const esCorrecta = respuestaUsuario === pregunta.respuesta;

            if (esCorrecta) {
                correctas++;
            } else {
                incorrectas++;
            }

            // Mostrar resultado en la pregunta
            const bloque = document.getElementById(`pregunta-${index}`);
            const labels = bloque.querySelectorAll('.option-label');

            if (esCorrecta) {
                bloque.classList.add('correct');
                bloque.classList.remove('incorrect');
                labels[respuestaUsuario].classList.add('correct-answer');
            } else {
                bloque.classList.add('incorrect');
                bloque.classList.remove('correct');
                labels[respuestaUsuario].classList.add('incorrect-answer');
                labels[pregunta.respuesta].classList.add('correct-answer');
            }

            // Desactivar inputs
            labels.forEach(label => {
                label.style.pointerEvents = 'none';
                label.style.opacity = '0.8';
            });
        });

        // Mostrar resultados
        this.mostrarResultados(correctas, incorrectas);

        // Ocultar botones
        document.getElementById('btn-submit').style.display = 'none';
        document.getElementById('btn-reset').textContent = 'Hacer otro examen';
    }

    mostrarResultados(correctas, incorrectas) {
        const total = this.preguntas.length;
        const porcentaje = Math.round((correctas / total) * 100);

        let mensaje = '';
        let colorClase = '';

        if (porcentaje === 100) {
            mensaje = '¡Perfecto! Has respondido todas correctamente. 🎉';
            colorClase = 'excelente';
        } else if (porcentaje >= 90) {
            mensaje = '¡Excelente! Muy buen resultado. 👏';
            colorClase = 'excelente';
        } else if (porcentaje >= 75) {
            mensaje = '¡Bien! Buen desempeño. 👍';
            colorClase = 'bueno';
        } else if (porcentaje >= 60) {
            mensaje = 'Aprobado. Podrías repasar los temas. 📚';
            colorClase = 'aprobado';
        } else {
            mensaje = 'Necesitas repasar más los temas. 💪 ¡Sigue estudiando!';
            colorClase = 'suspenso';
        }

        const resultadosDiv = document.getElementById('exam-results');
        resultadosDiv.innerHTML = `
      <div class="results-title">Resultados del Examen</div>
      <div class="results-score">${correctas}/${total}</div>
      <div class="results-percentage">${porcentaje}%</div>
      
      <div class="results-details">
        <div class="result-item correct">
          <div class="result-item-label">Correctas</div>
          <div class="result-item-value">${correctas}</div>
        </div>
        <div class="result-item incorrect">
          <div class="result-item-label">Incorrectas</div>
          <div class="result-item-value">${incorrectas}</div>
        </div>
        <div class="result-item">
          <div class="result-item-label">Porcentaje</div>
          <div class="result-item-value">${porcentaje}%</div>
        </div>
      </div>
      
      <div class="results-message">
        ${mensaje}
      </div>
    `;

        resultadosDiv.classList.add('show');
        resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    reiniciar() {
        // Recargar la página
        location.reload();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const preguntasData = window.preguntasExamen;
    if (preguntasData && preguntasData.length > 0) {
        window.examenActual = new Examen(preguntasData);
    }
});