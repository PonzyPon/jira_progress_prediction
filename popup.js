// chrome.storage.sync.get('color', function (data) {
// });

// chrome.storage.sync.set({ color: item }, function () {
//     console.log('I am callback');
// })

// changeColor.onclick = function (element) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { type: "getText", velocity: 30 });
//     });
// };