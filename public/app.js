let buttons = document.querySelectorAll('button');
let battleConsole = document.querySelector('#console');
let currentPlayer = Math.floor(Math.random() * 2) + 1;
const dataAbilities = [
    'medikit',
    'poison',
    'skip',
    'shield'
]

function consoleMessage(classes, text) {
    let message = document.createElement('p');

    if (Array.isArray(classes)) {
        message.classList.add(...classes);
    } else {
        message.classList.add(classes);
    }

    message.textContent = `> ${text}`;
    battleConsole.prepend(message);
}

function skip() {
    let opponent = currentPlayer === 1 ? 2 : 1;
    const mainContainer = document.querySelector(`#p${opponent}-section`);

    if (mainContainer.dataset.skip) {
        mainContainer.dataset.skip--;

        setPlayerTurn();

        if (mainContainer.dataset.skip <= 0) {
            delete mainContainer.dataset.skip;
            setPlayerTurn();
        }
    }
}


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
        performAction("winner");
        consoleMessage(['text-red-400', 'font-bold'], `${playerName.textContent} a perdu le combat...`);
        consoleMessage(['text-green-400', 'font-bold'], `${winnerName.textContent} a gagné le combat !`);
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
            newWidth = (strength / 3) * 10;
            break;
        case 'poison':
            newWidth = (strength / 4) * 10;
            break;
        case 'skip':
            newWidth = (strength / 3) * 10;
            break;
        case 'shield':
            newWidth = (strength / 2) * 10;
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

        let mainContainerPlayer = document.querySelector(`#p${item.dataset.player}-section`);
        let mainContainerOpponent = document.querySelector(`#p${item.dataset.opponent}-section`);
        let opponentPV = document.querySelector(`#sanity-pl-${item.dataset.opponent}`);
        let opponentPVText = document.querySelector(`#sanity-text-pl-${item.dataset.opponent}`);
        let initPV = parseFloat(opponentPV.style.width);
        let newPV = Math.max(initPV - parseInt(item.value), 0);

        if (item.dataset.abilities) {
            const progressBar = parseFloat(item.querySelector('#progress-ab').style.width);

            if (progressBar === 100) {
                setAbilitiesEffect(item.dataset.abilities, item, mainContainerPlayer);
                updateButtonStates();
                setPlayerTurn();
                checkHealth(newPV);
                return;
            } else {
                return;
            }
        }

        if (mainContainerOpponent.dataset.shield) {
            newPV = initPV;
            delete mainContainerOpponent.dataset.shield;
        }

        opponentPVText.textContent = `${newPV}%`;
        opponentPV.style.width = `${newPV}%`;

        consoleMessage('text-blue-200', `⚔️ P${item.dataset.player} charge en attaquant avec ${item.textContent} ! 💥`);


        item.dataset.disabled = checkStrength(parseInt(item.value));
        item.dataset.abilities ?? checkAbilitiesProgress(null, null, 9, mainContainerPlayer);

        if (parseInt(item.dataset.disabled) > 0) {
            item.disabled = true;
        }


        updateButtonStates();
        setPlayerTurn();
        checkHealth(newPV);
    });
});

function setAbilitiesEffect(name, item, mainContainer) {
    let abilityName = name;
    let opponent = currentPlayer === 1 ? 2 : 1;
    let playerPV = document.querySelector(`#sanity-pl-${currentPlayer}`);
    let playerPVText = document.querySelector(`#sanity-text-pl-${currentPlayer}`);
    let opponentPV = document.querySelector(`#sanity-pl-${opponent}`);
    let opponentPVText = document.querySelector(`#sanity-text-pl-${opponent}`);
    const progressBar = item.querySelector('#progress-ab');

    switch (abilityName) {
        case 'medikit':
            initPV = parseFloat(opponentPV.style.width);
            newPV = initPV + 30;

            playerPVText.textContent = `${newPV}%`;
            playerPV.style.width = `${newPV}%`;

            consoleMessage(['text-red-300', 'font-bold'], `💊 P${item.dataset.player} utilise Medikit et se soigne de 30 PV !`);
            performAction('medikit');
            break;

        case 'poison':
            initPV = parseFloat(opponentPV.style.width);
            newPV = Math.max(initPV - 15, 0);

            opponentPVText.textContent = `${newPV}%`;
            opponentPV.style.width = `${newPV}%`;

            consoleMessage(['text-green-400', 'font-bold'], `☠️ P${item.dataset.player} empoisonne l'adversaire, infligeant 15 PV de dégâts !`);
            performAction('poison');
            break;

        case 'skip':
            mainContainer.dataset.skip = 3;

            consoleMessage(['text-yellow-400', 'font-bold'], `⏳ P${item.dataset.player} utilise "Skip", l'adversaire saute son prochain tour !`);
            performAction('skip');
            break;

        case 'shield':
            mainContainer.dataset.skip = 2;
            mainContainer.dataset.shield = true;

            consoleMessage(['text-white', 'font-bold'], `🛡️ P${item.dataset.player} active un bouclier, il est protégé pour 1 tours !`);
            performAction('shield');
            break;

        default:
            return;
    }


    progressBar.style.width = '0%';
}

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
    skip();
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