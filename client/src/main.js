const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log('Cargando desde servidor de desarrollo Vite');
  } else {
    const filePath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, 'index.html');
    console.log('Cargando desde archivo:', filePath);
    mainWindow.loadFile(filePath);
  }

  // mainWindow.webContents.openDevTools();
  const template = [
    {
      label: "Mequitex",
      submenu: [
        { role: "toggleDevTools" },
        {
          label: "ligth",
          click: () => {

            mainWindow.webContents.send('theme', "ligth")
          }
        },
        {
          label: "dark",
          click: () => {
            mainWindow.webContents.send('theme', "dark")
          }
        }
      ]
    },
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
};
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Inicia tu servidor Express
  const serverProcess = spawn('node', [path.join(app.getAppPath(),'src', 'index.js')]);
  console.log("iniciando server");
  console.log("********** *************");
  console.log("__dirname *************");
  console.log(app.getAppPath());
  serverProcess.stdout.on('data', (data) => {
    console.log(`Server output: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
});

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });
// // app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

