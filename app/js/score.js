(function () {

    /* =====================================================
       CONFIGURAÇÕES
    ====================================================== */

    const STORE_KEY =
        'daiji_checkin'


    let points =
        1250


    const answers = {

        sono: null,

        hora: '22:30',

        estresse: null,

        dieta: null,

        remedio: null

    }


    const required = [

        'sono',

        'estresse',

        'dieta',

        'remedio'

    ]


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const modal =
        document.getElementById('modal')

    const flow =
        document.getElementById('ciFlow')

    const success =
        document.getElementById('ciSuccess')

    const submit =
        document.getElementById('ciSubmit')

    const progress =
        document.getElementById('ciProg')

    const ptsNum =
        document.getElementById('ptsNum')

    const actionCard =
        document.getElementById('actionCard')

    const actionTitle =
        document.getElementById('actionTitle')

    const actionSub =
        document.getElementById('actionSub')

    const actionIc =
        document.getElementById('actionIc')

    const today =
        document.getElementById('wtoday')

    const toast =
        document.getElementById('toast')

    const toastMsg =
        document.getElementById('toastMsg')


    /* =====================================================
       DATA ATUAL
    ====================================================== */

    function updateDate() {

        const element =
            document.getElementById('todayDate')


        if (!element) {

            return

        }


        const now =
            new Date()


        element.textContent =
            now.toLocaleDateString(
                'pt-BR',
                {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long'
                }
            )

    }


    /* =====================================================
       SCORE
    ====================================================== */

    function animateScore() {

        const arc =
            document.getElementById(
                'scoreArc'
            )


        if (!arc) {

            return

        }


        const radius =
            60


        const circumference =
            2 *
            Math.PI *
            radius


        const score =
            74


        arc.style.strokeDasharray =
            circumference


        arc.style.strokeDashoffset =
            circumference


        requestAnimationFrame(
            () => {

                setTimeout(
                    () => {

                        arc.style.strokeDashoffset =
                            circumference *
                            (
                                1 -
                                score / 100
                            )

                    },
                    150
                )

            }
        )

    }


    /* =====================================================
       PONTOS
    ====================================================== */

    function formatPoints(value) {

        return value.toLocaleString(
            'pt-BR'
        )

    }


    function animatePoints(
        from,
        to
    ) {

        const start =
            performance.now()

        const duration =
            800


        function step(now) {

            const progress =
                Math.min(
                    1,
                    (
                        now -
                        start
                    ) /
                    duration
                )


            const value =
                Math.round(

                    from +

                    (
                        to -
                        from
                    ) *

                    (
                        1 -
                        Math.pow(
                            1 -
                            progress,
                            3
                        )
                    )

                )


            ptsNum.textContent =
                formatPoints(value)


            if (
                progress <
                1
            ) {

                requestAnimationFrame(
                    step
                )

            }

        }


        requestAnimationFrame(
            step
        )

    }


    /* =====================================================
       PROGRESSO DO CHECK-IN
    ====================================================== */

    function updateProgress() {

        const completed =
            required.filter(
                key =>
                    answers[key]
            ).length


        const percentage =
            Math.round(
                completed /
                required.length *
                100
            )


        progress.style.width =
            percentage +
            '%'


        submit.disabled =
            completed <
            required.length

    }


    /* =====================================================
       CHIPS
    ====================================================== */

    document
        .querySelectorAll(
            '.chips'
        )
        .forEach(group => {

            const key =
                group.dataset.group


            group.addEventListener(
                'click',
                event => {

                    const button =
                        event.target.closest(
                            '.chip'
                        )


                    if (!button) {

                        return

                    }


                    group
                        .querySelectorAll(
                            '.chip'
                        )
                        .forEach(item => {

                            item.setAttribute(
                                'aria-pressed',
                                'false'
                            )

                        })


                    button.setAttribute(
                        'aria-pressed',
                        'true'
                    )


                    answers[key] =
                        button.dataset.val


                    updateProgress()

                }
            )

        })


    /* =====================================================
       OPÇÕES
    ====================================================== */

    document
        .querySelectorAll(
            '.options'
        )
        .forEach(group => {

            const key =
                group.dataset.group


            group.addEventListener(
                'click',
                event => {

                    const button =
                        event.target.closest(
                            '.option'
                        )


                    if (!button) {

                        return

                    }


                    group
                        .querySelectorAll(
                            '.option'
                        )
                        .forEach(item => {

                            item.setAttribute(
                                'aria-pressed',
                                'false'
                            )

                        })


                    button.setAttribute(
                        'aria-pressed',
                        'true'
                    )


                    answers[key] =
                        button.dataset.val


                    updateProgress()

                }
            )

        })


    /* =====================================================
       HORÁRIO
    ====================================================== */

    const horaInput =
        document.getElementById(
            'horaInput'
        )


    if (horaInput) {

        horaInput.addEventListener(
            'input',
            event => {

                answers.hora =
                    event.target.value

            }
        )

    }


    /* =====================================================
       MODAL
    ====================================================== */

    function openModal() {

        modal.hidden =
            false

        flow.hidden =
            false

        success.hidden =
            true

        document.body.style.overflow =
            'hidden'

    }


    function closeModal() {

        modal.hidden =
            true

        document.body.style.overflow =
            ''

    }


    actionCard.addEventListener(
        'click',
        () => {

            if (
                actionCard
                    .classList
                    .contains(
                        'done'
                    )
            ) {

                return

            }


            openModal()

        }
    )


    document
        .getElementById(
            'ciBack'
        )
        .addEventListener(
            'click',
            closeModal
        )


    document
        .getElementById(
            'scrim'
        )
        .addEventListener(
            'click',
            closeModal
        )


    /* =====================================================
       CONCLUI CHECK-IN
    ====================================================== */

    submit.addEventListener(
        'click',
        () => {

            if (
                submit.disabled
            ) {

                return

            }


            flow.hidden =
                true

            success.hidden =
                false


            markDone()

        }
    )


    function markDone() {

        if (
            !actionCard
                .classList
                .contains(
                    'done'
                )
        ) {

            animatePoints(
                points,
                points + 50
            )


            points +=
                50

        }


        actionCard
            .classList
            .add(
                'done'
            )


        actionTitle.textContent =
            'Check-in concluído'


        actionSub.textContent =
            'Muito bem! Volte amanhã · +50 pts ganhos'


        actionIc.innerHTML =

            '<i class="bi bi-check-lg"></i>'


        today
            .classList
            .add(
                'checked'
            )


        saveState()

    }


    /* =====================================================
       LOCAL STORAGE
    ====================================================== */

    function saveState() {

        try {

            localStorage.setItem(

                STORE_KEY,

                JSON.stringify({

                    done:
                        true,

                    answers:
                        answers,

                    points:
                        points

                })

            )

        }

        catch (error) {

            console.log(
                'Não foi possível salvar o check-in'
            )

        }

    }


    function restoreState() {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        STORE_KEY
                    ) ||
                    'null'
                )


            if (
                saved &&
                saved.done
            ) {

                points =
                    saved.points ||
                    1300


                ptsNum.textContent =
                    formatPoints(
                        points
                    )


                actionCard
                    .classList
                    .add(
                        'done'
                    )


                actionTitle.textContent =
                    'Check-in concluído'


                actionSub.textContent =
                    'Muito bem! Volte amanhã · +50 pts ganhos'


                actionIc.innerHTML =
                    '<i class="bi bi-check-lg"></i>'


                today
                    .classList
                    .add(
                        'checked'
                    )

            }

        }

        catch (error) {

            console.log(
                'Não foi possível restaurar o check-in'
            )

        }

    }


    /* =====================================================
       SUCESSO
    ====================================================== */

    document
        .getElementById(
            'ciDone'
        )
        .addEventListener(
            'click',
            () => {

                closeModal()

                showToast(
                    'Check-in concluído · +50 pts'
                )

            }
        )


    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer


    function showToast(message) {

        toastMsg.textContent =
            message


        toast
            .classList
            .add(
                'show'
            )


        clearTimeout(
            toastTimer
        )


        toastTimer =
            setTimeout(
                () => {

                    toast
                        .classList
                        .remove(
                            'show'
                        )

                },
                2600
            )

    }


    /* =====================================================
       INICIALIZAÇÃO
    ====================================================== */

    updateDate()

    animateScore()

    restoreState()

    updateProgress()

})()