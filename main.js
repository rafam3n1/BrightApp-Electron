const { app, BrowserWindow, BrowserView, Tray, Menu, ipcMain } = require('electron');

let mainWindow;
let view;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js',
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.maximize();

  // Criando e configurando o BrowserView
  view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  });
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height });
  view.webContents.loadURL('https://grupobright.com/dashboard/');

  Menu.setApplicationMenu(null);
}

function createTray() {
  tray = new Tray('./img/LocalLogo.ico');
  tray.setToolTip('Bright App');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir Bright App', click: function() {
        mainWindow.show();
        mainWindow.maximize();
      }
    },
    {
      label: 'Fechar Bright App', click: function() {
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);

  tray.on('double-click', function() {
    mainWindow.show();
    mainWindow.maximize();
  });
}

app.on('browser-window-blur', function() {
  if (!mainWindow.isVisible()) {
    createTray();
  }
});

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

ipcMain.on('navigate', (event, url) => {
  view.webContents.loadURL(url);
});

ipcMain.on('navigate-back', (event) => {
  view.webContents.goBack();
});
