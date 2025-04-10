const showInputError = (input, span, settings) => {
  input.classList.add(settings.inputErrorClass);
  span.classList.add(settings.errorClass);
};

const hiddenInputError = (input, span, settings) => {
  input.classList.remove(settings.inputErrorClass);
  span.classList.remove(settings.errorClass);
};

const isValid = (input, settings, span) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(input, span, settings);
  } else {
    hiddenInputError(input, span, settings);
  }
}

// Функция для обновления состояния кнопки отправки
function updateSubmitButton(settings, submitButton, isValid) { 
  if (isValid) {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

function updateInputValidation(settings, form, input) {
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  isValid(input, settings, span);
}

function setFormEventListeners(settings, form) {
  const allInputs = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.submitButtonSelector);
  
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      updateInputValidation(settings, form, input);
      updateSubmitButton(settings, submitButton, form.checkValidity());
    });
  });
}

function clearValidation(form, settings) {
  const allInputs = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.submitButtonSelector);

  allInputs.forEach(input => {
    const span = form.querySelector(`.${input.id}-error`);
    input.setCustomValidity('');
    if (span) {
      span.textContent = '';
    }
    hiddenInputError(input, span, settings);
  });

  // Деактивируем кнопку
  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
}

//функция перебора массива
function enableValidation(settings) {
  const allForms = document.querySelectorAll(settings.formSelector);
  allForms.forEach(form => {
     setFormEventListeners(settings, form);
  });
}

export {setFormEventListeners, clearValidation, enableValidation};