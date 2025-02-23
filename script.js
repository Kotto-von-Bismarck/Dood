window.addEventListener('DOMContentLoaded', () => {
    let trueAnswers = 0;
    let totalAnswers = 0;
    const baseWrapper = document.querySelector('.baseWrapper');
    
    class QuestionCard {
        static parent = document.querySelector('.baseWrapper');
        
        constructor(data) {
            this.frame = data.frame;
            this.question = data.question;
            this.answers = data.answers;            
        }        

        static resetParent() {
            QuestionCard.parent.innerHTML = '';
        }

        createActionBtn(ansText, ansValue) {
            const btn = document.createElement('button');
            btn.classList.add('answerBtn');
            btn.setAttribute('answerValue', `${ansValue}`);
            btn.innerHTML = `${ansText}`;
            btn.addEventListener('click', () => {
                new Audio('media/strike.mp3').play();
                if (ansValue === 'true') {trueAnswers++};
                totalAnswers++;
                btn.parentElement.style.cssText = 'pointer-events: none';

                btn.parentElement.children[0].style.cssText = 'transform: rotate(45deg)';
                btn.parentElement.children[1].style.cssText = 'transform: rotate(-59deg)';
                btn.parentElement.children[2].style.cssText = 'transform: rotate(-140deg)';
                btn.parentElement.children[3].style.cssText = 'transform: rotate(180deg)';
                btn.parentElement.parentElement.firstElementChild.firstElementChild.style.cssText = 'transform: rotate(30deg)';

                baseWrapper.style.cssText = 'opacity: 0;'
                setTimeout(() => {
                    createQuestion(questionsBank[totalAnswers])
                }, 500);
            })
            return btn;
        }

        render() {
            const wrapper = document.createElement('div'),
                  answersField = document.createElement('div');

            wrapper.classList.add('wrapper');
            answersField.classList.add('filmFrame__answersField');

            wrapper.innerHTML = `
                <div class="filmFrame">
                    <img src="img/${this.frame}" alt="frame">
                </div>
                <h1 class="filmFrame__title">${this.question}</h1>
            `;

            answersField.appendChild(this.createActionBtn(
                this.answers[0][0], this.answers[0][1]
            ));
            answersField.appendChild(this.createActionBtn(
                this.answers[1][0], this.answers[1][1]
            ));
            answersField.appendChild(this.createActionBtn(
                this.answers[2][0], this.answers[2][1]
            ));
            answersField.appendChild(this.createActionBtn(
                this.answers[3][0], this.answers[3][1]
            ));

            QuestionCard.parent.append(wrapper);
            wrapper.append(answersField);
        }
    }

    class ResultCard {
        static parent = document.querySelector('.baseWrapper');
        
        constructor(data) {
            this.frame = data.frame;
            this.title = data.title;         
        }

        render() {
            const wrapper = document.createElement('div');

            wrapper.classList.add('wrapper');

            wrapper.innerHTML = `
                <div class="filmFrame">
                    <img src="img/${this.frame}" alt="frame">
                </div>
                <h1 class="filmFrame__title">${this.title}</h1>
                <div class="filmFrame__answersField" style="jus">
                    <button class="answerBtn hov">
                        Верно ${trueAnswers} из ${totalAnswers} отвеченных
                    </button>
                    <button class="answerBtn" onclick="window.location.reload()">
                        Пройти ещё разок
                    </button>
                </div>
            `;
            ResultCard.parent.append(wrapper);
        }
    }
    
    function createQuestion(data) {
        QuestionCard.resetParent();
        
        console.log(`верно ${trueAnswers} из ${totalAnswers} отвеченных`);

        if (!data) {
            if (trueAnswers >= 20) {
                new ResultCard(results[0]).render();
            } else if (trueAnswers < 20 && trueAnswers > 9) {
                new ResultCard(results[1]).render();
            } else if (trueAnswers <= 9) {
                new ResultCard(results[2]).render();
            }

            baseWrapper.style.cssText = 'opacity: 1;'
        } else {
            new QuestionCard(data).render();
            baseWrapper.style.cssText = 'opacity: 1;'
        }
    }

    const results = [
        {
            frame: 'elchuvachino.jpg',
            title: 'Да ты просто Эль-Чувачино!'
        },
        {
            frame: 'frame4.png',
            title: 'Ништяк!'
        },
        {
            frame: 'frame16.png',
            title: 'Чувак, ты точно смотрел этот фильм?'
        },
    ]

    const questionsBank = [
        {
            frame: 'frame4.png',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белым русским', 'true'], ['джин-тоником', 'false'], ['пина-коладой', 'false'], ['виски-сауэром', 'false']]
        },
        {
            frame: 'frame15.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Мод', 'true'], ['Уолтер', 'false']]
        },
        {
            frame: 'frame1.png',
            question: 'Чем возмущён Уолтер в этой сцене?',
            answers: [['субботней игрой', 'false'], ['немотивированной агрессией', 'true'], ['плохой погодой', 'false'], ['войной в Ираке', 'false']]
        },
        {
            frame: 'frame2.png',
            question: 'Зачем Чувак пришёл к Большому Лебовски?',
            answers: [['просто мимо проходил', 'false'], ['чтобы получить компенсацию', 'true'], ['чтобы найти работу', 'false'], ['чтобы поиграть в гольф', 'false']]
        },
        {
            frame: 'frame3.png',
            question: 'Кому Уолтер угрожает пистолетом?',
            answers: [['смоки', 'true'], ['донни', 'false'], ['Большому Лебовски', 'false'], ['Дж. Трихорну', 'false']]
        },
        {
            frame: 'frame5.png',
            question: 'Почему Уолтер не играет по субботам?',
            answers: [['просто не хочет', 'false'], ['он занят на работе', 'false'], ['ему лень ехать в боулинг в этот день', 'false'], ['он хранитель шаббата', 'true']]
        },
        {
            frame: 'frame6.png',
            question: 'Что Большой Лебовски отдал Чуваку?',
            answers: [['золото инков', 'false'], ['бельё Уолтера', 'false'], ['миллион долларов', 'false'], ['пустой чемодан', 'true']]
        },
        {
            frame: 'frame7.png',
            question: 'Что обсуждают Чувак и Уолтер?',
            answers: [['турнирную игру', 'false'], ['палец в конверте', 'true'], ['войну во Вьетнаме', 'false'], ['выходку нигилистов', 'false']]
        },
        {
            frame: 'frame8.png',
            question: 'Что слушает Чувак в этой сцене?',
            answers: [['песни eagles', 'false'], ['песни creedence', 'false'], ['песни китов', 'true'], ['звуки боулинг клуба', 'false']]
        },
        {
            frame: 'frame9.jpg',
            question: 'Какую музыкальную группу ненавидит Чувак?',
            answers: [['eagles', 'true'], ['creedence', 'false'], ['Digital Emotion', 'false'], ['statler brothers', 'false']]
        },
        {
            frame: 'frame10.jpg',
            question: 'По чьей вине Чувак оказался в полицейском участке?',
            answers: [['Большого Лебовски', 'false'], ['Ларри', 'false'], ['Дж. Трихорна', 'true'], ['Донни', 'false']]
        },
        {
            frame: 'frame11.png',
            question: 'Что сделает Уолтер после "допроса" Ларри?',
            answers: [['Выстрелит в Ларри', 'false'], ['Поедет играть в боулинг', 'false'], ['Разобьёт машину', 'true'], ['Сожжёт сочинение', 'false']]
        },
        {
            frame: 'frame12.jpg',
            question: 'Что нашёл Чувак у себя в машине?',
            answers: [['ещё один палец', 'false'], ['пистолет', 'false'], ['кассету Eagles', 'false'], ['Сочинение Ларри', 'true']]
        },
        {
            frame: 'frame13.jpg',
            question: 'Кто преследует Чувака?',
            answers: [['нигилисты', 'false'], ['Уолтер', 'false'], ['Большой Лебовски', 'false'], ['детектив дафино', 'true']]
        },
        {
            frame: 'frame14.png',
            question: 'Продолжи фразу Ковбоя: «Бывает, что ты ешь медведя, а бывает ...',
            answers: [['..что и бобром не закусить', 'false'], ['..что и медведь ест тебя', 'true'], ['..что и медведь ест медведя', 'false'], ['..так, о чем это я?', 'false']]
        },
        {
            frame: 'frame16.png',
            question: 'Кому в след Чувак ответил: "Слыш, я хотябы к туалету приучен"?',
            answers: [['Ву', 'true'], ['Ларри', 'false'], ['Донни', 'false'], ['Бранту', 'false']]
        },
        {
            frame: 'frame17.png',
            question: 'С чем Чувак сравнил "великолепный" план Уолтера в своей легендарной фразе?',
            answers: [['со швейцарскими часами', 'true'], ['с Nokia 3310', 'false'], ['с шинами от Polaris', 'false'], ['со скалой', 'false']]
        },
        {
            frame: 'frame19.png',
            question: 'Что Шериф швырнул в Чувака?',
            answers: [['настольные часы', 'false'], ['кружку', 'true'], ['пенал', 'false'], ['шар для боулинга', 'false']]
        },
        {
            frame: 'frame18.png',
            question: 'Как фамилия этого персонажа?',
            answers: [['Брант', 'false'], ['Кнудсон', 'false'], ['Трихорн', 'true'], ['Кинтана', 'false']]
        },
        {
            frame: 'frame20.png',
            question: 'Кем является Большой Лебовски по мнению Уолтера?',
            answers: [['инвалидом', 'false'], ['нигилистом', 'false'], ['симмулянтом', 'true'], ['сильным человеком', 'false']]
        },
        {
            frame: 'frame21.png',
            question: 'С кем сразился Уолтер в финале?',
            answers: [['с нигилистами', 'true'], ['с нацистами', 'false'], ['с коммунистами', 'false'], ['с пофигистами', 'false']]
        },
        {
            frame: 'frame22.png',
            question: 'Почему Чувак такой пыльный?',
            answers: [['был ураган', 'false'], ['он бродил по пустыне', 'false'], ['он неудачно открыл перечницу', 'false'], ['на нем прах Донни', 'true']]
        },
    ];

    createQuestion(questionsBank[0]);
})