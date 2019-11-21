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

  let toyCollection = document.querySelector("div#toy-collection")
  let toyUl = document.createElement("ul");
  toyUl.id = "toy-ul"
  toyCollection.append(toyUl)

  //create a toy to display
  function createToy(toy){
    // let li = document.createElement("li")
    let div = document.createElement("div")
    div.className = "card"
    // li.append(div)
    toyUl.append(div)
    div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" data-id=${toy.id} data-likes=${toy.likes}>Like <3</button>
      <button class="delete-btn" data-id=${toy.id}> Delete! </button>
    `
  }
  //fetch toys from DB
  function fetchToys(){
    fetch('http://localhost:3000/toys')
      .then(function(resp){
        return resp.json()
      })
      .then(function(json){
        json.forEach(function(toy){
          createToy(toy)
        });
    })
  }
  //call fetchToys function
  fetchToys()

  //createToy and add to DB
  function persistToy(newToy){
    fetch('http://localhost:3000/toys', {method: "POST", 
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(function(resp){
        return resp.json()
      })
  }

  function updateToyLikes(id, likes){
    fetch(`http://localhost:3000/toys/${id}`, {method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({likes: likes})
      })
      .then(function(resp){
        return resp.json()
      })
    }
  
  //create toy object, call createToy and PersistToy functions
  let newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener('submit', function(e){
    let toyName = newToyForm[0].value
    let toyImageUrl = newToyForm[1].value
    let newToy = {
      name: toyName,
      image: toyImageUrl,
      likes: 0
    }
    createToy(newToy)
    persistToy(newToy)
    e.preventDefault()
  })

  //deleteToy Function
  function deleteToy(id){
    fetch(`http://localhost:3000/toys/${id}`, {method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      }
      })
      // .then(function(resp){
      //   return resp.json()
      // })    
  } 
  function increaseLikes(e){
    let toy = e.target.parentNode
    let likes = toy.querySelector("p")
    likes.innerText = `${e.target.dataset.likes} likes`
  }
  //updating likes to Toy
  toyCollection.addEventListener('click', function(e){
    if(e.target.className === "like-btn"){
      e.target.dataset.likes = parseInt(e.target.dataset.likes) + 1
      increaseLikes(e)
      updateToyLikes(e.target.dataset.id, e.target.dataset.likes)
    }
    if(e.target.className === "delete-btn"){
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
      deleteToy()
    }
  })

})
