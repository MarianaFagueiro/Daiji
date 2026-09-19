document.addEventListener("DOMContentLoaded", () => {

    const parametros = new URLSearchParams(window.location.search)

    const codigoEspecialidade =
        parametros.get("especialidade")


    const especialidades = {

        "clinica-geral": {
            nome: "Clínica Geral",
            descricao:
                "Continue sua jornada com atendimento online em Clínica Geral."
        },

        "psicologia": {
            nome: "Psicologia",
            descricao:
                "Continue sua jornada com atendimento online em Psicologia."
        },

        "nutricao": {
            nome: "Nutrição",
            descricao:
                "Continue sua jornada com atendimento online em Nutrição."
        },

        "cardiologia": {
            nome: "Cardiologia",
            descricao:
                "Continue sua jornada com atendimento online em Cardiologia."
        },

        "dermatologia": {
            nome: "Dermatologia",
            descricao:
                "Continue sua jornada com atendimento online em Dermatologia."
        },

        "ginecologia": {
            nome: "Ginecologia",
            descricao:
                "Continue sua jornada com atendimento online em Ginecologia."
        }

    }


    if (!codigoEspecialidade) {
        return
    }


    const especialidade =
        especialidades[codigoEspecialidade]


    if (!especialidade) {
        return
    }


    const selectedSpecialtyBox =
        document.getElementById("selectedSpecialtyBox")

    const selectedSpecialty =
        document.getElementById("selectedSpecialty")

    const telemedicineTitle =
        document.getElementById("telemedicineTitle")

    const telemedicineDescription =
        document.getElementById("telemedicineDescription")

    const cardSpecialty =
        document.getElementById("cardSpecialty")


    if (selectedSpecialtyBox) {
        selectedSpecialtyBox.hidden = false
    }


    if (selectedSpecialty) {
        selectedSpecialty.textContent =
            especialidade.nome
    }


    if (telemedicineTitle) {

        telemedicineTitle.innerHTML =
            `${especialidade.nome}<br>
             <span>onde você estiver.</span>`

    }


    if (telemedicineDescription) {

        telemedicineDescription.textContent =
            especialidade.descricao

    }


    if (cardSpecialty) {

        cardSpecialty.textContent =
            especialidade.nome

    }

})