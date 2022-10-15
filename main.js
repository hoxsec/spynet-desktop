require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

let win

function createWindow() {
    win = new BrowserWindow({
        width: process.env.WINDOW_WIDTH,
        height: process.env.WINDOW_HEIGHT,
        center: process.env.CENTER_WcccINDOW_ON_STARTUP,
        title: process.env.WINDOW_TITLE,
        darkTheme: process.env.DARK_THEME,
        frame: true,
    });

    win.loadURL("http://localhost:1000/");

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Allow hot reloading when env is development.
if (env === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    });
}

app.on('ready', createWindow) 