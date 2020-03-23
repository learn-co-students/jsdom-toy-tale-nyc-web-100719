let addToy = false

// document.addEventListener("DOMContentLoaded", ()=>{
//   const addBtn = document.querySelector('#new-toy-btn')
//   const toyForm = document.querySelector('.container')
//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })
// })

document.addEventListener("DOMContentLoaded", () => {

  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(toyData => parseToys(toyData))

  parseToys = (toyData) => {
    toyData.forEach(toy => renderToys(toy)
  )}

  renderToys = (toy) => {
    let toyCollection = document.getElementById("toy-collection")

    let toyDiv = document.createElement("div") 
      toyDiv.className = "card"
      toyDiv.innerHTML = `
        <h2>${toy.name}</h2> 
        <img src=${toy.image} class="toy-avatar" />
      `
      
      let p = document.createElement("p")
      p.innerText = `${toy.likes} Likes`

      let likeBtn = document.createElement("button")
      likeBtn.className = "like-btn"
      likeBtn.innerText = "Likes <3"
      likeBtn.setAttribute("id", toy.id) 
      toyDiv.appendChild(p)
      toyDiv.appendChild(likeBtn)

      likeBtn.addEventListener("click", (e) => {
        increaseLikes(e, toy)
      })
  
      toyCollection.appendChild(toyDiv)

  }

  increaseLikes = (e, toy) => {
    console.log(e.target.previousSibling)
    let likesPara = e.target.previousSibling
    likesPara.innerText = ""
    likesPara.innerText = `${toy.likes ++} likes`
  }

    let button = document.getElementById("new-toy-btn")
    let form = document.querySelector(".container")

    button.addEventListener("click", () => {
      addToy = !addToy
      if (addToy){
        form.style.display = "block"
      } else {
        form.style.display = "none"
      }
    })    

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      renderToys({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: "0"
      })
      postNewToy(e.target)
    })

    postNewToy = (toyObject) => {
      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: toyObject.name.value,
          image: toyObject.image.value,
          likes: 0
        })
      })
    }


  


})//end DOM content loaded
