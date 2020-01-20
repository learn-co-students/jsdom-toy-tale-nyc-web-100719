// let addToy = false
// let toyCollectionDiv = document.querySelector("#toy-collection")


// // create toy card
// function toyCard(toy){
//   let toyCardDiv = document.createElement("Div")
//   toyCardDiv.innerHTML =
//   `
//     <h2>${toy.name}</h2>
//     <img src=${toy.url} class="toy-avatar" />
//     <p>4 ${toy.likes} </p>
//     <button class="like-btn">Like <3</button>
//   ` 
//   toyCollectionDiv.append(toyCardDiv);
// }


// // fetch all toys
// function fetchToys(){
//   fetch("http://localhost:3000/toys")
//     .then(function(response){
//       return response.json()
//     })
//     .then(function(data){
//       data.forEach(function(toy){
//         toyCard(toy)
//       })
//     })
// }


// // save toy to database
// function persistToy(toy){
//   fetch("http://localhost:3000/toys", 
//   {
//     method: "POST",
//     headers: 
//       {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//     body: JSON.stringify(toy)
//   }
//   )
// }


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
// toyForm.addEventListener("submit", function(e){
//   e.preventDefault()
//   let toy = {
//     name: e.target.name.value,
//     image: e.target.image.value,
//     likes: 0
//   }
//   persistToy(toy)
//   toyCard(toy)
// })
// fetchToys()
// })











// -----------------------------------------

//finding our toyCollectionDiv as soon as possible
let addToy = false
// let toyCollectionDiv = document.getElementById("toy-collection")

//here we are creating a toy card (HTML layout for each card)
function createToyCard(toy){
  console.log("Reached createToyCard");
  console.log(toy);
  //creating a currently empty div that will later contain all of our toy information in a card
  let toyCard = document.createElement("div");
  //this is the HTML layout for our card
  toyCard.innerHTML =
  `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p>${toy.likes} likes</p>
  <button class="like-button">Like <3</button>
  `;
  //we take our new filled out toyCard and append, or throw it onto the end, of our
  //master toy list HTML element
  let toyCollectionDiv = document.getElementById("toy-collection")
  toyCollectionDiv.appendChild(toyCard);
}
//will make a get request to our API and get a list of toys back
function getToys(){
  //fetch request to the URL where our database can be found
  //remember RESTful routes
  fetch("http://localhost:3000/toys")
  .then(function(response){
    //.then will only run when previous promise is resolved AKA when we finally get a
    //response from our API
    //we get a promise back as the answer to our fetch question
    //.json will take response and reformat it into more readable, JSON format that we can work with
    return response.json()
  })
  //second promise
  //"data" is our JSON
  //time to do something with it!
  .then(function(data){
    //iterating through each element (toy) in our "data" array
    console.log(data);
    data.forEach(function(toy){
      //creating an HTML representation of that toy
      createToyCard(toy);
    });
  })
}
// save toy into database
function persistToy(toy){
  fetch("http://localhost:3000/toys",
  //thing below is our second argument, all contained in a single object
  {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers:
    {
      'Content-Type': 'application/json',
      accept: "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //JSON.stringify takes toy object and turns it into JSON format (strings)
    body: JSON.stringify(toy) // body data type must match "Content-Type" header
  })
}
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  //below event listener toggles between showing and hiding form
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  //adds event listener onto entire form (event delegation)
  toyForm.addEventListener("submit", function(e){
    //preventing default behavior
    //default behavior of a form is to submit, which involves refreshing
    //we don't want that
    e.preventDefault();
    //now it's time to make a toy
    //grab every value out of corresponding form field
    //e is event
    //likes should start out at 0
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    persistToy(toy)
    createToyCard(toy)
  })
  getToys();



  // // like a toy
  // function likeToy(id, likes){
  //   fetch(`http://localhost:3000/toys/${id}`,
  //   {
  //     method: "PATCH",
  //     headers: 
  //       {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //     body: JSON.stringify({likes: likes
  //     })
  //   })
  //   .then(function(response){
  //     return response.json()
  //   })
  // }

})

