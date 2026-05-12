const preguntas = [
    { texto: "El manejo de inventario incluye la planificación, control y ejecución del almacenamiento de productos de forma rentable.",    respuesta: true, explicacion: "La gestión de inventarios trasciende la tarea operativa de contar cajas, es un proceso estratégico que busca organizar y controlar el flujo de existencias para maximizar recursos y mejorar la situación económica financiera de la entidad. " },
    { texto: "Un almacén moderno es simplemente un lugar para guardar mercancías, sin necesidad de aplicar criterios de rentabilidad.", respuesta: false, explicacion: "Actualmente, el almacén es un eslabón crítico de la cadena logística que debe operar bajo criterios de rentabilidad, ya que cualquier fallo en este punto afecta todos los procesos posteriores y la satisfacción del cliente." },
    { texto: "En el análisis ABC, los artículos de la Clase A representan el mayor valor económico, aunque sean pocos en cantidad física.", respuesta: true, explicacion: "Basado en el principio de Pareto, los artículos Clase A suelen ser el 20% de los ítems pero representan aproximadamente el 80% del valor total del inventario, por lo que requieren un control estricto y revisiones frecuentes. " },
    { texto: "En el sistema de inventario periódico, el recuento físico manual es opcional para conocer el valor de las existencias al cierre del ciclo. ", respuesta: false, explicacion: "En este sistema, el recuento físico manual es la única forma de determinar el valor de las existencias y conciliar los libros contables, lo que exige pausar o detener el movimiento de mercancía. " },
    { texto: "El objetivo fundamental de la NIC 2 es determinar la cantidad de costo que debe reconocerse como activo hasta que se generen los ingresos correspondientes.", respuesta: true, explicacion: " La norma prescribe el tratamiento contable de los inventarios, estableciendo cuánto costo se difiere en el balance,  como activo, antes de ser llevado al estado de resultados como un gasto. " },
    { texto: "El método UEPS/LIFO es el más recomendado por la NIC 2 y las normativas internacionales actuales.", respuesta: false, explicacion: "El método UEPS/LIFO se encuentra restringido por la normativa internacional porque no siempre refleja el flujo real de los costos; la NIC 2 prioriza el uso de PEPS/FIFO o el Promedio Ponderado." },
    { texto: "La Cantidad Económica de Pedido (EOQ) o Modelo de Wilson indica el momento exacto, nivel de stock, en el que se debe realizar una compra.", respuesta: false, explicacion: "El EOQ determina cuánto pedir para minimizar los costos totales de pedido y mantenimiento; el cuándo pedir lo determina el Punto de Reorden (ROP)." },
    { texto: "El Punto de Reorden (ROP) se calcula considerando la demanda promedio durante el tiempo de espera más el stock de seguridad.", respuesta: true, explicacion: "El ROP es el nivel crítico de existencias que dispara la señal de compra para asegurar que el inventario no llegue a cero antes de que el proveedor entregue el nuevo pedido. " },
    { texto: "El Stock de Seguridad (SS) tiene como función principal absorber la incertidumbre de la demanda y los retrasos de los proveedores.", respuesta: true, explicacion: "Actúa como un colchón o reserva de protección para evitar la rotura de stock ante variaciones inesperadas en el consumo de los clientes o impuntualidad en el despacho del proveedor." },
    { texto: "La segregación de funciones en el almacén permite que una sola persona autorice compras, custodie la mercancía y realice los registros contables.", respuesta: false, explicacion: "El control interno prohíbe esta práctica para prevenir fraudes, errores y el robo hormiga. La responsabilidad de autorización, custodia y registro debe estar separada entre diferentes funcionarios." },
    { texto: "¿La segregación de funciones permite que el encargado de la custodia física de los bienes sea la misma persona que realiza los registros en el sistema contable?", respuesta: false, explicacion: "El control interno prohíbe que una sola persona controle la custodia, el registro y la autorización, ya que esta separación es fundamental para prevenir fraudes, errores y el 'robo hormiga'." },
    { texto: "¿El stock de seguridad (SS) debe calcularse analizando obligatoriamente la variabilidad del tiempo de entrega del proveedor y la desviación estándar de la demanda?", respuesta: true, explicacion: "Un cálculo preciso del SS requiere evaluar qué tan inestable es el consumo de los clientes y la falta de puntualidad de los proveedores para evitar niveles de reserva insuficientes o excesivos." },
    { texto: "¿Durante un Protocolo de Verificación Física, es opcional el bloqueo del sistema de inventarios mientras se realiza el recuento manual de las existencias?", respuesta: false, explicacion: "El bloqueo del sistema es un paso obligatorio del protocolo para inhabilitar movimientos de entrada o salida, asegurando que la 'foto' digital coincida fielmente con el sustento tangible en el almacén." },
    { texto: "El método PEPS (Primero en Entrar, Primero en Salir) es imperativo para productos con fecha de vencimiento para evitar la obsolescencia.", respuesta: true, explicacion: "Este método asegura una rotación lógica donde los lotes más antiguos se despachan primero, protegiendo el valor del activo contra el deterioro." },
    { texto: "La normativa NIC 2 permite el uso indistinto de los métodos PEPS, Promedio Ponderado y UEPS (LIFO) para la valoración de activos.", respuesta: false, explicacion: "La NIC 2 restringe el uso del método UEPS (LIFO) porque no siempre refleja el flujo real de los costos, priorizando PEPS o Promedio Ponderado." },
    // Agrega las otras 23 preguntas aquí...
];

