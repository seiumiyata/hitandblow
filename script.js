document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.js-input');
    const submit = document.querySelector('.js-submit');
    const submitClear = document.querySelector('.js-submit-clear');
    const result = document.querySelector('.js-result');
    const resultHit = document.querySelector('.js-result-hit');
    const resultBlow = document.querySelector('.js-result-blow');
    const dialogue = document.querySelector('.js-dialogue');
    const difficultySelect = document.querySelector('.js-difficulty');
    const startTimerButton = document.querySelector('.js-start-timer');
    const timerDisplay = document.querySelector('.js-time');

    let answer = generateAnswer();
    let timer;
    let timeLeft = 60; // タイムアタックの制限時間（秒）

    console.log(answer); // デバッグ用

    submit.addEventListener('click', () => {
        const guess = input.value;
        if (guess.length !== 4 || !/^\d+$/.test(guess)) {
            alert('4桁の数字を入力してください。');
            return;
        }

        const { hit, blow } = checkGuess(guess, answer);
        result.textContent = `入力した数字: ${guess}`;
        resultHit.textContent = `HIT: ${hit}`;
        resultBlow.textContent = `BLOW: ${blow}`;

        if (hit === 4) {
            clearInterval(timer);
            dialogue.innerHTML = `
                <p>館の主: 「おめでとう、探偵よ。真実にたどり着いたようだな。しかし、これが終わりではない。真実の先に待つものを知る覚悟はあるか？」</p>
                <p>突然、館の奥から不気味な笑い声が響き渡る。あなたの背筋を冷たい汗が流れる。真実を知ることが、必ずしも救いになるとは限らないのだ。</p>
            `;
            alert('おめでとうございます！真実にたどり着きました。');
        } else {
            dialogue.innerHTML = `
                <p>館の主: 「まだ謎は解けていないようだ。再挑戦せよ。時間は限られている。」</p>
                <p>館の中の影が一層濃くなり、あなたの心に不安が広がる。失敗すれば、何が待ち受けているのか...。</p>
            `;
            alert('まだ謎は解けていません。再挑戦してください。');
        }
    });

    submitClear.addEventListener('click', () => {
        input.value = '';
        result.textContent = '入力した数字: ';
        resultHit.textContent = 'HIT: ';
        resultBlow.textContent = 'BLOW: ';
        dialogue.innerHTML = `
            <p>館の主: 「探偵よ、この館に隠された秘密を解き明かしてみせよ。4桁の暗号を解読するのだ。」</p>
            <p>館の中は静まり返り、ただあなたの心臓の鼓動だけが響く。時間は刻一刻と過ぎていく...。</p>
        `;
    });

    startTimerButton.addEventListener('click', () => {
        clearInterval(timer);
        timeLeft = 60;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('時間切れです。再挑戦してください。');
            }
        }, 1000);
    });

    function generateAnswer() {
        const digits = [];
        while (digits.length < 4) {
            const rand = Math.floor(Math.random() * 10).toString();
            if (!digits.includes(rand)) {
                digits.push(rand);
            }
        }
        return digits.join('');
    }

    function checkGuess(guess, answer) {
        let hit = 0;
        let blow = 0;
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
                hit++;
            } else if (answer.includes(guess[i])) {
                blow++;
            }
        }
        return { hit, blow };
    }
});
