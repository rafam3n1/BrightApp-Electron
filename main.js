const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;
let view;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.maximize();

  // Criando e configurando o BrowserView
  view = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height });
  view.webContents.loadURL('https://grupobright.com/wp-admin/');

  // Criando o menu
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
