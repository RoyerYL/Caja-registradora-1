// See the Electron documentation for details on how to use preload scripts:

import { BrowserWindow, contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld("electronAPI",
   {
      onUpdateTheme: (cb)=>ipcRenderer.on("theme",cb),
      executeTicketCreate: async (id) => {
         // Emitir un evento para solicitar la ejecución de la función ticketCreate
         ipcRenderer.send("executeTicketCreate",id);

         // Escuchar la respuesta (puedes personalizar el nombre del evento)
         ipcRenderer.on("ticketCreateResult", (event, result) => {
            console.log(result);
         });
      },
      executeGeneratorCodBarras: async (id) => {
         // Emitir un evento para solicitar la ejecución de la función ticketCreate
         ipcRenderer.send("executeGeneratorCodBarras",id);

         // Escuchar la respuesta (puedes personalizar el nombre del evento)
         ipcRenderer.on("generatedResult", (event, result) => {
            console.log(result);
         });
      },



      openNewWindow:(windowOptions)=>{
         ipcRenderer.send("openNewWindow",windowOptions)
      }
      
   })

   let openWindows = [];
   contextBridge.exposeInMainWorld('electron', {
      openNewWindow: (options) => {
        ipcRenderer.send('openNewWindow', options);
      },
      closeWindow: (windowId) => {
        ipcRenderer.send('closeWindow', windowId);
      },
      getOpenWindows: () => {
         return openWindows;
       },
    });
    ipcRenderer.on('newWindowOpened', (event, windowId) => {
      openWindows.push(windowId);
    });
    
    ipcRenderer.on('windowClosed', (event, windowId) => {
      const index = openWindows.indexOf(windowId);
      if (index !== -1) {
        openWindows.splice(index, 1);
      }
    });