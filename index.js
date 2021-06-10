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
    items: 6,
    slideBy: 'page',
    autoplay: false,
    //controls: false, 
    controlsContainer: secundaryControls
});

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}
myButtonUp.addEventListener('click', function() {
   topFunction();     
console.log("gg")
});

async function fetchData() {
    
    const response = await fetch('http://localhost:3000/cards/');
    const data = await response.json();
    console.log(data);
    
    var tarjetaDom = "";
    data.forEach(jsonInteration => {
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
        `;
    });
    cardsCatalog.innerHTML = tarjetaDom;
    console.log(tarjetaDom)
}     
console.log(cardsCatalog);