/* =========================================
   CONFIGURAÇÕES DO ANIVERSÁRIO
========================================= */

const CONFIG = {

    name: "Sidney",

    age: "46",

    eventDate: "2026-10-24T19:30:00",

    venueName: "Quiosque",

    venueAddress:
        "Rua José Pádua Medeiros, 1030 — Condomínio Place Azaléia",

    formSubmitEmail:
        "marquesguevarap@gmail.com",

    maxCompanions: 5
};


/* =========================================
   ELEMENTOS
========================================= */

const heroName = document.getElementById("heroName");
const heroAge = document.getElementById("heroAge");

const introName = document.getElementById("introName");
const finalName = document.getElementById("finalName");

const venueName = document.getElementById("venueName");
const venueAddress = document.getElementById("venueAddress");

const eventDay = document.getElementById("eventDay");
const eventMonth = document.getElementById("eventMonth");
const eventYear = document.getElementById("eventYear");
const eventTime = document.getElementById("eventTime");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const openInvitation =
    document.getElementById("openInvitation");

const rsvpForm =
    document.getElementById("rsvpForm");

const submitButton =
    document.getElementById("submitButton");

const successMessage =
    document.getElementById("successMessage");

const errorMessage =
    document.getElementById("errorMessage");

const companionsGroup =
    document.getElementById("companionsGroup");


/* =========================================
   PREENCHER INFORMAÇÕES
========================================= */

heroName.textContent = CONFIG.name;
heroAge.textContent = CONFIG.age;

introName.textContent = CONFIG.name;
finalName.textContent = `Com carinho, para ${CONFIG.name}.`;

venueName.textContent = CONFIG.venueName;
venueAddress.textContent = CONFIG.venueAddress;


/* =========================================
   DATA DO EVENTO
========================================= */

const date = new Date(CONFIG.eventDate);

const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO"
];

eventDay.textContent =
    String(date.getDate()).padStart(2, "0");

eventMonth.textContent =
    months[date.getMonth()];

eventYear.textContent =
    date.getFullYear();

eventTime.textContent =
    date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });


/* =========================================
   BOTÃO ABRIR CONVITE
========================================= */

openInvitation.addEventListener("click", () => {

    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

});


/* =========================================
   CONTADOR
========================================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        date.getTime() - now.getTime();


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   ACOMPANHANTES
========================================= */

const attendanceInputs =
    document.querySelectorAll(
        'input[name="Presença"]'
    );


function updateCompanions() {

    const selected =
        document.querySelector(
            'input[name="Presença"]:checked'
        );


    if (!selected) {
        return;
    }


    if (selected.value === "Sim") {

        companionsGroup.style.display = "block";

    } else {

        companionsGroup.style.display = "none";

    }

}


attendanceInputs.forEach(input => {

    input.addEventListener(
        "change",
        updateCompanions
    );

});


/* =========================================
   FORM SUBMIT
========================================= */

rsvpForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const selected =
        document.querySelector(
            'input[name="Presença"]:checked'
        );


    if (!selected) {
        return;
    }


    submitButton.disabled = true;

    submitButton.textContent =
        "ENVIANDO...";


    errorMessage.style.display = "none";


    const formData =
        new FormData(rsvpForm);


    /*
       Se a pessoa não for,
       zeramos acompanhantes.
    */

    if (selected.value === "Não") {

        formData.set(
            "Acompanhantes",
            "0"
        );

    }


    /*
       Informações extras enviadas
       junto com a confirmação.
    */

    formData.append(
        "Aniversariante",
        CONFIG.name
    );

    formData.append(
        "Data do evento",
        date.toLocaleString("pt-BR")
    );


    try {

        const response =
            await fetch(
                `https://formsubmit.co/ajax/${encodeURIComponent(
                    CONFIG.formSubmitEmail
                )}`,
                {

                    method: "POST",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    body: formData

                }
            );


        const result =
            await response.json();


        if (!response.ok) {
            throw new Error(
                result.message ||
                "Erro ao enviar."
            );
        }


        /*
           Esconde o formulário
        */

        rsvpForm.style.display = "none";


        /*
           Mostra confirmação
        */

        successMessage.style.display =
            "block";


        /*
           Rola até a mensagem
        */

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    } catch (error) {

        console.error(error);

        errorMessage.style.display =
            "block";

        submitButton.disabled = false;

        submitButton.textContent =
            "CONFIRMAR PRESENÇA";

    }

});


/* =========================================
   ANIMAÇÃO AO ROLAR
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});