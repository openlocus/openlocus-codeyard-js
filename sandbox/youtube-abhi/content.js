chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'autoScroll') {
        const integerArg = message.integerArg; // Extract the arguments from the message
        const videoListObj = message.videoListObj;
        autoScroll(100);
    }
});

async function autoScroll(numTitles) {
    const scrollInterval = 1000; // Time interval between scroll actions in milliseconds
    const numTitlesPerScroll = 20; // Number of video titles loaded per scroll (adjust as needed)

    const videoTitles = [];

    index = 0
    while (videoTitles.length < numTitles) {
        const videoTitleElements = document.querySelectorAll('#video-title.yt-simple-endpoint.style-scope.ytd-video-renderer');

        if (videoTitleElements.length === 0) {
            // No more titles found, exit the loop
            break;
        }
        // var videoList = document.getElementById('video-list');
        // if (videoList) {
        for (const element of videoTitleElements) {
            const titleText = element.innerText.trim();
            if (titleText) {
                videoTitles.push(index + "\t\]\t" + titleText)
                // console.log(index + "\t\]\t" + titleText)
                // var listItem = document.createElement('li');
                // listItem.textContent = index + '\]\t' + titleText;
                // console.log(titleText)
                // console.log(videoList)
                // videoList.appendChild(listItem.appendChild(document.createTextNode(listItem)));
                index += 1;
            }
        }
        // } else {
        // console.error('#video-list element not found');
        // }

        // Scroll down by a certain amount (adjust as needed)
        window.scrollBy(0, window.innerHeight * numTitlesPerScroll);

        // Wait for a brief moment to allow content to load
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
    }

    console.log(videoTitles.slice(0, numTitles).join('\n'));
}