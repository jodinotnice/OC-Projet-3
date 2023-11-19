
/*export async function getCategories() {
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
*/


/*

function createCategories(categories) {
  categories.forEach((categorie) => {
    
    const categoriesFiltre = categorie;

    
    
    const categoriesGallery = document.querySelector('.gallery');

    const buttonCategories = document.createElement("button");
    buttonCategories.classList.add("filter-button");
    
    const buttonName = document.createElement("p");
    buttonName.innerText = categoriesFiltre.name;

    categoriesGallery.appendChild(buttonCategories);
    buttonCategories.appendChild(buttonName);
  });
}


/*
const reponse = await fetch('http://localhost:5678/api/categories');
const categories = await reponse.json();
*/





/**/









