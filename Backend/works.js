let works = [];


async function fetchData() {
  const worksUrl = 'http://localhost:5678/api/works';

  try {
    const response = await fetch(worksUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    works = await response.json();
    console.log(works);
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

  for (let i = 0; i < categories.length; i++) {
    const buttonCat = categories[i];

    const buttonCategories = document.createElement("button");
    buttonCategories.classList.add("filter-button");
    
    buttonCategories.innerText = buttonCat.name;
    buttonCategories.setAttribute("data-category-id", buttonCat.id);
    categoriesGallery.appendChild(buttonCategories);
  };
  console.log('Boutons créés:', categories); 

  const divDuneDiv = document.createElement("div");

  const gallery = document.querySelector('.gallery');
  const parentGallery = gallery.parentElement;
  
  divDuneDiv.appendChild(categoriesGallery);
  parentGallery.insertBefore(divDuneDiv, gallery)
  
  const boutonsFiltre = document.querySelectorAll('.filter-button');

  console.log('boutonsFiltre:', boutonsFiltre)

  boutonsFiltre.forEach((bouton) => {
    console.log('Bouton trouvé:', bouton);
    bouton.addEventListener('click', () => {
      const categorieIdFiltre = parseInt(bouton.getAttribute('data-category-id'), 10);
      console.log('categorieIdFiltre:', categorieIdFiltre);
      filtrerParCategorie(categorieIdFiltre);
    });
    console.log('bouton', bouton)
  });

  
}    

function filtrerParCategorie(categorieId) {
  console.log('Filtrer par catégorie appelé avec ID:', categorieId);
  const travauxFiltres = works.filter((travail) => {
    console.log('travail:', travail);
    console.log('travail.categorieId:', travail.categorieId);
    return categorieId === 0 || travail.categoryId === categorieId;
  });
  console.log('travauxFiltres',travauxFiltres);
  createWorks(travauxFiltres);

}


function createWorks(filteredWorks) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

    (filteredWorks || works).forEach((travail) => {
      const figureGallery = document.createElement("figure");
      const imgGallery = document.createElement("img");
      
      imgGallery.src = travail.imageUrl;
      const figCaptionGallery = document.createElement("figcaption");
      figCaptionGallery.innerText = travail.title;
  
      gallery.appendChild(figureGallery);
      figureGallery.appendChild(imgGallery);
      figureGallery.appendChild(figCaptionGallery);
    });
  }

  const token = localStorage.getItem('token');
  console.log('Token actuel:', token);
