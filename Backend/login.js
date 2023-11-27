const formLog = document.querySelector(".form-login");

formLog.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(formLog);
  const data = Object.fromEntries(formData);
  
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Reponse du serveur:', data);

  if (data.token) {

    localStorage.setItem('token', data.token);


    window.location.replace('../Frontend/index.html')
  } else {
    
  
    const formLoginClass = document.querySelector('.form-login');
    const erreurText = document.createElement("p");
    erreurText.classList.add("error-message");


    erreurText.innerText = "L'email ou le mot de passe saisie est incorrect.";

    formLoginClass.appendChild(erreurText);
   

    console.error(data.message);
  }
    })
    .catch(error => console.error("Erreur lors de la requête:", error));
});

const token = localStorage.getItem('token');

console.log('Token actuel:', token);


