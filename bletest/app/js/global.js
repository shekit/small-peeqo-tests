const bleno = require('bleno')
const wifi = require('pi-wifi')

var bleAdvertising = false;
var ble_name = 'peeqo';

var serviceUuid = ['12ab'];

var newWifi = {
	ssid: "",
	password: ""
}

Offline.options = {
		checks: {xhr: {url: 'http://google.com'}},
		requests: false,
		checkOnLoad: true
}

Offline.on('down', function(){
	console.log("NO INTERNET")
	startBleAdvertising()
})

Offline.on('up', function(){
	console.log("YAY INTERNET")
	stopBleAdvertising()
})

Offline.on('checking', function(){
	console.log("checking INTERNET")
})

bleno.on('advertisingStart', function(error){
		console.log("advertising")
		bleAdvertising = true;
		if(error){
			console.log("Advertising start error: " + error)
		} else {
			bleno.setServices([
				new bleno.PrimaryService({
					uuid: serviceUuid[0],
					characteristics: [
						// wifi ssid characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '34cd',
							properties: ['write'],

							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data;
								console.log(data[0])
								console.log('Wifi SSID: '+this.value.toString("utf-8"));
								newWifi.ssid = this.value.toString("utf-8")
								callback(this.RESULT_SUCCESS);
							}
						}),
						// password characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '45ef',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data
								console.log("Wifi Password: "+this.value.toString("utf-8"))
								newWifi.password = this.value.toString("utf-8")

								wifi.connect(newWifi.ssid, newWifi.password, function(){
									console.log("succesfully connected to wifi")
								});

								callback(this.RESULT_SUCCESS);
							}
						}),

						new bleno.Characteristic({
							value: null,
							uuid: '67gh',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								console.log("Stop advertising");

								if(data.toString("utf-8")=="a"){
									ble.stopBleAdvertising();
								}
								
								callback(this.RESULT_SUCCESS)
							}
						})
					]
				})

			])
		}
	})

bleno.on('advertisingStop', function(){
		console.log("stop advertising")
		bleAdvertising = false;
	})

bleno.on('stateChange', function(state){
	if(state === 'poweredOn'){
		
	}
})

var startBleAdvertising = function(){
		if(bleAdvertising == false){
			bleno.startAdvertising(ble_name, serviceUuid)
		}
	}

var stopBleAdvertising = function(){
		if(bleAdvertising == true){
			bleno.stopAdvertising();
		}
	}