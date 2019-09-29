console.log('Hello I am decorator!??')
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "DECORATE":
                console.log('velocity is : ' + message.velocity)
                break;
            default:
                console.log('default');
        }
    }
);