///////////////////////////////////////////////////////////////////////////////////

//dark or light mode saving settings
document.getElementById('light-mode').addEventListener('click', function() {
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color=  '#000000';
  localStorage.setItem('theme', 'light');
});

document.getElementById('dark-mode').addEventListener('click', function() {
  document.body.style.backgroundColor = '#0f0f12';
  document.body.style.color=  '#ffffff';
  localStorage.setItem('theme', 'dark');
});

// on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.style.backgroundColor = '#0f0f12';
  document.body.style.color=  '#ffffff';

} else {
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color=  '#000000';

}

//////////////////////////////////////////////////////////////////////
document.getElementById('userInput').addEventListener('focus',()=>{
  document.querySelector('i.fa-solid').style.display = "block"
})
document.getElementById('userInput').addEventListener('blur',()=>{
  document.querySelector('i.fa-solid').style.display = "none"
  if(userInput.value !== ''){
      document.querySelector('i.fa-solid').style.display = "block"
  }
})

document.querySelector('.fa-solid').addEventListener('click',()=>{
  if(userInput.value !==''){
      userInput.value = ''
  }
})

document.getElementById("btn").addEventListener("click", () => {

  //gets what the user puts in the search box
let user = document.getElementById("userInput").value;

// get api
let mealAPI = fetch(
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
);

// fetch data from api then parse it as json and log the meals to console
mealAPI.then((getData)=>{
  return getData.json();
}).then((sendData)=>{
  console.log(sendData)
  let data =''
  sendData.meals.forEach((e, i) => {

    // the ingredients and measurements list for recipes 
      const ingredients = [];
      const measurements = [];
      
      //for loop for the ingredients and mesure 
      for (let j = 1; j <= 15; j++) {
          const ingredient = e[`strIngredient${j}`];
          const measure = e[`strMeasure${j}`];

          if (ingredient && ingredient !== "") {
              ingredients.push(ingredient);
          }

          if (measure && measure !== "") {
              measurements.push(measure);
          }
      }

      //only show how much is needed
      const itemCount = Math.min(ingredients.length, measurements.length);

      data +=`
      <h2 class='text-center text-secondary mt-5'>Food Area: ${e.strArea}</h2>
      <h2 class='text-center text-warning'>Food Name: ${e.strMeal}</h2>
      <div class="row">
      <div class="col-md-4">
          <img src="${e.strMealThumb}" alt="" class='w-100 img'>
      </div>
      <div class="col-md-4">
          <h2>Ingredients:</h2>
          <ul>
              ${ingredients.slice(0, itemCount).map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
      </div>
      <div class="col-md-4">
          <h2>Measurements:</h2>
          <ul>
              ${measurements.slice(0, itemCount).map(measure => `<li>${measure}</li>`).join('')}
          </ul>
      </div>
  </div>
  <div class="col-12">
      <h2>Instructions:</h2>
      <p>${e.strInstructions}</p>
  </div>
  <div class='col-6 offset-3'>
      <h2 class='text-center'>Watch Full Video On <a class='text-danger yt' data-bs-toggle="modal" data-bs-target="#exampleModal${i}"><u>Youtube</u></a></h2>

      <!-- Modal -->
<div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">${e.strMeal}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <iframe src="https://youtube.com/embed/${e.strYoutube.slice(-11,)}" frameborder="0" width="100%" height='300'></iframe>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      
    </div>
  </div>
</div>
</div>
  </div>
      `
      heading.innerHTML = ` <h1 class='text-center text-danger'>Food Category: ${sendData.meals[0].strCategory}</h1>`
      appendData.innerHTML = data
  });
}).catch((error)=>{
  //error messages
  document.querySelector('.find').style.display = 'none';
  document.querySelector('.notfound').innerHTML = "Meal not found...  (•̀⤙•́ )";
  document.querySelector('.try').innerHTML = "Try something else? (o_O) ";
})
});
