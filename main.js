function getNumRandom(min,max) {
    return Math.round(Math.random()*(max-min)+parseInt(min));
}
function Agregar(caja,n,textoCuadrados,section){
    const fragment = document.createDocumentFragment();
    for (let i = 0; i<n;i++) {
        let clone = caja.cloneNode(true);
        clone.children[1].children[0].textContent = i+1;
        clone.addEventListener("click",(e)=>{
           clone.children[0].style.display = "block"
           clone.children[1].style.opacity = 0
           clone.children[1].style.position = "absolute"
        })
        fragment.appendChild(clone);
    }
    section.appendChild(fragment);
    textoCuadrados.textContent = n;
}
function Aleatorio(correctasValue,n) {
    
    let historialAleatorios = [];
    let random
    for (let i = 0; i<n; i++) {
        let cajita = section.children[i];
        cajita.children[0].style.backgroundImage = "url('img/274c.png')";
        cajita.children[0].style.display = "none";
        cajita.children[1].style.display = "flex";
        cajita.children[1].style.opacity = 1;
    }
    for (let i = 0; i<correctasValue; i++) {
        random = getNumRandom(1,n)
        while(historialAleatorios.includes(random) == true) {
            random = getNumRandom(1,correctasValue)
        }
        historialAleatorios.push(random)
        section.children[random-1].children[0].style.backgroundImage= "url('img/1f3c5.png')";
    }

}
function Mostrar(n){
    for (let i = 0; i<n; i++) {
        let cajita = section.children[i];
        cajita.children[0].style.display = "block";
        cajita.children[1].style.display = "none";
    }

}
const correctas = document.querySelectorAll("input[type=range]")[0];
const cuadrados = document.querySelectorAll("input[type=range]")[1];
const section = document.querySelector("SECTION");
const textoCuadrados = cuadrados.parentElement.children[2];
const textoCorrectas = correctas.parentElement.children[2];
const caja = section.children[0];
const barajar = document.body.children[1].children[4];
const mostrar = document.body.children[1].children[3];
section.removeChild(section.firstElementChild);
let n = cuadrados.value;
let a = correctas.value;
Agregar(caja,n,textoCuadrados,section)
Aleatorio(correctas.value,n);
cuadrados.addEventListener("mouseup",()=>{
    n = cuadrados.value;
    while (section.firstElementChild != null) {
        section.removeChild(section.firstElementChild);
    }
    Agregar(caja,n,textoCuadrados,section)
    correctas.setAttribute("max",n)
    textoCorrectas.textContent = correctas.value;
    Aleatorio(correctas.value,n);
    if (window.innerWidth >1040 && n<26) {
        section.style.gridTemplateColumns = "repeat(5,1fr)"
    } 
    if (window.innerWidth >1040 && n>=26) {
        section.style.gridTemplateColumns = "repeat(10,1fr)"
    } 
})
correctas.addEventListener("mouseup",()=>{
    a = correctas.value;
    textoCorrectas.textContent = a;
    Aleatorio(correctas.value,n);
})
barajar.addEventListener("click",()=>{
    Aleatorio(correctas.value,n);
})
mostrar.addEventListener("click",()=>{
    Mostrar(n);
})


