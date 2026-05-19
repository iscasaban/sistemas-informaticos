// navegacion.js
// Estructura de navegación por tema para Sistema Informáticos
// Este archivo define el orden y la información de cada página de resumen

const estructuraNavegacion = {
    // TEMA 1: Explotación de sistemas microinformáticos
    tema1: [
        { ruta: "tema1/1-1-arquitectura-von-neumann.html", titulo: "Arquitectura Von Neumann" },
        { ruta: "tema1/1-2-estructura-componentes.html", titulo: "Estructura y Componentes" },
        { ruta: "tema1/1-3-prl.html", titulo: "PRL" },
        { ruta: "tema1/1-4-redes-informaticas.html", titulo: "Redes Informáticas" },
        { ruta: "tema1/1-5-mapa-fisico-logico-red-local.html", titulo: "Mapa Físico-Lógico Red Local" }
    ],

    // TEMA 2: Sistemas operativos
    tema2: [
        { ruta: "tema2/2-1-so-evolucion.html", titulo: "Evolución SO" },
        { ruta: "tema2/2-2-clasificacion-so.html", titulo: "Clasificación SO" },
        { ruta: "tema2/2-3-virtualizacion.html", titulo: "Virtualización" },
        { ruta: "tema2/2-4-instalacion-windows.html", titulo: "Instalación Windows" },
        { ruta: "tema2/2-5-instalacion-linux.html", titulo: "Instalación Linux" },
        { ruta: "tema2/2-6-actualizaciones-so.html", titulo: "Actualizaciones SO" },
        { ruta: "tema2/2-7-documentacion-gestion-incidencias.html", titulo: "Documentación y Gestión de Incidencias" }
    ],

    // TEMA 3: Gestión de la información
    tema3: [
        { ruta: "tema3/3-1-comandos.html", titulo: "Comandos" },
        { ruta: "tema3/3-2-entornos_graficos.html", titulo: "Entornos Gráficos" },
        { ruta: "tema3/3-3-copias-seguridad.html", titulo: "Copias de Seguridad" },
        { ruta: "tema3/3-4-administracion-discos.html", titulo: "Administración de Discos" },
        { ruta: "tema3/3-5-tareas-automaticas.html", titulo: "Tareas Automáticas" }
    ],

    // TEMA 4: Configuración de sistemas operativos
    tema4: [
        { ruta: "tema4/4-1-usuarios-grupos.html", titulo: "Usuarios y Grupos" },
        { ruta: "tema4/4-2-permisos.html", titulo: "Permisos" },
        { ruta: "tema4/4-3-seguridad.html", titulo: "Seguridad" },
        { ruta: "tema4/4-4-servicios-procesos.html", titulo: "Servicios y Procesos" },
        { ruta: "tema4/4-5-registros-logs.html", titulo: "Registros y Logs" },
        { ruta: "tema4/4-6-monitorizacion-sistema-operativo.html", titulo: "Monitorización del Sistema Operativo" }
    ],

    // TEMA 5: Conexión de sistemas en red
    tema5: [
        { ruta: "tema5/5-1-protocolo-tcp-ip.html", titulo: "Protocolo TCP/IP" },
        { ruta: "tema5/5-2-configuracion-red.html", titulo: "Configuración Red" },
        { ruta: "tema5/5-3-monitorizacion-redes.html", titulo: "Monitorización Redes" },
        { ruta: "tema5/5-4-problemas-conectividad-diagnostico.html", titulo: "Problemas Conectividad Diagnóstico" },
        { ruta: "tema5/5-5-enrutamiento.html", titulo: "Enrutamiento" },
        { ruta: "tema5/5-6-redes-cableadas-inalambricas.html", titulo: "Redes Cableadas Inalámbricas" },
        { ruta: "tema5/5-7-redes-wan.html", titulo: "Redes WAN" },
        { ruta: "tema5/5-8-seguridad-comunicaciones.html", titulo: "Seguridad Comunicaciones" }
    ],

    // TEMA 6: Recursos en red
    tema6: [
        { ruta: "tema6/6-1-permisos-red-recursos-compartidos.html", titulo: "Permisos Red Recursos Compartidos" },
        { ruta: "tema6/6-2-seguridad-sistema-datos.html", titulo: "Seguridad Sistema Datos" },
        { ruta: "tema6/6-3-servidores-red.html", titulo: "Servidores Red" },
        { ruta: "tema6/6-4-permisos-red.html", titulo: "Permisos Red" },
        { ruta: "tema6/6-5-cortafuegos.html", titulo: "Cortafuegos" },
        { ruta: "tema6/6-6-gestion-dominios.html", titulo: "Gestión Dominios" }
    ]
};

/**
 * Obtiene la información de navegación para la página actual
 * @param {string} rutaActual - La ruta del archivo actual (ej: "tema1/1-2-estructura-componentes.html")
 * @returns {object|null} Objeto con: tema, indice, actual, anterior, siguiente, total, numeroPagina
 */
function obtenerNavegacion(rutaActual) {
    // Buscar en qué tema está la página actual
    for (const [tema, paginas] of Object.entries(estructuraNavegacion)) {
        const indice = paginas.findIndex(p => p.ruta === rutaActual);

        if (indice !== -1) {
            return {
                tema: tema,
                indice: indice,
                actual: paginas[indice],
                anterior: indice > 0 ? paginas[indice - 1] : null,
                siguiente: indice < paginas.length - 1 ? paginas[indice + 1] : null,
                total: paginas.length,
                numeroPagina: indice + 1
            };
        }
    }

    return null;
}

/**
 * Obtiene el nombre legible del tema
 * @param {string} temaId - ID del tema (ej: "tema1")
 * @returns {string} Nombre del tema
 */
function obtenerNombreTema(temaId) {
    const nombres = {
        tema1: "Explotación de sistemas microinformáticos",
        tema2: "Sistemas operativos",
        tema3: "Gestión de la información",
        tema4: "Configuración de sistemas operativos",
        tema5: "Conexión de sistemas en red",
        tema6: "Recursos en red"
    };
    return nombres[temaId] || "Tema desconocido";
}

/**
 * Obtiene el número del tema (para mostrar en el breadcrumb)
 * @param {string} temaId - ID del tema (ej: "tema1")
 * @returns {number} Número del tema
 */
function obtenerNumeroTema(temaId) {
    const numeros = {
        tema1: 1,
        tema2: 2,
        tema3: 3,
        tema4: 4,
        tema5: 5,
        tema6: 6
    };
    return numeros[temaId] || 0;
}