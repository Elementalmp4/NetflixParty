const RESOURCE_URL = "netflixparty.voidtech.de"; //Make sure this URL has no protocol. Just the domain.

function showMessage(message) {
    document.getElementById("message").style.display = "block";
    document.getElementById("subtitle").style.display = "none";
    document.getElementById("message").innerHTML = message;
}

const GatewayServerURL = "wss://" + RESOURCE_URL + "/gateway"
var Gateway = new WebSocket(GatewayServerURL);

Gateway.onopen = function() {
    console.log("Connected To Gateway");
}

Gateway.onclose = function() {
    console.log("Connection Lost");
}

function reloadWithRoomID(roomID) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];
        let url = new URL(tab.url);
        if (url.searchParams.has("roomID")) url.searchParams.set("roomID", roomID);
        else url.searchParams.append("roomID", roomID);
        chrome.tabs.update(tab.id, { url: url.toString() });
        window.close();
    });
}

Gateway.onmessage = function(message) {
    const response = JSON.parse(message.data);
    console.log(response);
    if (response.success) reloadWithRoomID(response.response.roomID);
    else showMessage("Error: " + response.response);
}

function createRoom() {
    const theme = document.getElementById("room-colour-picker").value;
    const payload = {
        "type": "create-party",
        "data": {
            "theme": theme
        }
    }
    Gateway.send(JSON.stringify(payload));
}

document.getElementById("create-button").addEventListener("click", createRoom);