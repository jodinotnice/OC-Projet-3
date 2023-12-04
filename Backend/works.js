

let works = [];

const token = localStorage.getItem('token');
console.log('Token actuel:', token);

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

    console.log(token);

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
    });
    
  });
}    



function filtrerParCategorie(categorieId) {
  console.log('Filtrer par catégorie appelé avec ID:', categorieId);
  const travauxFiltres = works.filter((travail) => {
    return categorieId === 0 || travail.categoryId === categorieId;
  });
  
  createWorks(travauxFiltres);

}


function createWorks(filteredWorks) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

    const modalForm = document.createElement("div");
    modalForm.classList.add("modalForm");
    const divSup = document.createElement("div");


    (filteredWorks || works).forEach((travail) => {
      const figureGallery = document.createElement("figure");
      const imgGallery = document.createElement("img");
      const imgModal = document.createElement("img");
      const divModal = document.createElement("div");
      divModal.classList.add("divModal")
      const modal = document.querySelector('.modal');
      const trashIcon =  document.createElement("i");
      trashIcon.classList.add('fa-solid', 'fa-trash');
      
      

      imgGallery.src = travail.imageUrl;
      imgModal.src = travail.imageUrl
      const figCaptionGallery = document.createElement("figcaption");
      figCaptionGallery.innerText = travail.title;



      gallery.appendChild(figureGallery);
      figureGallery.appendChild(imgGallery);
      figureGallery.appendChild(figCaptionGallery);
      
      
      divModal.appendChild(imgModal);
      modalForm.appendChild(trashIcon);
      modalForm.appendChild(divModal);
      divSup.appendChild(modalForm);
      modal.appendChild(divSup);
    });
  }

  
  if (token !== null) {
    console.log("display: none;");
    document.querySelector('.flex-align button').style.display = 'block';
    document.querySelector('.mode-edition').style.display ='block';
    const login = document.querySelector('#loginButton');
    login.innerText = "Logout";
  } 
