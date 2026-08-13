/* =========================================
   ELEMENTOS HTML
========================================= */

const clock =
    document.getElementById("clock");

const date =
    document.getElementById("date");

const backgroundVideo =
    document.getElementById("backgroundVideo");

const videoSource =
    document.getElementById("videoSource");

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const volumeControl =
    document.getElementById("volumeControl");


/* =========================================
   RELOJ
========================================= */

function updateClock() {

    const now = new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}`;


    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    date.textContent =
        now.toLocaleDateString(
            "es-NI",
            options
        );

}


/* Ejecutar inmediatamente */

updateClock();


/* Actualizar cada segundo */

setInterval(
    updateClock,
    1000
);


/* =========================================
   ABRIR CONFIGURACIÓN
========================================= */

settingsButton.addEventListener(
    "click",
    () => {

        settingsPanel.classList.add("open");

    }
);


/* =========================================
   CERRAR CONFIGURACIÓN
========================================= */

closeSettings.addEventListener(
    "click",
    () => {

        settingsPanel.classList.remove("open");

    }
);


/* =========================================
   CAMBIAR FONDO
========================================= */

const backgroundOptions =
    document.querySelectorAll(
        'input[name="background"]'
    );


backgroundOptions.forEach(
    option => {

        option.addEventListener(
            "change",
            () => {

                const file =
                    option.value;


                /*
                    Cambiamos el archivo
                    del video
                */

                videoSource.src =
                    `assets/backgrounds/${file}`;


                /*
                    Cargamos nuevamente
                    el video
                */

                backgroundVideo.load();


                /*
                    Reproducimos
                */

                backgroundVideo.play();


                /*
                    Guardamos la
                    preferencia
                */

                localStorage.setItem(
                    "background",
                    file
                );

            }
        );

    }
);


/* =========================================
   CAMBIAR TEMA
========================================= */

const themeOptions =
    document.querySelectorAll(
        'input[name="theme"]'
    );


themeOptions.forEach(
    option => {

        option.addEventListener(
            "change",
            () => {

                const theme =
                    option.value;


                applyTheme(theme);


                localStorage.setItem(
                    "theme",
                    theme
                );

            }
        );

    }
);


/* =========================================
   APLICAR TEMA
========================================= */

function applyTheme(theme) {

    document.body.classList.remove(
        "theme-blue",
        "theme-purple",
        "theme-green"
    );


    document.body.classList.add(
        `theme-${theme}`
    );

}


/* =========================================
   MÚSICA
========================================= */

let musicPlaying = false;


/*
    Volumen inicial
*/

music.volume =
    volumeControl.value;


/* =========================================
   BOTÓN MÚSICA
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            music.pause();

            musicButton.textContent =
                "🔇";

            musicPlaying = false;

        }

        else {

            music.play()
                .then(() => {

                    musicButton.textContent =
                        "🔊";

                    musicPlaying = true;

                })
                .catch(error => {

                    console.log(
                        "El navegador bloqueó el audio:",
                        error
                    );

                });

        }

    }
);


/* =========================================
   VOLUMEN
========================================= */

volumeControl.addEventListener(
    "input",
    () => {

        music.volume =
            volumeControl.value;


        localStorage.setItem(
            "volume",
            volumeControl.value
        );


        /*
            Si volumen = 0
            mostramos silencio
        */

        if (
            volumeControl.value == 0
        ) {

            musicButton.textContent =
                "🔇";

        }

    }
);


/* =========================================
   CARGAR CONFIGURACIÓN
========================================= */

function loadSettings() {


    /* -----------------------------
       FONDO
    ----------------------------- */

    const savedBackground =
        localStorage.getItem(
            "background"
        );


    if (savedBackground) {

        videoSource.src =
            `assets/backgrounds/${savedBackground}`;

        backgroundVideo.load();

        /*
            Marcar opción seleccionada
        */

        const selected =
            document.querySelector(
                `input[name="background"][value="${savedBackground}"]`
            );


        if (selected) {

            selected.checked = true;

        }

    }


    /* -----------------------------
       TEMA
    ----------------------------- */

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (savedTheme) {

        applyTheme(savedTheme);


        const selected =
            document.querySelector(
                `input[name="theme"][value="${savedTheme}"]`
            );


        if (selected) {

            selected.checked = true;

        }

    }

    else {

        applyTheme("blue");

    }


    /* -----------------------------
       VOLUMEN
    ----------------------------- */

    const savedVolume =
        localStorage.getItem(
            "volume"
        );


    if (savedVolume !== null) {

        volumeControl.value =
            savedVolume;

        music.volume =
            savedVolume;

    }

}


/* Ejecutar configuración */

loadSettings();