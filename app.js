let express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
const portglobal=8000;
var animalRouter = express.Router();
const petType = ['cats', 'dogs', 'rodens'];
const petlist = require('./pets.js');
const { sep } = require('path');
const head_html=( 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" type="text/css" href="/style.css" />
    <title>Adopt A Pet</title>
  </head>
  <body>`
  );
const bottom_html =(
  `</body>
   </html>`
);

app.get('/', (req, res) => {
  res.send(
    `${head_html}<div class="container text-center mt-5">
      <h1>Adopt A Pet</h1>
      <h3 class="m-5">Find a pet, which you will love</h3>
      <a href="/animals/"><button class="btn btn-info">Start</button></a></div>
     ${bottom_html}
    `
  );
});
app.get('/animals',(req, res) => {  
     res.send(
      `${head_html}<div class="container text-center mt-5">
      <h1>Adopt A Pet</h1>
      <h3 class="m-5">Browse through the links below to find your new furry friend</h3>
      <div><a href="/animals/dogs"><button class="btn btn-info">Dogs</button></a></div>
      <div><a href="/animals/cats"><button class="btn btn-info">Cats</button></a></div>
      <div><a href="/animals/rabbits"><button class="btn btn-info">Rabbits</button></a></div>
      </div>${bottom_html}
      ` )
    // res.sendFile(path.join(__dirname, 'index.html'));
});

let displaytypes=((pettype,e)=>{
  const string=("/animals/"+pettype+"/"+e.name)
  return(`<li><a href='#'>
  <button class="btn btn-info">${e.name}
  </button>
  </a></li>`);
});
const displayId = ((obj) => {
  return(
  `${head_html}<div class="container text-center mt-5">
      <h1>${obj.name}</h1>
      <img src=${obj.url} />
      <p>${obj.description}</p>
      <ul>
          <li>Breed: ${obj.breed}</li>
          <li>Age: ${obj.age}</li>
      </ul>
  </div>${bottom_html}`
  );
});

app.get('/animals/:pet_type',(req, res)=>{
    const petType = req.params.pet_type;
    const obj = petlist[petType];
    res.send(
      `   ${head_html}<div class="container text-center mt-5">
          <h1>Chose ${petType} from the list</h1>
             ${obj.map(obj=>
             `<div>
                <a href="/animals/${petType}/${obj.name}">
                  <button class="btn btn-info">${obj.name}</button>
                </a>
              </div>
              `
              )}
          </div>${bottom_html}
     `);
  
});

app.get('/animals/:pet_type/:name', (req, res) => {
    
    const petType = req.params.pet_type;
    const name = req.params.name;
    const animalObject = petlist[petType];
    const specificPet =  animalObject.find(i => i.name === name);
    // animalObject[Number(req.params.id_type)];
    res.send(
      // displayId(specificPet)
      displayId(specificPet)
      );
});

let server = app.listen(portglobal, function () {
    let host = server.address().address
    let port = server.address().port
    
   console.log("Example app listening at http://%s:%s", host, port)
  })


 
  
  
  