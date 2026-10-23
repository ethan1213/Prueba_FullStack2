const formulario = document.querySelector('form');
const resultado = document.getElementById('resultado');
const esRegistro = formulario.id === 'form-registro';

// Cada mensaje aparece debajo del campo correspondiente y resalta el borde en rojo.
function mostrarError(id, mensaje) {
  const errElem = document.getElementById('error-' + id);
  const inputElem = document.getElementById(id);
  if (errElem) {
    errElem.textContent = mensaje;
  }
  if (inputElem) {
    inputElem.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
    if (mensaje) {
      inputElem.classList.add('is-danger');
    } else {
      inputElem.classList.remove('is-danger');
    }
  }
}

formulario.addEventListener('submit', function (evento) {
  // Esta entrega solo valida datos: no los envía a un servidor.
  evento.preventDefault();
  resultado.textContent = '';

  const correo = document.getElementById('correo');
  const clave = document.getElementById('clave');
  correo.value = correo.value.trim();

  mostrarError('correo', '');
  mostrarError('clave', '');

  if (correo.value === '') {
    mostrarError('correo', 'Ingresa tu correo electrónico.');
  } else if (correo.validity.typeMismatch) {
    mostrarError('correo', 'Escribe un correo válido, por ejemplo nombre@correo.cl.');
  }

  if (clave.value.trim() === '') {
    mostrarError('clave', 'Ingresa una contraseña.');
  } else if (esRegistro && clave.value.length < 8) {
    mostrarError('clave', 'La contraseña debe tener al menos ocho caracteres.');
  }

  if (esRegistro) {
    const nombre = document.getElementById('nombre');
    const confirmar = document.getElementById('confirmar');
    mostrarError('nombre', '');
    mostrarError('confirmar', '');

    if (nombre.value.trim().length < 2) {
      mostrarError('nombre', 'Ingresa un nombre de al menos dos caracteres.');
    }

    if (confirmar.value === '') {
      mostrarError('confirmar', 'Repite tu contraseña.');
    } else if (confirmar.value !== clave.value) {
      mostrarError('confirmar', 'Las contraseñas no coinciden.');
    }
  }

  const primerError = formulario.querySelector('[aria-invalid="true"]');
  if (primerError) {
    primerError.focus();
    return;
  }

  resultado.textContent = esRegistro
    ? 'Datos válidos. En esta demostración no se crea una cuenta.'
    : 'Datos válidos. En esta demostración no se inicia una sesión real.';
});

// Al cambiar los datos, quitamos el resultado general y el error del campo editado.
formulario.addEventListener('input', function (evento) {
  resultado.textContent = '';
  if (evento.target && evento.target.id) {
    mostrarError(evento.target.id, '');
  }
});
