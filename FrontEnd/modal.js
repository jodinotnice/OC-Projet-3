function openModal() {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.modal').classList.add('modal--open');
}

function closeModal() {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.modal').classList.remove('modal--open');
}

document.querySelector('.overlay').addEventListener('click', function (event) {
  if (event.target === document.querySelector('.overlay')) {
    closeModal();
  }
});

const token = localStorage.getItem('token');

