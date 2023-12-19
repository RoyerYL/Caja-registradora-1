// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

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
      }
   })