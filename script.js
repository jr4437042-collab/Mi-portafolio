
document.addEventListener("DOMContentLoaded", function () {

    // MODO OSCURO
    const boton = document.getElementById("themeToggle");

    if (boton) {
        boton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const oscuro = document.body.classList.contains("dark-mode");

            boton.innerHTML = oscuro
                ? '<i class="fas fa-sun"></i> Modo claro'
                : '<i class="fas fa-moon"></i> Modo oscuro';
        });
    }

    // AÑO DEL FOOTER
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // FORMULARIO DE CONTACTO
    const formulario = document.getElementById("contactForm");
    const estado = document.getElementById("formStatus");

    if (formulario && estado) {

        formulario.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (!formulario.reportValidity()) return;

            const botonEnviar = formulario.querySelector(
                'button[type="submit"]'
            );

            estado.textContent = "Enviando mensaje...";
            estado.style.color = "white";

            if (botonEnviar) botonEnviar.disabled = true;

            try {
                const datos = Object.fromEntries(
                    new FormData(formulario).entries()
                );

                const respuesta = await fetch(
                    "https://formsubmit.co/ajax/jr4437042@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(datos)
                    }
                );

                const resultado = await respuesta.json();

                console.log("Respuesta de FormSubmit:", resultado);

                if (String(resultado.success) === "true") {
                    estado.textContent = "¡MENSAJE ENVIADO CORRECTAMENTE!";
                    estado.style.color = "#86efac";
                    estado.style.fontWeight = "bold";
                    estado.style.fontSize = "20px";

                    formulario.reset();
                } else {
                    throw new Error(
                        resultado.message || "FormSubmit no confirmó el envío."
                    );
                }

            } catch (error) {
                console.error("Error al enviar:", error);

                estado.textContent = "No se pudo enviar: " + error.message;
                estado.style.color = "#ffaaaa";
            } finally {
                if (botonEnviar) botonEnviar.disabled = false;
            }
        });
    }

});
