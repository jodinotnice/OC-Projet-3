// Tableau pour stocker les travaux récupérés
let works = [];

const token = localStorage.getItem('token');

// Fonction pour récupérer les données depuis l'API
async function fetchData() {
  const worksUrl = 'http://localhost:5678/api/works';

  try {
    const response = await fetch(worksUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    works = await response.json();

     // Création des travaux après récupération des données
    createWorks(works);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}


// Exécute la fonction fetchData après le chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
  console.log('LOADED?')
  await fetchData();
  getCategories();

  const form = document.getElementById("myForm");
  const photoInput = document.getElementById("inpFile");
  const titleInput = document.getElementById("inputTitle");
  const selectCategories = document.getElementById("selectCategories");
  const submitButton = document.getElementById('submitButton');
  const icon = document.querySelector('.fa-image');
  const modalTwo = document.querySelector('.modal-two');
  const erreurText = document.createElement("p");
  erreurText.classList.add("error-message");

   // Écouteurs d'événements pour les champs du formulaire
  photoInput.addEventListener('input', () => {
    updateButtonColor();
    updatePreview()
    });

  titleInput.addEventListener('input', updateButtonColor);
  selectCategories.addEventListener('change', updateButtonColor);


  function removePreviewImage() {

    if (selectedImage) {
      selectedImage.parentNode.removeChild(selectedImage);
    }
  }

  function updatePreview() {

      const buttonAdd = document.querySelector('.buttonAddPhoto');
      const paraPhoto = document.querySelector('.p-photo');
      
      if (photoInput.files[0]) {
      buttonAdd.style.display = 'none';
      paraPhoto.style.display = 'none';
      icon.style.display = 'none';
      }
    }

  function addInput() {
      const buttonAdd = document.querySelector('.buttonAddPhoto');
      const paraPhoto = document.querySelector('.p-photo');

      buttonAdd.style.display = 'block';
      paraPhoto.style.display = 'block';
      icon.style.display = 'block';
    }

  function updateButtonColor() {
      const photoInput = document.getElementById("inpFile");
      const buttonAdd = document.querySelector('.buttonAddPhoto');
      const paraPhoto = document.querySelector('.p-photo');
      const icon = document.querySelector('.fa-image');

      

    if (photoInput.files[0] && titleInput.value && selectCategories.value) {
      submitButton.style.backgroundColor = '#1D6154'; 
    } else {
      submitButton.style.backgroundColor = '';
    }
  }

  function resetModalInputs() {
    titleInput.value = '';
    selectCategories.value = '';
    photoInput.value = '';  
    submitButton.style.backgroundColor = '';
  }
  

   // Écouteur d'événement pour le formulaire
  form.addEventListener('submit',  (event) => {
    event.preventDefault();

    // Vérifie si la modal est ouverte avant d'envoyer la requête
    if (document.querySelector('.modal-two').classList.contains('modal--open-two')) {
      
      const endPoint = "http://localhost:5678/api/works";
    const formData = new FormData();


    formData.append("image", photoInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", selectCategories.value);

    
      fetch(endPoint, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          console.log('Photo envoyée avec succès');

          // Réinitialisation des champs du formulaire et mise à jour de l'affichage
          removePreviewImage();
          resetModalInputs();
          addInput();

          window.alert("Photo ajoutée à la galerie !");

          // Recharge les travaux depuis l'API
          return fetchData();
          
        } else {
          console.error('Échec de l\'envoi de la photo');


          window.alert("Veuillez renseigner tous les champs.")
          
        }

      }).catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
    }

  });
  
});


