// 443 : MQTT over encrypted WebSockets (note: URL must be /mqtt )
client = new Paho.MQTT.Client("wss://mqtt.eclipseprojects.io:443/mqtt", "Display");

client.onConnectionLost = (responseObject) => console.log("Connection Lost: "+responseObject.errorMessage);

client.connect({
	onSuccess: onConnect
});

function onConnect() {
  console.log("onConnect");
  client.subscribe("joondalup/CarPark");
  message = new Paho.MQTT.Message('{"Display": "Connected"}');
  message.destinationName = "joondalup/CarPark";
  client.send(message);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

client.onMessageArrived = (message) => {
  console.log("onMessageArrived:"+message.payloadString);
  const parsed = JSON.parse(message.payloadString);
  let text1 = document.getElementById("example1");
  let text2 = document.getElementById("example2");
  let text3 = document.getElementById("example3");
  let text4 = document.getElementById("example4")
  const bay = parsed['lots-available'];
  const temp = parsed['temperature'];
  const time = parsed['time'];
  const location = parsed['location'];
  text1.innerText = `Available Spaces: ${bay}`;
  text2.innerText = `Temperature: ${temp}`;
  text3.innerText = `Time: ${time}`
  text4.innerText = `${location}`;
}
