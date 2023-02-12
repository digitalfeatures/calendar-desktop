const { contextBridge, ipcRenderer } = require("electron");

class Loading {
  static sendEndloadingSignal() {
    ipcRenderer.invoke("endloading");
  }

  static onEndLoadingEvent(callback) {
    ipcRenderer.on("onEndLoading", callback);
  }

  static closeLoading() {
    ipcRenderer.invoke("closeLoading");
  }
}

contextBridge.exposeInMainWorld("FileBridge", {
  ping: () => {
    ipcRenderer.invoke("ping");
  },
});

contextBridge.exposeInMainWorld("Loading", {
  sendEndloadingSignal: Loading.sendEndloadingSignal,
  onEndLoadingEvent: Loading.onEndLoadingEvent,
  closeLoading: Loading.closeLoading,
});
