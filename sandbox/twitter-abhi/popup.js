document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTitlesBtn').addEventListener('click', function () {
        // Get the value from the input text box and convert it to an integer
        const integerInput = document.getElementById('integerInput').value;
        const integerValue = parseInt(integerInput, 10);
        const videoList = document.getElementById('video-list');

        console.log(integerValue)
        // Check if the entered value is a valid integer
        if (!isNaN(integerValue)) {
            // Send a message to content.js with the integer value
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'autoScroll', integerArg: integerValue, videoListObj: videoList });
            });
        } else {
            alert('Please enter a valid integer.');
        }
    });
});