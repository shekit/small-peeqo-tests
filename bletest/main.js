'use strict';

const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 480
	})

	mainWindow.loadURL('file://'+__dirname+'/app/index.html')

	if(process.platform == 'darwin'){
		mainWindow.webContents.openDevTools();
	} else {
		// for full screen on pi
		//mainWindow.webContents.openDevTools();
		//mainWindow.setMenu(null);
		//mainWindow.setFullScreen(true);
		//mainWindow.maximize();
	}
})

app.on('window-all-closed', function(){
	app.quit();
})