let indiceActual = 0;
let puntos = 0;
let datosUsuario = {};
let reloj;

async function irAInstrucciones() {
    const nombreInput = document.getElementById('nombre').value.trim();
    const cedulaInput = document.getElementById('cedula').value.trim();

    if (nombreInput === "" || cedulaInput === "") {
        alert("Por favor, completa tus datos para continuar.");
        return;
    }

    // Feedback visual: deshabilitamos el botón mientras consultamos a la nube
    const btnContinuar = document.querySelector("#registro button");
    btnContinuar.innerText = "Verificando...";
    btnContinuar.disabled = true;

    try {
        // Consultamos a tu URL de Google Apps Script pasando la cédula como parámetro
        const response = await fetch(`${URL_GOOGLE_APPS_SCRIPT}?cedula=${cedulaInput}`);
        const data = await response.json();

        if (data.existe) {
            alert("Usted ya ha realizado esta evaluación. No se permiten múltiples intentos por persona.");
            btnContinuar.innerText = "Continuar";
            btnContinuar.disabled = false;
        } else {
            // Si la cédula no existe en la hoja, guardamos los datos y avanzamos
            datosUsuario.nombre = nombreInput;
            datosUsuario.cedula = cedulaInput;
            
            document.getElementById('registro').style.display = 'none';
            document.getElementById('instrucciones').style.display = 'block';
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Hubo un error al conectar con el servidor. Intenta de nuevo.");
        btnContinuar.innerText = "Continuar";
        btnContinuar.disabled = false;
    }
}


function comenzarCuestionario() {
    // 1. Localizamos los contenedores por su ID
    const pantallaInstrucciones = document.getElementById('instrucciones');
    const pantallaCuestionario = document.getElementById('cuestionario');

    // 2. Verificamos que los elementos existan para evitar errores
    if (pantallaInstrucciones && pantallaCuestionario) {
        // 3. Cambiamos la visibilidad
        pantallaInstrucciones.style.display = 'none';
        pantallaCuestionario.style.display = 'block';

        // 4. Ejecutamos la lógica para mostrar la primera pregunta
        if (typeof mostrarPregunta === "function") {
            mostrarPregunta();
        } else {
            console.error("La función mostrarPregunta no está definida.");
        }
    } else {
        console.error("No se encontraron los IDs 'instrucciones' o 'cuestionario'.");
    }
}

function iniciarReloj() {
    let tiempo = 30;
    const pTimer = document.getElementById('segundos');
    pTimer.classList.remove('urgente');
    clearInterval(reloj);
    reloj = setInterval(() => {
        tiempo--;
        pTimer.innerText = tiempo;
        if(tiempo <= 5) pTimer.classList.add('urgente');
        if(tiempo <= 0) { clearInterval(reloj); evaluarRespuesta(true); }
    }, 1000);
}

function mostrarPregunta() {
    const p = preguntas[indiceActual];
    document.getElementById('contenido-pregunta').innerHTML = `
        <p class="enunciado">${p.texto}</p>
        <div class="opciones-container">
            <div class="opcion-item">
                <input type="radio" name="opt" value="true" id="v">
                <label for="v">Verdadero</label>
            </div>
            <div class="opcion-item">
                <input type="radio" name="opt" value="false" id="f">
                <label for="f">Falso</label>
            </div>
        </div>
        <div id="fb" style="display:none; margin-top:10px;"></div>
    `;
    iniciarReloj();
}

function evaluarRespuesta(porTiempo = false) {
    clearInterval(reloj);
    const opciones = document.getElementsByName('opt');
    let seleccion;
    opciones.forEach(o => { if(o.checked) seleccion = (o.value === 'true'); });

    if(seleccion === undefined && !porTiempo) return alert("Selecciona una opción");

    // Bloqueamos el botón de enviar para procesar la respuesta
    const btnEnviar = document.getElementById('btn-enviar');
    const btnSiguiente = document.getElementById('btn-siguiente');
    if (btnEnviar) btnEnviar.style.display = 'none'; // Ocultamos enviar

    const p = preguntas[indiceActual];
    const fb = document.getElementById('fb');
    fb.style.display = 'block';
    
    if(!porTiempo && seleccion === p.respuesta) {
        puntos++;
        fb.innerHTML = `<span style="color: green; font-weight: bold;">✅ Correcto:</span> ${p.explicacion}`;
    } else {
        fb.innerHTML = `<span style="color: red; font-weight: bold;">❌ Incorrecto:</span> ${(porTiempo ? "¡Tiempo agotado! " : "")} ${p.explicacion}`;
    }

    // En lugar de setTimeout, mostramos el botón de "Siguiente"
    if (btnSiguiente) btnSiguiente.style.display = 'block';
}

function siguientePregunta() {
    const btnEnviar = document.getElementById('btn-enviar');
    const btnSiguiente = document.getElementById('btn-siguiente');

    // Restauramos la visibilidad de los botones para la nueva pregunta
    if (btnEnviar) btnEnviar.style.display = 'block';
    if (btnSiguiente) btnSiguiente.style.display = 'none';

    indiceActual++;

    if(indiceActual < preguntas.length) {
        mostrarPregunta();
    } else {
        finalizar();
    }
}


// 1. Siempre coloca la URL al principio de tu archivo script.js, fuera de cualquier función
const URL_GOOGLE_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbxFt6mwBNQcZx54aCjVe3VuOTWXtWj7k_SNfTAnuSOYKS0nrCE1R-Rpic5_opI6MhVA/exec";

function finalizar() {
    const totalPreguntas = preguntas.length;
    const nota = Math.round((puntos * 20) / totalPreguntas);
    const estatus = nota >= 10 ? "Aprobado" : "Reprobado";

    // 1. Vinculación de elementos del DOM (Document Object Model)
    const displayPuntos = document.getElementById('res-puntos');
    const displayNota = document.getElementById('res-nota');
    const displayEstatus = document.getElementById('res-estatus');
    const displayMensaje = document.getElementById('status-envio');

    // 2. Actualización de la interfaz de usuario
    if (displayPuntos) displayPuntos.innerText = puntos + " de " + totalPreguntas;
    if (displayNota) displayNota.innerText = nota + " / 20";
    
    if (displayEstatus) {
        displayEstatus.innerText = estatus;
        displayEstatus.className = "estatus-box " + (nota >= 10 ? "aprobado-estilo" : "reprobado-estilo");
    }

    // Mostramos resultados
    document.getElementById('cuestionario').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';

     // 4. Inicio del proceso de envío
    enviarAGoogle({
        nombre: datosUsuario.nombre,
        cedula: datosUsuario.cedula,
        puntaje: puntos,
        calificacion: nota,
        estatus: estatus
    });
}

async function enviarAGoogle(datos) {
    const displayMensaje = document.getElementById('status-envio');
    const botonFinal = document.getElementById('btn-finalizar');

    if (displayMensaje) displayMensaje.innerText = "Sincronizando con Google Sheets...";

    try {
        await fetch(URL_GOOGLE_APPS_SCRIPT, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (displayMensaje) {
            displayMensaje.innerText = "✅ Datos guardados correctamente.";
            displayMensaje.style.color = "green";
        }
        
        if (botonFinal) botonFinal.disabled = false;

    } catch (error) {
        if (displayMensaje) {
            displayMensaje.innerText = "❌ Error al sincronizar.";
            displayMensaje.style.color = "red";
        }
        console.error("Error en el envío:", error);
    }
}

function cerrarSesion() {
    // Intentar cerrar la pestaña
    window.close();
    // Si window.close() es bloqueado por el navegador, redirigir a un estado vacío
    setTimeout(() => {
        document.body.innerHTML = "<h1>Sesión finalizada. Puede cerrar esta pestaña.</h1>";
    }, 1000);
}
