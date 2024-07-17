const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const generateBarcode = require(path.join(app.getAppPath(), "src", "Utils", "generarCodBarras", 'generarCodBarras.js'));
const ticketCreate = require(path.join(app.getAppPath(), "src", "Utils", "ticketGenerator", 'index.js'));

if (require('electron-squirrel-startup')) {
  app.quit();
}
let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1600,
    minWidth: 1500,
    minHeight: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log('Cargando desde servidor de desarrollo Vite');
  } else {
    const filePath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, 'index.html');
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

  const contextMenu =new Menu()
  contextMenu.append(new MenuItem({
    label:"pegar",
    role:'paste'
  }
  ))
  contextMenu.append(new MenuItem({
    label: "Copiar",
    role: "copy"
}));
  mainWindow.webContents.on("context-menu",(event,params)=>
  {
    contextMenu.popup(mainWindow,params.x,params.y)
  })

};

ipcMain.on("executeTicketCreate", (event, id , store) => {
  // Ejecutar la función ticketCreate
  ticketCreate(id,store);

  // Enviar el resultado de vuelta al proceso de renderizado
  event.reply('ticketCreateResult', 'Ticket creado con éxito');

});
ipcMain.on("executeGeneratorCodBarras", (event, id) => {
  // Ejecutar la función ticketCreate
  console.log(id);
  generateBarcode(id);

  // Enviar el resultado de vuelta al proceso de renderizado
  event.reply('generatedResult', 'Cod Barras creado con éxito');

});

let openWindows = [];

ipcMain.on('openNewWindow', (event, options) => {
  const newWindow = new BrowserWindow(options);
  newWindow.loadURL("http://localhost:6969/#/ListaArticulos"); // Cambia la ruta según tu estructura de archivos


  openWindows.push(newWindow.id);

  // Enviar el id de la nueva ventana al proceso de renderizado
  event.reply('newWindowOpened', newWindow.id);
});

ipcMain.on('closeWindow', (event, windowId) => {
  const windowIndex = openWindows.indexOf(windowId);
  if (windowIndex !== -1) {
    openWindows.splice(windowIndex, 1);
  }

  const window = BrowserWindow.fromId(windowId);
  if (window) {
    window.close();
  }
});
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Inicia tu servidor Express
  const serverProcess = spawn('node', [path.join(app.getAppPath(), 'src', 'index.js')]);
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



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

