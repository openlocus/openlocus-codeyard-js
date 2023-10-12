chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'autoScroll') {
        const integerArg = message.integerArg; // Extract the arguments from the message
        const videoListObj = message.videoListObj;
        autoScroll(100);
    }
});

async function autoScroll(numTitles) {
    const scrollInterval = 1000; // Time interval between scroll actions in milliseconds
    const numTitlesPerScroll = 20; // Number of tweet titles loaded per scroll (adjust as needed)

    const tweetTitles = [];
    index = 0;
    while (tweetTitles.length < numTitles) {
        const tweetTitleElements = document.querySelectorAll('[data-testid="tweetText"]');

        if (tweetTitleElements.length === 0) {
            // No more titles found, exit the loop
            break;
        }
        for (const element of tweetTitleElements) {
            const titleText = element.innerText.trim();
            if (titleText) {
                tweetTitles.push(index + "\t\]\t"+ titleText);
                index += 1;
            }
        }

        // Scroll down by a certain amount (adjust as needed)
        window.scrollBy(0, window.innerHeight * numTitlesPerScroll);

        // Wait for a brief moment to allow content to load
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
    }

    console.log(tweetTitles.slice(0, numTitles).join('\n'));
}