// Fonction pour récupérer les catégories depuis l'API
async function getCategories() {
  const categoriesUrl = 'http://localhost:5678/api/categories';

  try {
    const response = await fetch(categoriesUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
      createCategories(data);
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


// Fonction pour créer les boutons de filtre par catégorie
function createCategories(categories) {
  const categoriesGallery = document.createElement("div");
  categoriesGallery.classList.add("container");

  const buttonCategoriesTous = document.createElement("button");
  buttonCategoriesTous.classList.add("filter-button");

  buttonCategoriesTous.innerText = "Tous";
  buttonCategoriesTous.setAttribute("data-category-id", 0);
  categoriesGallery.appendChild(buttonCategoriesTous);

  if (token !== null) {
    categoriesGallery.style.display = 'none';
  }

  for (let i = 0; i < categories.length; i++) {
    const buttonCat = categories[i];


    const buttonCategories = document.createElement("button");
    buttonCategories.classList.add("filter-button");
    
    
    buttonCategories.innerText = buttonCat.name;
    buttonCategories.setAttribute("data-category-id", buttonCat.id);
    categoriesGallery.appendChild(buttonCategories);
  };
  

  const divDuneDiv = document.createElement("div");

  const gallery = document.querySelector('.gallery');
  const parentGallery = gallery.parentElement;
  
  divDuneDiv.appendChild(categoriesGallery);
  parentGallery.insertBefore(divDuneDiv, gallery)
  
  
  const boutonsFiltre = document.querySelectorAll('.filter-button');
  
  boutonsFiltre.forEach((bouton) => {
    
    bouton.addEventListener('click', () => {
      const categorieIdFiltre = parseInt(bouton.getAttribute('data-category-id'), 10);
      
      filtrerParCategorie(categorieIdFiltre);

      boutonsFiltre.forEach((btn) => {
        btn.classList.remove('active');
      });
      bouton.classList.add('active');
    });
    
  });

  buttonCategoriesTous.click();
}    


// Fonction pour filtrer les travaux par catégorie
function filtrerParCategorie(categorieId) {
  console.log('Filtrer par catégorie appelé avec ID:', categorieId);
  const travauxFiltres = works.filter((travail) => {
    return categorieId === 0 || travail.categoryId === categorieId;
  });
  
  console.log(travauxFiltres);
  createWorks(travauxFiltres);


}

// Fonction pour créer les travaux dans la galerie
function createWorks(filteredWorks) {
  const gallery = document.querySelector('.gallery');
  const modal = document.querySelector('.modal');
  
  gallery.innerHTML = '';

  const modalBody = document.querySelector('.modal-body');

  modalBody.innerHTML = '';
  
  Array.from(modal.children).forEach((child) => {
    if (!child.classList.contains('modal-close') && !child.classList.contains('modal-header') ) {
      child.remove();
    }
  });

    const modalForm = document.createElement("div");
    modalForm.classList.add("modalForm");
  
    
  filteredWorks.forEach((travail) => {
      const figureGallery = document.createElement("figure");
      const imgGallery = document.createElement("img");
      const imgModal = document.createElement("img");
      const divModal = document.createElement("div");
      divModal.classList.add("divModal")
      const modal = document.querySelector('.modal');
      const trashIcon =  document.createElement("button");
      trashIcon.type = 'button'
      trashIcon.classList.add('fa-solid', 'fa-trash-can');
      
      

      imgGallery.src = travail.imageUrl;
      imgModal.src = travail.imageUrl
      const figCaptionGallery = document.createElement("figcaption");
      figCaptionGallery.innerText = travail.title;
      
      gallery.appendChild(figureGallery);
      figureGallery.appendChild(imgGallery);
      figureGallery.appendChild(figCaptionGallery);
      
      divModal.appendChild(imgModal);
      divModal.appendChild(trashIcon);
      modalBody.appendChild(divModal);
      

     trashIcon.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      
      fetch(`http://localhost:5678/api/works/${travail.id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(() => {
        window.alert("Photo supprimée de galerie !");
        return fetchData();
      })

     });
     
    });
    
  }

  const logoutButton = document.getElementById("loginButton");

  if (token !== null) {
    document.querySelector('.flex-align button').style.display = 'block';
    document.querySelector('.mode-edition').style.display ='block';
    const login = document.querySelector('#loginButton');
    login.innerText = "Logout";
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem("token");
        window.location.reload();
    });
  }

  const flexAlign = document.querySelector('.flex-align');

  if (token) {
    flexAlign.classList.add('extra-space');
  } else {
      flexAlign.classList.remove('extra-space');
  }

  const input = document.querySelector('#inpFile')
  if (input != null) {
    input.addEventListener('change', (event) => {
      // Get the file selected
      const file = event.target.files[0]
      const fileUrl = URL.createObjectURL(file)

      // Create an IMG element in the dom 
      const imgElement = document.createElement('img')
      imgElement.src = fileUrl
      imgElement.id = 'selectedImage'

      // Append the new image tag in the dom
      const container = document.querySelector('.formPhoto')
      container.appendChild(imgElement)
    })
  }


  
  

