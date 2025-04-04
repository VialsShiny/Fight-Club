let buttons = document.querySelectorAll('button');
let battleConsole = document.querySelector('#console');
let currentPlayer = Math.floor(Math.random() * 2) + 1;
const dataAbilities = [
    'medikit',
    'poison',
    'skip',
    'shield'
]

function checkStrength(force) {
    if (force >= 8) {
        return 9;
    } else if (force > 7) {
        return 7;
    } else if (force > 6) {
        return 5;
    } else if (force > 1) {
        return 3;
    } else {
        return 0;
    }
}

function checkHealth(health) {
    if (health == 0) {
        let playerName = document.querySelector(`#p${currentPlayer}-name`);
        let opponent = currentPlayer === 1 ? 2 : 1;
        let winnerName = document.querySelector(`#p${opponent}-name`);
        let restartButton = document.querySelector('#restart-button');
        winnerName.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite');
        playerName.classList.add('animate__animated', 'animate__rotateOutDownLeft');
        buttons.forEach(item => {
            item.disabled = true;
        });
        PlayConfetti();
        setTimeout(() => {
            restartButton.classList.remove('hidden');
        }, 3000);
    }
}

function checkAbilitiesProgress(name, item, force, el = null) {
    let initProgress = 0;
    let abilityName = name;
    let progressItem = item;

    if (!abilityName || !progressItem) {
        if (!el) return;

        const random = Math.floor(Math.random() * 4);
        abilityName = dataAbilities[random];

        const items = el.querySelectorAll('#progress-ab');
        if (!items[random]) return;

        progressItem = items[random];
    }

    initProgress = parseFloat(progressItem.style.width) || 0;

    let newWidth = 0;
    const strength = parseFloat(checkStrength(force));

    switch (abilityName) {
        case 'medikit':
            newWidth = (strength / 2) * 10;
            break;
        case 'poison':
            newWidth = (strength / 3) * 10;
            break;
        case 'skip':
            newWidth = (strength / 2) * 10;
            break;
        case 'shield':
            newWidth = (strength / 4) * 10;
            break;
        default:
            return;
    }

    newWidth = Math.min(initProgress + newWidth, 100);
    progressItem.style.width = `${newWidth}%`;
}

function updateButtonStates() {
    buttons.forEach((item) => {
        let remainingTurns = parseInt(item.dataset.disabled) || 0;

        if (remainingTurns > 0) {
            item.dataset.disabled = remainingTurns - 1;
        }

        item.disabled = remainingTurns > 1;
    });
}

buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
        let remainingTurns = parseInt(item.dataset.disabled) || 0;
        if (remainingTurns > 0) return;

        if (item.dataset.abilities) {
            const progressBar = parseFloat(item.querySelector('#progress-ab').style.width);
        
            if (progressBar === 100) {
                console.log(true);

                // Next commit will have the next part of the code
            } else {
                return;
            }
        }
        

        let message = document.createElement('p');
        let mainContainer = document.querySelector(`#p${item.dataset.player}-section`);
        let opponentPV = document.querySelector(`#sanity-pl-${item.dataset.opponent}`);
        let opponentPVText = document.querySelector(`#sanity-text-pl-${item.dataset.opponent}`);
        let initPV = parseFloat(opponentPV.style.width);
        let newPV = Math.max(initPV - parseInt(item.value), 0);

        opponentPVText.textContent = `${newPV}%`;
        opponentPV.style.width = `${newPV}%`;

        message.classList.add('text-blue-200');
        message.textContent = `> P${item.dataset.player} attaque ! PV restants P${item.dataset.opponent} : ${newPV}%`;

        item.dataset.disabled = checkStrength(parseInt(item.value));
        checkAbilitiesProgress(null, null, 9, mainContainer);

        if (parseInt(item.dataset.disabled) > 0) {
            item.disabled = true;
        }

        battleConsole.prepend(message);

        updateButtonStates();
        setPlayerTurn();
        checkHealth(newPV);
    });
});

function setPlayerTurn() {
    let opponent = currentPlayer === 1 ? 2 : 1;

    const buttonsPlayer = document.querySelectorAll(`#p${currentPlayer}-section button`);
    buttonsPlayer.forEach(item => {
        item.disabled = true;
    });

    const buttonsOpponent = document.querySelectorAll(`#p${opponent}-section button`);
    buttonsOpponent.forEach(item => {
        let remainingTurns = parseInt(item.dataset.disabled) || 0;
        item.disabled = remainingTurns > 0;
    });

    currentPlayer = opponent;
}

setPlayerTurn();

function Ajax() {
    fetch('/api/fight/hit', {
        method: 'POST',
        body: {}
    }).then(response => {
        if (!response.ok) {
            console.log(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.log(`Error: ${error}`);
    })
}