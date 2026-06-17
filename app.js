const selectScreen = document.getElementById("selectScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const playerImg = document.getElementById("playerImg");
const playerName = document.getElementById("playerName");

const petGameImg = document.getElementById("petGameImg");
const gameName = document.getElementById("gameName");

const saludText = document.getElementById("saludText");
const felicidadText = document.getElementById("felicidadText");
const limpiezaText = document.getElementById("limpiezaText");
const energiaText = document.getElementById("energiaText");

const saludBar = document.getElementById("saludBar");
const felicidadBar = document.getElementById("felicidadBar");
const limpiezaBar = document.getElementById("limpiezaBar");
const energiaBar = document.getElementById("energiaBar");

const message = document.getElementById("message");

const alimentarBtn = document.getElementById("alimentar");
const jugarBtn = document.getElementById("jugar");
const dormirBtn = document.getElementById("dormir");
const ducharBtn = document.getElementById("duchar");
const reprenderBtn = document.getElementById("reprender");
const acariciarBtn = document.getElementById("acariciar");


// CLASE TAMAGOTCHI

class Tamagotchi {

    constructor(nombre, img) {

        this.nombre = nombre;
        this.img = img;

        this.salud = this.random();
        this.felicidad = this.random();
        this.limpieza = this.random();
        this.energia = this.random();
    }

    random() {
        return Math.floor(Math.random() * 8) + 3;
    }

    limitar(valor) {
        return Math.max(0, Math.min(10, valor));
    }

    actualizar() {

        saludText.textContent = this.salud;
        felicidadText.textContent = this.felicidad;
        limpiezaText.textContent = this.limpieza;
        energiaText.textContent = this.energia;

        saludBar.style.width = `${this.salud * 10}%`;
        felicidadBar.style.width = `${this.felicidad * 10}%`;
        limpiezaBar.style.width = `${this.limpieza * 10}%`;
        energiaBar.style.width = `${this.energia * 10}%`;

        this.verificarEstado();
    }

    alimentar() {

        this.energia = this.limitar(this.energia + 3);
        this.felicidad = this.limitar(this.felicidad + 2);
        this.limpieza = this.limitar(this.limpieza - 1);

        this.actualizar();
    }

    jugar() {

        this.felicidad = this.limitar(this.felicidad + 2);
        this.energia = this.limitar(this.energia - 2);
        this.limpieza = this.limitar(this.limpieza - 2);

        this.actualizar();
    }

    dormir() {

        this.energia = this.limitar(this.energia + 5);
        this.salud = this.limitar(this.salud + 2);

        this.actualizar();
    }

    duchar() {

        this.salud = this.limitar(this.salud + 3);
        this.limpieza = 10;

        this.actualizar();
    }

    reprender() {

        this.felicidad = this.limitar(this.felicidad - 3);

        this.actualizar();
    }

    acariciar() {

        this.felicidad = this.limitar(this.felicidad + 4);

        this.actualizar();
    }

    disminuir() {

        this.salud = this.limitar(this.salud - 1);
        this.felicidad = this.limitar(this.felicidad - 1);
        this.limpieza = this.limitar(this.limpieza - 1);
        this.energia = this.limitar(this.energia - 1);

        this.actualizar();
    }

    verificarEstado() {

        if (
            this.salud === 0 ||
            this.felicidad === 0 ||
            this.limpieza === 0 ||
            this.energia === 0
        ) {

            message.textContent = "💀 El Tamagotchi ha muerto";

            clearInterval(intervalo);

            eliminarEventos();

            gameOverScreen.classList.remove("hidden");
        }
        else {

            message.textContent = "🐣 Tamagotchi Vivo";
        }
    }
}


//ARRAY DE OBJETOS TAMAGOTCHI


const tamagotchis = [

    new Tamagotchi(
        "Neo",
        "https://cdn-icons-png.flaticon.com/512/3069/3069172.png"
    ),

    new Tamagotchi(
        "Pika",
        "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
    ),

    new Tamagotchi(
        "Momo",
        "https://cdn-icons-png.flaticon.com/512/1998/1998592.png"
    ),

    new Tamagotchi(
        "Luna",
        "https://cdn-icons-png.flaticon.com/512/616/616430.png"
    ),

    new Tamagotchi(
        "Max",
        "https://cdn-icons-png.flaticon.com/512/616/616408.png"
    )
];


// SELECCIÓN DEL TAMAGOTCHI


let index = 0;
let tamagotchi;
let intervalo;

function afficherSelection() {

    playerImg.src = tamagotchis[index].img;
    playerName.textContent = tamagotchis[index].nombre;
}

afficherSelection();

function nextPlayer() {

    index = (index + 1) % tamagotchis.length;

    afficherSelection();
}

function previousPlayer() {

    index--;

    if (index < 0) {
        index = tamagotchis.length - 1;
    }

    afficherSelection();
}



function startGame() {

    selectScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    tamagotchi = tamagotchis[index];

    petGameImg.src = tamagotchi.img;
    gameName.textContent = tamagotchi.nombre;

    tamagotchi.actualizar();

    ajouterEvenements();

    intervalo = setInterval(() => {
        tamagotchi.disminuir();
    }, 5000);
}


// ESCUCHADORES DE EVENTOS


function handleAlimentar() {
    tamagotchi.alimentar();
}

function handleJugar() {
    tamagotchi.jugar();
}

function handleDormir() {
    tamagotchi.dormir();
}

function handleDuchar() {
    tamagotchi.duchar();
}

function handleReprender() {
    tamagotchi.reprender();
}

function handleAcariciar() {
    tamagotchi.acariciar();
}

function ajouterEvenements() {

    alimentarBtn.addEventListener("click", handleAlimentar);
    jugarBtn.addEventListener("click", handleJugar);
    dormirBtn.addEventListener("click", handleDormir);
    ducharBtn.addEventListener("click", handleDuchar);
    reprenderBtn.addEventListener("click", handleReprender);
    acariciarBtn.addEventListener("click", handleAcariciar);
}

function eliminarEventos() {

    alimentarBtn.removeEventListener("click", handleAlimentar);
    jugarBtn.removeEventListener("click", handleJugar);
    dormirBtn.removeEventListener("click", handleDormir);
    ducharBtn.removeEventListener("click", handleDuchar);
    reprenderBtn.removeEventListener("click", handleReprender);
    acariciarBtn.removeEventListener("click", handleAcariciar);
}


function restartGame() {

    clearInterval(intervalo);

    eliminarEventos();

    gameOverScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    selectScreen.classList.remove("hidden");

    index = 0;

    afficherSelection();
}