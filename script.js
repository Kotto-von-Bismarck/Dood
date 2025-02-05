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
            if (trueAnswers >= 13) {
                new ResultCard(results[0]).render();
            } else if (trueAnswers < 13 && trueAnswers > 7) {
                new ResultCard(results[1]).render();
            } else if (trueAnswers <= 7) {
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
            frame: 'test4.png',
            title: 'Да ты просто Эль-Чувачино!'
        },
        {
            frame: 'test.jpg',
            title: 'Ништяк!'
        },
        {
            frame: 'test3.png',
            title: 'Чувак, ты точно смотрел этот фильм?'
        },
    ]

    const questionsBank = [
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Мод', 'true'], ['Уолтер', 'false']]
        },


        ///////


        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        },
        {
            frame: 'test2.jpg',
            question: 'Кто позвонил Чуваку в этой сцене?',
            answers: [['Мод', 'true'], ['Донни', 'false'], ['Дж. Трихорн', 'false'], ['Уолтер', 'false']]
        },
        {
            frame: 'test.jpg',
            question: 'Каким коктейлем наслаждается Чувак?',
            answers: [['белый русский', 'true'], ['синий русский', 'false'], ['пина-колада', 'false'], ['виски сауэр', 'false']]
        }
    ];

    createQuestion(questionsBank[0]);
})