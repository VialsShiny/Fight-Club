function Kill(killed) {
  let opponent = currentPlayer === 1 ? 2 : 1;

  if (killed) {
    if (currentPlayer == killed) {
      setPlayerTurn();
    }
    opponent = killed;
  }

  let PV = document.querySelector(`#sanity-pl-${opponent}`);
  let PVText = document.querySelector(`#sanity-text-pl-${opponent}`);
  let newPV = 0;

  PVText.textContent = `${newPV}%`;
  PV.style.width = `${newPV}%`;

  let message = document.createElement('p');
  message.classList.add('text-red-200');
  message.textContent = `> Admin a Kill P${opponent}`;
  battleConsole.prepend(message);

  updateButtonStates();
  setPlayerTurn();
  checkHealth(newPV);
}

function setAbilitiesProgress(player, abilitieName, progress) {
  let buttons = document.querySelectorAll(`#p${player}-section button`);

  buttons.forEach(button => {
    if (button.dataset.abilities && button.dataset.abilities == abilitieName) {
      button.querySelector('#progress-ab').style.width = `${progress}%`;
    }
  });
}

function setAllAbilities(player) {
  let buttons = document.querySelectorAll(`#p${player}-section button`);

  buttons.forEach(button => {
    button.querySelector('#progress-ab').style.width = `100%`;
  });
}