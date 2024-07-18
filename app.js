// Obtener el elemento textarea del HTML
let cajaDeResultados = document.getElementById('cajaDeResultados')
let imagenResultado = document.getElementById('imagenResultado');
let imagenEspera = document.getElementById('imagenEspera');
let tituloResultado = document.getElementById('tituloResultado');
let obteniendoInformacion = document.getElementById('obteniendoInformacion');
let parrafoResultado = document.getElementById('parrafoResultado');
let puntosSuspensivos = document.getElementById('puntosSuspensivos');
let textarea = document.getElementById('textoUsuario');
let botonCopiar = document.getElementById('botonCopiar');
let botonEncriptar = document.getElementById('botonEncriptar');
let botonDesencriptar = document.getElementById('botonDesencriptar');
let parrafoencri = document.getElementById('parrafoencri');
let textoUsuario = document.getElementById('textoUsuario');

function cajaDeResultado() {
    // Si el textarea tiene texto va a quitar o poner una imagen, ademas para no danar el responsive se genera un condicional segun el tipo de pantalla
    if (textarea.value.trim() !== '') {
        // Cambiar la imagen
        imagenEspera.style.display = 'none'; 
        imagenResultado.style.display ='none';
        if(document.body.clientWidth > 768){
            imagenEspera.style.display = 'inline-block';
            
        }
        // Cambiar el título
        obteniendoInformacion.style.display='inline-block';
        tituloResultado.style.display = "none";
        // Cambiar el párrafo
        puntosSuspensivos.style.display = ' inline-block';
        parrafoResultado.style.display = 'none'
    } else {
        imagenResultado.style.display ='none';
        imagenEspera.style.display ='none';
        if(document.body.clientWidth > 768){
            imagenResultado.style.display ='inline-block';
            
        }
        obteniendoInformacion.style.display='none';
        tituloResultado.style.display = "inline-block";

        puntosSuspensivos.style.display = 'none';
        parrafoResultado.style.display = 'inline-block'
        botonCopiar.style.display = 'none';
        parrafoencri.style.display = 'none'
    
    }
}
//funcion para cambiar la caja resultado mostranto el texto encriptado o desencriptado y muestra el boton copiar
function ResultadoEncriptadoDesencriptado(palabras) {
    parrafoencri.textContent = palabras.join(' ');
    parrafoencri.style.display = 'inline-block';
    imagenEspera.style.display = 'none';
    obteniendoInformacion.style.display = 'none';
    puntosSuspensivos.style.display = 'none';
    
}   
function copiarTexto (){
    botonCopiar.style.display = "inline-block";
    botonCopiar.addEventListener('click', function () {
        navigator.clipboard.writeText(parrafoencri.textContent)
            .then(() => {
                // Puedes mostrar un mensaje de confirmación al usuario
                alert('¡Texto copiado! El texto sera eliminado.');
                textarea.value = '';
                cajaDeResultado();
            });
        });
}  

// Funcion para dejar la caja de resultados con o sin imagen
function cambioCajaDeResultado() {
    textarea.addEventListener('input', function () {
        cajaDeResultado();
    });
}

// Función para eliminar los acentos 
function quitarAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

cambioCajaDeResultado();

// Evento de clic en el botón "Encriptar"
botonEncriptar.addEventListener('click', function () {
    if (textarea.value.trim() !== '') {
        

    let texto = quitarAcentos(textarea.value.toLowerCase()); // Obtener el texto del textarea, quitar acentos y convertir a minúsculas
    // Dividir el texto en palabras separadas por espacios y caracteres no alfanuméricos
    let palabras = texto.split(/[^a-z]+/);
    // Filtrar palabras vacías
    palabras = palabras.filter(palabra => palabra !== '');

    // Funcion que se hace para el boton encriptar     
    function encriptandoTexto(texto) {
        texto = texto.replace(/e/gi, 'enter');
        texto = texto.replace(/i/gi, 'imes');
        texto = texto.replace(/a/gi, 'ai');
        texto = texto.replace(/o/gi, 'ober');
        texto = texto.replace(/u/gi, 'ufat');
        return texto;
    }

    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = encriptandoTexto(palabras[i]);
        
    }

    ResultadoEncriptadoDesencriptado(palabras);
    copiarTexto();
    }else{
        cajaDeResultado();
    }
    
});
// Evento de clic en el botón "Desencriptar"
botonDesencriptar.addEventListener('click', function () {
    if (textarea.value.trim() !== '') {
        

    let texto = quitarAcentos(textarea.value.toLowerCase()); // Obtener el texto del textarea, quitar acentos y convertir a minúsculas
    // Dividir el texto en palabras separadas por espacios y caracteres no alfanuméricos
    let palabras = texto.split(/[^a-z]+/);
    // Filtrar palabras vacías
    palabras = palabras.filter(palabra => palabra !== '');


    // Funcion que se hace para el boton encriptar     
    function desencriptandoTexto(texto) {
        texto = texto.replace(/enter/gi, 'e');
        texto = texto.replace(/imes/gi, 'i');
        texto = texto.replace(/ai/gi, 'a');
        texto = texto.replace(/ober/gi, 'o');
        texto = texto.replace(/ufat/gi, 'u');
        return texto;
    }

    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = desencriptandoTexto(palabras[i]);
    }
    ResultadoEncriptadoDesencriptado(palabras);
    copiarTexto();
    }else{
        cajaDeResultado();
    }
    
});
