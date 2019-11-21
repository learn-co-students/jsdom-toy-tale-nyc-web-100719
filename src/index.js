let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  //Fetch API
function fetchApi () {
  fetch("http://localhost:3000/toys").then(function(response) {
   return response.json();
 })
 .then(function(json) {
   parseData(json)
 });
}
fetchApi();

let toyCollection = document.getElementById("toy-collection")

function parseData(data){
 data.forEach(toy => {addNewToy(toy)
   
 });
}

function persistToy(toy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accepts: "application/json"
      
    },
    body: JSON.stringify(toy)
  })

}

function addNewToy(toy){

 let div = document.createElement("div")

  div.className = "card"
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} </p>
  <button class="like-btn" data-purpose="like" data-id=${toy.id}>Like <3</button>
  `
  toyCollection.append(div)
}

let formToy = document.getElementsByClassName("add-toy-form")
  console.log(formToy)
  formToy[0].addEventListener("submit", function(e) {
    
    e.preventDefault();
    newToy = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }
    addNewToy(newToy)
    persistToy(newToy)
})

let likeBtn = document.getElementsByClassName("like-btn")

console.log(likeBtn)

function increaseLikes(e){
  let parent = e.target.parentNode
}

function persistLike(id, like, e){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:{
    "Content-Type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({likes: like})
  })

}

document.addEventListener("click", function(e){
  if (e.target.dataset.purpose === "like"){
    let parent = e.target.parentNode
    let p = parent.querySelector("p")
    let newLike = parseInt(p.innerText) + 1
    console.log(e.target.parentNode)
    e.target.dataset.likes = newLike
    p.innerText = newLike
    let id = e.target.dataset.id
    console.log(id)
    persistLike(id, newLike, e)
  }
  
      
})




})

