document.getElementById('startFetching').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "start"}, function(response) {
        console.log(response.status);
    });
});

document.getElementById('stopFetching').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "stop"}, function(response) {
        console.log(response.status);
    });
});
