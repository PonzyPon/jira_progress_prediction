// element
calculateButton = document.getElementById("prediction-button");
velocity = document.getElementById("velocity");

// event bind
calculateButton.onclick = function (element) {
    chrome.storage.sync.set({ velocity: velocity.value }, function () {
        console.log("velocity " + velocity.value + ' was saved.');
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "SHOW_PROGRESS_PREDICTION",
            velocity: velocity.value,
        });
    });
};

chrome.storage.sync.get('velocity', function (data) {
    if (data.velocity === void 0) {
        return;
    }
    velocity.value = data.velocity;
});