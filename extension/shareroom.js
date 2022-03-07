function getRoomURL() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let tab = tabs[0];
        return tab.url;
    });
}

function copyRoomURL() {
    if (document.getElementById("copy-button").classList.contains("action-complete")) return;
    navigator.clipboard.writeText(getRoomURL()).then(function() {
        console.log('Copied room URL');
    }, function(err) {
        console.error('Could not copy room URL: ', err);
    });
    document.getElementById("copy-button").classList.add("action-complete");
}

document.getElementById("copy-button").addEventListener("click", copyRoomURL);