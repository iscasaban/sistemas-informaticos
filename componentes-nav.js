// componentes-nav.js
// Funciones para generar dinámicamente el HTML de navegación
// Depende de: navegacion.js (debe cargarse primero)

/**
 * Genera el breadcrumb (ruta de navegación)
 * @param {string} temaId - ID del tema (ej: "tema1")
 * @param {string} nombrePagina - Nombre de la página actual
 * @returns {string} HTML del breadcrumb
 */
function generarBreadcrumb(temaId, nombrePagina) {
    const nombreTema = obtenerNombreTema(temaId);
    const numeroTema = obtenerNumeroTema(temaId);

    return `
    <nav class="breadcrumb" aria-label="Ruta de navegación">
      <a href="../index.html" title="Volver al inicio">Inicio</a>
      <span class="breadcrumb-separator"> / </span>
      <span class="breadcrumb-actual" title="Tema ${numeroTema}">Tema ${numeroTema}: ${nombreTema}</span>
      <span class="breadcrumb-separator"> / </span>
      <span class="breadcrumb-pagina" title="${nombrePagina}">${nombrePagina}</span>
    </nav>
  `;
}

/**
 * Convierte una ruta relativa a la raíz del proyecto ("tema1/archivo.html")
 * en una ruta relativa al archivo actual (que está dentro de "temaX/")
 */
function rutaDesdeActual(rutaActual, rutaDestino) {
    const dirActual = rutaActual.substring(0, rutaActual.lastIndexOf('/'));
    const dirDestino = rutaDestino.substring(0, rutaDestino.lastIndexOf('/'));
    const archivoDestino = rutaDestino.substring(rutaDestino.lastIndexOf('/') + 1);

    if (dirActual === dirDestino) {
        return archivoDestino;
    }
    return '../' + rutaDestino;
}

function generarBarraNavegacion(nav, rutaActual) {
    if (!nav) return '';

    const { anterior, siguiente, numeroPagina, total } = nav;

    let btnAnterior;
    if (anterior) {
        const href = rutaDesdeActual(rutaActual, anterior.ruta);
        btnAnterior = `
      <a href="${href}" class="btn btn-nav-prev" title="Anterior: ${anterior.titulo}">
        ← Anterior
      </a>
    `;
    } else {
        btnAnterior = `
      <button class="btn btn-nav-prev" disabled title="Primera página">
        ← Anterior
      </button>
    `;
    }

    let btnSiguiente;
    if (siguiente) {
        const href = rutaDesdeActual(rutaActual, siguiente.ruta);
        btnSiguiente = `
      <a href="${href}" class="btn btn-nav-next" title="Siguiente: ${siguiente.titulo}">
        Siguiente →
      </a>
    `;
    } else {
        btnSiguiente = `
      <button class="btn btn-nav-next" disabled title="Última página">
        Siguiente →
      </button>
    `;
    }

    return `
    <nav class="subnav" aria-label="Navegación del tema">
      ${btnAnterior}
      <span class="progress" aria-label="Progreso: página ${numeroPagina} de ${total}">
        ${numeroPagina} de ${total}
      </span>
      ${btnSiguiente}
    </nav>
  `;
}

/**
 * Inicializa la navegación en la página actual
 * Debe llamarse después de que el DOM esté listo
 *
 * Ejemplo de uso:
 * document.addEventListener('DOMContentLoaded', inicializarNavegacion);
 */
function inicializarNavegacion() {
    // Obtener la ruta actual del archivo
    // window.location.pathname devuelve algo como: "/sistemas-informaticos/tema1/1-2-estructura-componentes.html"
    // Necesitamos extraer "tema1/1-2-estructura-componentes.html"

    const pathActual = window.location.pathname;

    // Extraer los últimos 2 segmentos: "tema1/1-2-estructura-componentes.html"
    const partes = pathActual.split('/').filter(p => p.length > 0);

    // Buscar desde el final para encontrar "temaX"
    let rutaActual = null;
    for (let i = partes.length - 1; i >= 0; i--) {
        if (partes[i].match(/^tema\d/)) {
            rutaActual = partes.slice(i, i + 2).join('/');
            break;
        }
    }

    // Si no se encuentra, intentar otro método
    if (!rutaActual) {
        // Extraer directamente los últimos 2 elementos
        const n = partes.length;
        if (n >= 2) {
            rutaActual = partes[n - 2] + '/' + partes[n - 1];
        }
    }

    if (rutaActual) {
        // Obtener la información de navegación
        const infoNav = obtenerNavegacion(rutaActual);

        if (infoNav) {
            // Generar e insertar breadcrumb
            const nombrePagina = infoNav.actual.titulo;
            const breadcrumb = generarBreadcrumb(infoNav.tema, nombrePagina);

            const contenedorBreadcrumb = document.getElementById('breadcrumb-container');
            if (contenedorBreadcrumb) {
                contenedorBreadcrumb.innerHTML = breadcrumb;
            }

            // Generar e insertar barra de navegación
            const barraNavi = generarBarraNavegacion(infoNav, rutaActual);
            const contenedorNavi = document.getElementById('navegacion-container');
            if (contenedorNavi) {
                contenedorNavi.innerHTML = barraNavi;
            }

            // Actualizar el título de la pestaña del navegador si es necesario
            if (document.title.indexOf(' - ') === -1) {
                document.title = `${infoNav.actual.titulo} - Sistemas Informáticos`;
            }
        } else {
            console.warn('No se encontró información de navegación para:', rutaActual);
        }
    } else {
        console.warn('No se pudo determinar la ruta actual del archivo');
    }
}

/**
 * Depuración: Muestra en consola la información de navegación
 * Útil para verificar que todo está funcionando correctamente
 */
function depurarNavegacion() {
    const pathActual = window.location.pathname;
    const partes = pathActual.split('/').filter(p => p.length > 0);

    let rutaActual = null;
    for (let i = partes.length - 1; i >= 0; i--) {
        if (partes[i].match(/^tema\d/)) {
            rutaActual = partes.slice(i, i + 2).join('/');
            break;
        }
    }

    if (!rutaActual && partes.length >= 2) {
        const n = partes.length;
        rutaActual = partes[n - 2] + '/' + partes[n - 1];
    }

    console.log('=== INFORMACIÓN DE NAVEGACIÓN ===');
    console.log('Ruta actual:', rutaActual);
    console.log('Path completo:', pathActual);
    console.log('Partes:', partes);

    if (rutaActual) {
        const info = obtenerNavegacion(rutaActual);
        if (info) {
            console.log('Info encontrada:', info);
        } else {
            console.log('No se encontró navegación para:', rutaActual);
        }
    }
}