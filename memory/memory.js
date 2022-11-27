function getNumRandom(min,max) {
    return Math.round(Math.random()*(max-min)+parseInt(min));
}
function Mostrar(n){
    if (segundos.value != 0 || desdeMostrar == true) {
        for (let i = 0; i<n; i++) {
            let cajita = section.children[i];
            cajita.children[0].style.display = "block";
            cajita.children[1].style.display = "none";
        }
        contador = 0;
        desdeMostrar = false;
    }
}
function Ocultar(n){
    for (let i = 0; i<n; i++) {
        let cajita = section.children[i];
        cajita.children[0].style.display = "none";
        cajita.children[1].style.display = "flex";
    }
    contador = 0;
}
function Agregar(caja,n,textoCuadrados,section){
    const fragment = document.createDocumentFragment();
    for (let i = 0; i<n;i++) {
        let clone = caja.cloneNode(true);
        clone.children[1].children[0].textContent = i+1;
        clone.addEventListener("click",(e)=>{
            if (seguir == true && seleccionada != clone && puedeJugar == true){
                clone.children[0].style.display = "block"
                clone.children[1].style.opacity = 0
                clone.children[1].style.position = "absolute"
                 if (primera == false) {
                     primera = true;
                     seleccionada = clone;
                 } else {
                    seguir =false;
                    ganador.style.display = "flex"
                     setTimeout(()=>{
                         seleccionada.children[0].style.display = "none"
                         clone.children[0].style.display = "none"
                         clone.children[1].style.opacity = 1
                         seleccionada.children[1].style.opacity = 1
                         primera = false;
                        seguir= true;
                        let selecionadaEstilo = window.getComputedStyle(seleccionada.children[0]);
                        let cloneEstilo = window.getComputedStyle(clone.children[0]);
                        if (selecionadaEstilo.getPropertyValue('background-image') == cloneEstilo.getPropertyValue('background-image')) {
                            contador++;
                            clone.children[1].style.opacity = 0
                            seleccionada.children[1].style.opacity = 0
                            clone.replaceWith(clone.cloneNode(true));
                            seleccionada.replaceWith(seleccionada.cloneNode(true));
                            if (contador == n/2) {
                                windowClick = true;
                                ganador.style.display = "flex"
                                ganador.style.marginTop = "-15vh";
                                ganador.style.top = "50%";
                                contador = 0;
                            }
                        } else {
                            if (vidaTexto.textContent != "∞") {
                                vidasValor--;
                                vidaTexto.textContent = vidasValor;
                            }
                            if (vidasValor == 0) {
                                windowClick = true;
                                perdedor.style.display = "flex"
                                perdedor.style.marginTop = "-15vh";
                                perdedor.style.top = "50%";
                                contador = 0;
                                while (section.firstElementChild != null) {
                                    section.removeChild(section.firstElementChild);
                                }
                                Agregar(caja,n,textoCuadrados,section)
                                Memory(n,caja,section);
                                a++;
                                Arrancar(n);
                            }
                        }
                        seleccionada = null;
                        
                     },750)
                     
              
                 }
            }

        })
        fragment.appendChild(clone);
    }
    section.appendChild(fragment);
    textoCuadrados.textContent = n;
}
function Memory(n,caja,section) {
    let historialImagenes = [];
    let random;
    let a;
    for (let i =0; i<n; i++) {
        section.children[i].children[0].style.display = "none";
        section.children[i].children[1].style.display = "flex";
        section.children[i].children[1].style.opacity = 1;
        do {
            a = 0;
            random = getNumRandom(1,n/2)
            for (let h = 0; h< historialImagenes.length;h++) {
                if (historialImagenes[h] == random) {
                    a++;
                }
            }
        } while(a ==2);
        section.children[i].children[0].style.backgroundImage = `url("imagenes/${random}.png")`;
        historialImagenes.push(random);
    }
}


function Arrancar(n) {
    puedeJugar = false;
    Mostrar(n);
    let f = a;
    vidaTexto.textContent = vidas.value;
    if (vidaTexto.textContent == 50) {
        vidaTexto.textContent = "∞"
    }
    vidasValor = vidas.value;
    const Arrancara = setTimeout(()=>{
        if (f == a) {
            Ocultar(n);
            puedeJugar = true;
        }
    },segundos.value*1000)
}
let desdeMostrar = false;
let a = 0;
let windowClick = false;
let contador = 0;
let seguir = true;
let primera = false;
let seleccionada;
const segundos = document.querySelectorAll("input[type=range]")[0];
const vidas = document.querySelectorAll("input[type=range]")[1];
const cuadrados = document.querySelectorAll("input[type=range]")[2];
const section = document.querySelector("SECTION");
const textoCuadrados = cuadrados.parentElement.children[2];
const textoVidas = vidas.parentElement.children[2];
const textoSegundos = segundos.parentElement.children[2];
const caja = section.children[0];
const barajar = document.body.children[2].children[5];
const mostrar = document.body.children[2].children[4];
const vidaTexto = document.getElementsByClassName("vidas")[0].children[1];
const ganador = document.getElementsByClassName("ganador")[0];
const perdedor = document.getElementsByClassName("perdedor")[0];
section.removeChild(section.firstElementChild);
let vidasValor = vidas.value;
let n = cuadrados.value;
let puedeJugar;
Agregar(caja,n,textoCuadrados,section)
Memory(n,caja,section);
a++;
Arrancar(n);
section.style.gridTemplateColumns = "repeat(5,1fr)"
cuadrados.addEventListener("mouseup",()=>{
    n = cuadrados.value;
    while (section.firstElementChild != null) {
        section.removeChild(section.firstElementChild);
    }
    Agregar(caja,n,textoCuadrados,section)
    if (window.innerWidth >1040 && n<26) {
        section.style.gridTemplateColumns = "repeat(5,1fr)"
    } 
    if (window.innerWidth >1040 && n>=26) {
        section.style.gridTemplateColumns = "repeat(10,1fr)"
    } 
    textoVidas.textContent = vidas.value;
    if (vidas.value == 50) {
        textoVidas.textContent = "∞"
    }
    Memory(n,caja,section)
    a++;
    Arrancar(n);
})
segundos.addEventListener("mouseup",()=>{
    textoSegundos.textContent = segundos.value;
})
vidas.addEventListener("mouseup",()=>{
    a = vidas.value;
    textoVidas.textContent = a;
    if (vidas.value == 50) {
        textoVidas.textContent = "∞"
    }
})
barajar.addEventListener("click",()=>{
    ganador.style.marginTop = "-30vh";
    ganador.style.top = "0";
    ganador.style.display = "none"
    while (section.firstElementChild != null) {
        section.removeChild(section.firstElementChild);
    }
    Agregar(caja,n,textoCuadrados,section)
    Memory(n,caja,section);
    a++;
    Arrancar(n);
})
mostrar.addEventListener("click",()=>{
    desdeMostrar = true;
    Mostrar(n);
    puedeJugar = false;
})
window.addEventListener("click",()=> {
    if (windowClick == true) {
        ganador.style.marginTop = "-30vh";
        ganador.style.top = "0";
        ganador.style.display = "none"
        perdedor.style.marginTop = "-30vh";
        perdedor.style.top = "0";
        perdedor.style.display = "none"
        windowClick = false
    }
})