const electron = require('electron');


electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) => {
    electron.ipcRenderer.on('statistics', (_: any, stats: any) => {
      callback(stats);
    })
  },
    getStaticData:()=>electron.ipcRenderer.invoke('getStaticData'),
} satisfies Window["electron"]);


// electron.contextBridge.exposeInMainWorld('electron', {
//   subscribeStatistics: (callback ) => {
//     const unsubscribe = () => {
//       electron.ipcRenderer.removeListener('statistics', callback);
//     };

//     electron.ipcRenderer.on('statistics', (_: any, stats: any) => {
//       callback(stats);
//     });

//     return unsubscribe;
//   },
//   getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
//   subscribeChangeView: (callback: (view: any) => void) => {
//     const unsubscribe = () => {
//       electron.ipcRenderer.removeListener('changeView', callback);
//     };

//     electron.ipcRenderer.on('changeView', (_: any, view: any) => {
//       callback(view);
//     });

//     return unsubscribe;
//   },
//   sendFrameAction: (payload: any) => {
//     electron.ipcRenderer.send('frameAction', payload);
//   }
// } satisfies Window["electron"]);

