/*import { getCategories } from "./categories.js";*/
/*
let works = [];

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


document.addEventListener('DOMContentLoaded', fetchData);

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


getCategories();
createWorks();

function createCategories(categories) {
  const categoriesGallery = document.createElement("div");
  
  const buttonTous = categories;
  console.log(buttonTous)

  const buttonCategoriesTous = document.createElement("button");
  buttonCategoriesTous.classList.add("filter-button");

  buttonCategoriesTous.innerText = "Tous";
  buttonCategoriesTous.setAttribute("data-category-id", buttonTous.id);
  categoriesGallery.appendChild(buttonCategoriesTous);
  for (let i = 0; i < categories.length; i++) {

    const buttonCat = categories[i];

    console.log(buttonCat);

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
      const categorieIdFiltre = parseInt(bouton.getAttribute('data-attribute-id'), 10);
      filtrerParCategorie(categorieIdFiltre);
    });
  });
}



function createWorks(works) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  
  fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    for (let i = 0; i < works.length; i++) {

      const travaux = works[i]; 
    works.forEach((work) => {
      const travaux = work;
    
      console.log(travaux);
      const gallery = document.querySelector('.gallery');
  
      const figureGallery = document.createElement("figure");
  
      const imgGallery = document.createElement("img");
      imgGallery.src = travaux.imageUrl;
  
      const figCaptionGallery = document.createElement("ficaption");
      figCaptionGallery.innerText = travaux.title;
  
      gallery.appendChild(figureGallery);
  
      figureGallery.appendChild(imgGallery);
      figureGallery.appendChild(figCaptionGallery);
    };
  });
  
}



function filtrerParCategorie(categorieId) {
  const worksFiltres = [];
  for (let i = 0; i < works.length; i ++) {
    if (works[i].categorieId.includes(categorieId)) {
      worksFiltres.push(works[i]);
    }
  }

  
  createWorks(worksFiltres);
  
}


*/