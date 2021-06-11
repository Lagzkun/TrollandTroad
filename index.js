console.log("prueba");
//const tns = require('tiny-slider');
import {tns} from 'tiny-slider/src/tiny-slider';

const selectors = {
    principalSlider: '[data-principal-slider]',
    principalControls: '[data-principal-slider-controls]',
    secundarySlider: '[data-secundary-slider]',
    secundaryControls: '[data-secundary-slider-controls]',
    myButtonUp: '[data-my-button-up]',
    cardsCatalog: '[data-cards]' 
}

const principalSlider = document.querySelector(selectors.principalSlider);
const principalControl = document.querySelector(selectors.principalControls);
const secundarySlider = document.querySelector(selectors.secundarySlider);
const secundaryControls = document.querySelector(selectors.secundaryControls);
const myButtonUp = document.querySelector(selectors.myButtonUp);
const cardsCatalog = document.querySelector(selectors.cardsCatalog);
fetchData()

var slider = tns({
    container: principalSlider,
    items: 1,
    slideBy: 'page',
    autoplay: false,
    //controls: false, 
    controlsContainer: principalControl
});

var sliderBot = tns({
    container: secundarySlider,
    slideBy: 'page',
    autoplay: false,
    //controls: false, 
    controlsContainer: secundaryControls,
    responsive: {
        280: {
            items: 2
          },
          900: {
            items: 6
          }
    }
});

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}
myButtonUp.addEventListener('click', function() {
   topFunction();     
console.log("gg")
});

async function fetchData() { //la palabra async se utiliza para llamar una funcion de forma asincrona y esta se utiliza para funciones de API.
    
    const response = await fetch('http://localhost:3000/cards/'); // la palabra await se utiliza para permitir un tiempo de respuesta de la API.
    const data = await response.json();
    console.log(data);//data es la respuesta del API. 
    
    var tarjetaDom = ""; //se crea una variable vacia la cual va almacenar el contenido renderizado desde la API, esto es debido a que estamos itereando los resultados del API y se muestren en secuencia
    data.forEach(jsonInteration => { // forEach itera el contenido del API(data) en la variable JsonInteration
        tarjetaDom += `
            <div class="card">
                <div>
                    <a href="">
                        <img src="${jsonInteration.imagen}" alt="">
                    </a> 
                </div>
                <div class="card-p">
                    <a href="#">${jsonInteration.titulo}</a>
                </div>
                <div>
                    <span>${jsonInteration.contenido}</span>
                </div>
            </div>
        `;// El += tiene el objetivo de tomar una variable y sumarla a ella misma por cada vez que se itere dentro de un ciclo, asi sea forEach
        // en este caso estamos creando todas las tarjetas una por una asignandole los valores que los traemos de la solicitud API. 
        console.log(tarjetaDom);
    });
    cardsCatalog.innerHTML = tarjetaDom;//aca se inserta dentro de cardscatalog todos los elementos "card" que juntamos dentro de la variable tarjeta DOM
}