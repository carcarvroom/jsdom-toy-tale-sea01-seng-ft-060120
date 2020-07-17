let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});


const fetchAllToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => renderToyCards(toy)))
}
fetchAllToys();

const renderToyCards = (toy) => {
  const divContainer = document.querySelector('#toy-collection')
  let toyCard = document.createElement('div')
  toyCard.innerHTML = `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class="toy-avatar" />
    <p id='${toy.name}'> ${toy.likes} Likes </p>
    <button class="like-btn" id='${toy.id}'>Like <3</button>

  </div>
  `
  toyCard.addEventListener('click', (e) => patchIncrementLikes(e, toy))
  divContainer.appendChild(toyCard)
}

let formNewToy = document.querySelector('form')
formNewToy.addEventListener('submit', (e) => postNewToy(e))

const postNewToy = (e) => {
  e.preventDefault()
  let data = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => renderToyCards(json))
}

const patchIncrementLikes = (e, toy) => {

  newLikes = parseInt(toy.likes) + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({likes: newLikes})
  })
  .then(res => res.json())
  .then(json => {
    let p = document.getElementById(`${toy.name}`)
    p.textContent = `${newLikes} Likes`
    const divContainer = document.querySelector('#toy-collection').innerHTML = ''
    fetchAllToys();
  })
}