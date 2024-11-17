const { app, BrowserWindow } = require('electron');
const path = require('path');
const expressApp = require('./index');  // 引入你的 Express 应用

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false, // 允许在渲染进程中使用 Node.js 模块
        webSecurity: false // 关闭 Web 安全设置
    }
  });

  mainWindow.loadURL('http://localhost:8001/index.html');  // 加载 Express 应用
  // mainWindow.webContents.openDevTools();

}
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
