


function openModal() {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.modal').classList.add('modal--open');
}

function closeModal() {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.modal').classList.remove('modal--open');
  document.querySelector('.modal-two').classList.remove('modal--open-two');
}

document.querySelector('.overlay').addEventListener('click', function (event) {
  if (event.target === document.querySelector('.overlay')) {
    closeModal();
  }
});



function openModalTwo() {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.modal-two').classList.add('modal--open-two');
  document.querySelector('.modal').classList.remove('modal--open');
}

function returnModal() {
  document.querySelector('.modal-two').classList.remove('modal--open-two');
  document.querySelector('.modal').classList.remove('modal--open');
  document.querySelector('.modal').classList.add('modal--open');
}


const token = localStorage.getItem('token');



