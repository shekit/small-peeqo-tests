const ipcRenderer = require('electron').ipcRenderer

ipcRenderer.on("hotword", function(evt,arg){
		console.log("HOTWORD",arg)
})

ipcRenderer.on("final-results", function(evt,msg){
		console.log("FINAL", msg)
})

ipcRenderer.on("partial-results", function(evt, msg){
	console.log("Partial", msg)
})