const form = document.getElementById('cadastroForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const feedbackMessage = document.getElementById('feedbackMessage');
const downloadLink = document.getElementById('downloadLink');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    const userData = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      senha: senha.value.trim()
    };

    simulateUpload(userData);
  } else {
    showfeedback('Por favor, corrija os erros no formulario.', 'error');
    shakeForm();
  }
});

function simulateUpload(userData) {
  showfeedback('Enviando dados...', 'info');

  setTimeout(() => {
    if (Math.random() < 0.9) {
      showfeedback('Cadastro realizado com sucesso!', 'success');
      createDownloadLink(userData);
      form.reset();
    } else {
      showfeedback('Erro ao cadastrar usuario, tente novamente', 'error');
    }
  }, 1500);
}

function showfeedback(message, type) {
  feedbackMessage.textContent = message;
  feedbackMessage.className = `show ${type}`;

  setTimeout(() => {
    feedbackMessage.className = ''
  }, 5000);
}

function createDownloadLink(userData) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
  const d1AnchorElem = document.createElement('a')
  
  d1AnchorElem.setAttribute("href", dataStr);
  d1AnchorElem.setAttribute("download", "cadastro_usuario.json");
  d1AnchorElem.style.display = 'block';
}

function validateForm() {
  let isValid = true;

  if (!validateNome()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validateSenha()) isValid = false;
  if (!validateConfirmarSenha()) isValid = false;

  return isValid;
}

function validateNome() {
  const nomeValue = nome.value.trim();
  if (nomeValue === '') {
    setError(nome, 'O nome é obrigatorio');
    return false;
  } else if (nomeValue.length < 3) {
    setError(nome, 'O nome deve conter ao menos 3 caracteres');
  } else {
    setSuccess(nome)
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;

  if (emailValue === '') {
    setError(email, 'O Email é obrigatorio');
    return false;
  } else if (!emailRegex.test(emailValue)){
    setError(email, 'Digite um E-mail Valido!');
    return false;
  }else {
    setSuccess(email)
    return true;
  }
}

function validateSenha() {
  const senhaValue = senha.value.trim();

  if (senhaValue === '') {
    setError(senha, 'A senha é obrigatoria');
    return false;
  } else if (senhaValue.length < 6){
    setError(senha, 'A senha deve conter pelo menos 6 caracteres');
    return false;
  }else {
    setSuccess(senha)
    return true;
  }
}

function validateConfirmarSenha() {
  const confirmarSenhaValue = confirmarSenha.value.trim();
  const senhaValue = senha.value.trim();

  if (confirmarSenhaValue === '') {
    setError(confirmarSenha, 'A confirmação de senha é obrigatoria');
    return false;
  } else if (confirmarSenhaValue !== senhaValue){
    setError(confirmarSenha, 'As senhas não coincidem');
    return false;
  }else {
    setSuccess(confirmarSenha)
    return true;
  }
}

function setError(input, message) {
  const formGroup = input.parentElement;
  const errorDisplay = formGroup.querySelector('.error');

  errorDisplay.innerText = message;
  input.classList.add('error');
  input.classList.remove('success');
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  const errorDisplay = formGroup.querySelector('.error');

  errorDisplay.innerText = '';
  input.classList.add('success');
  input.classList.remove('error');
}

function shakeForm() {
  form.classList.add('shake');
  setTimeout(() => {
    form.classList.remove('shake');
  }, 820);
}