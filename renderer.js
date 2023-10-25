const { ipcRenderer, shell } = require('electron');

const floatingButton = document.getElementById('floatingButton');
const popupMenu = document.getElementById('popupMenu');

floatingButton.addEventListener('mousedown', (e) => {
    e.preventDefault();

    const onMouseMove = (event) => {
        floatingButton.style.left = (event.clientX - floatingButton.offsetWidth / 2) + 'px';
        floatingButton.style.top = (event.clientY - floatingButton.offsetHeight / 2) + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    });
});

floatingButton.addEventListener('click', (e) => {
    if (popupMenu.classList.contains('hidden')) {
        popupMenu.classList.remove('hidden');
        popupMenu.style.left = (e.clientX - popupMenu.offsetWidth / 2) + 'px';
        popupMenu.style.top = (e.clientY - popupMenu.offsetHeight - 30) + 'px';
    } else {
        popupMenu.classList.add('hidden');
    }
});

// Funções dos botões do menu
document.getElementById('home').addEventListener('click', () => {
    ipcRenderer.send('navigate', 'https://grupobright.com/dashboard/');
    popupMenu.classList.add('hidden');
});

document.getElementById('back').addEventListener('click', () => {
    ipcRenderer.send('navigate-back');
    popupMenu.classList.add('hidden');
});

document.getElementById('account').addEventListener('click', () => {
    shell.openExternal('https://grupobright.com/minha-conta/');
    popupMenu.classList.add('hidden');
});

document.getElementById('discord').addEventListener('click', () => {
    shell.openExternal('https://discord.com/invite/CuCJ9XckC3');
    popupMenu.classList.add('hidden');
});
