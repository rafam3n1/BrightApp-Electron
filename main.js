const { app, BrowserWindow, BrowserView, Menu } = require('electron');

let mainWindow;
let view;
let loadingWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/img/LocalLogo - Copia.png', // Adicione esta linha
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.maximize();

  // Criando e configurando o BrowserView
  view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height });
  view.webContents.loadURL('https://grupobright.com/wp-admin/');

  view.webContents.on('did-start-loading', () => {
    console.log("Iniciou o carregamento");
    loadingWindow.show();

    // Oculta a janela de loading após 5 segundos
    setTimeout(() => {
      loadingWindow.hide();
    }, 5000);
  });

  createLoadingWindow();

  const menuTemplate = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Home',
          click: () => {
            view.webContents.loadURL('https://grupobright.com/wp-admin/');
          }
        },
        {
          label: 'Conta',
          click: () => {
            view.webContents.loadURL('https://grupobright.com/minha-conta/');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    parent: mainWindow, // Define a mainWindow como janela pai
    show: false
  });
  loadingWindow.loadFile('loading.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
