// element
calculateButton = document.getElementById("prediction-button");
velocity = document.getElementById("velocity");

// event bind
calculateButton.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "SHOW_PROGRESS_PREDICTION",
            velocity: velocity.value,
        });
    });
};