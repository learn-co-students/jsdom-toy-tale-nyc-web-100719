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
  .then(toyData => renderToys(toyData))

    renderToys = (toyData) => {
      let toyCollection = document.getElementById("toy-collection")

      toyData.forEach(toy => { 
        let toyDiv = document.createElement("div") 
        toyDiv.className = "card"
        toyDiv.innerHTML = `
          <h2>${toy.name}</h2> 
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        `
        toyCollection.appendChild(toyDiv)
      })
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



    postNewToy = () => {


    }

})
