let works = [];

const token = localStorage.getItem('token');



async function fetchData() {
  const worksUrl = 'http://localhost:5678/api/works';

  try {
    const response = await fetch(worksUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    works = await response.json();
    
    createWorks(works);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  await fetchData();
  getCategories();

  const form = document.getElementById("myForm");
  const photoInput = document.getElementById("inpFile");
  const titleInput = document.getElementById("inputTitle");
  const selectCategories = document.getElementById("selectCategories");
  const submitButton = document.getElementById('submitButton');
  const selectedImage = document.getElementById("selectedImage");
  const icon = document.querySelector('.fa-image');
  const modalTwo = document.querySelector('.modal-two');
  const erreurText = document.createElement("p");
  erreurText.classList.add("error-message");

  photoInput.addEventListener('input', updateButtonColor);
  titleInput.addEventListener('input', updateButtonColor);
  selectCategories.addEventListener('change', updateButtonColor);

  photoInput.addEventListener('change', () => {
    
    if (photoInput.files && photoInput.files[0]) {
      const reader = new FileReader();
      icon.style.display = "none";
      document.querySelector('.buttonAddPhoto').style.display = "none";
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };

      reader.readAsDataURL(photoInput.files[0]);
    }
  });
  function updateButtonColor() {
    
    if (photoInput.files[0] && titleInput.value && selectCategories.value) {
      submitButton.style.backgroundColor = '#1D6154'; 
    } else {
      submitBtn.style.backgroundColor = '';
    }
  }
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const endPoint = "http://localhost:5678/api/works";
    const formData = new FormData();


    formData.append("image", photoInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", selectCategories.value);

    console.log(titleInput);
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      

      if (response.ok) {
        console.log('Photo envoyée avec succès');

        await fetchData();
        createWorks(works);
      } else {
        console.error('Échec de l\'envoi de la photo');

        
    
    
        erreurText.innerText = "Champs incomplets";
    
        modalTwo.appendChild(erreurText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
    console.log(selectCategories.value)
  });
  
});

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



function filtrerParCategorie(categorieId) {
  console.log('Filtrer par catégorie appelé avec ID:', categorieId);
  const travauxFiltres = works.filter((travail) => {
    return categorieId === 0 || travail.categoryId === categorieId;
  });
  
  console.log(travauxFiltres);
  createWorks(travauxFiltres);


}


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
  
    
    (filteredWorks).forEach((travail) => {
      const figureGallery = document.createElement("figure");
      const imgGallery = document.createElement("img");
      const imgModal = document.createElement("img");
      const divModal = document.createElement("div");
      divModal.classList.add("divModal")
      const modal = document.querySelector('.modal');
      const trashIcon =  document.createElement("button");
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
      
      

      fetch(`http://localhost:5678/api/works/${travail.id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
      })
      .then((resData) => {
        return resData.json();
        
      })
      .then ((data) => {
        console.log(data);
        console.log(response.status);
        
      })
      .catch (() => {
        
      })

     })
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


  

