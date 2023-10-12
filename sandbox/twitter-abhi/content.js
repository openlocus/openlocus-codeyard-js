// Function to inject Bootstrap CSS from a CDN
function injectBootstrapCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"; // Replace with the CDN link to Bootstrap CSS

    document.head.appendChild(link);
}

// Call the function to inject Bootstrap CSS
injectBootstrapCSS();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getTweetTitles') {
        const integerArg = message.integerArg; // Extract the arguments from the message
        getTweetTitles(100)
    }
    if (message.action === 'getTitleTags') {
        var tweets = [];
        (async () => {
            const numTitles = 10; // Define the number of titles you want to collect
            var tmp = await createTagsAndTitles(numTitles);
            tweets.push(...tmp);
            // for (var e = 0; e < tweets.length; e++) {
            //     addTagBeforeElements(tweets[e]);
            // }
        })();
        showTagDialogBox(tweets)
    }
});

async function createTagsAndTitles(numTitles) {
    const scrollInterval = 1000; // Time interval between scroll actions in milliseconds
    const numTitlesPerScroll = 1; // Number of tweet titles loaded per scroll (adjust as needed)

    const tweets = [];
    while (tweets.length < numTitles) {
        const tweetTitleElements = document.querySelectorAll('[data-testid="tweetText"]');
        const tweetElements = document.querySelectorAll('[data-testid="tweet"]');

        if (tweetTitleElements.length === 0) {
            // No more titles found, exit the loop
            break;
        }
        for (var element = 0; element < tweetTitleElements.length; element++) {
            const titleText = tweetTitleElements[element].innerText.trim();
            if (titleText) {
                var Tag = assignTag(titleText, tweetElements[element])
                tweets.push(Tag)
                addTagBeforeElements(Tag);
                console.log(Tag)
            }
        }

        // Scroll down by a certain amount (adjust as needed)
        window.scrollBy(0, window.innerHeight * numTitlesPerScroll);

        // Wait for a brief moment to allow content to load
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
    }
    return tweets
}

function addTagBeforeElements(Tag) {
    const textElement = document.createElement("div");
    const element = Tag.tweetElement
    console.log(Tag)

    if (Tag.tag == 'sports') {
        textElement.textContent = "sports"; // You can style this class in your CSS
    } else if (Tag.tag == 'politics') {
        textElement.textContent = "politics"; // You can style this class in your CSS
    } else {
        textElement.textContent = "tech"; // You can style this class in your CSS
    }
    textElement.style.backgroundColor = Tag.tagColor
    textElement.style.color = "white"
    textElement.style.borderRadius = "5px"
    textElement.style.width = 'auto'
    element.parentNode.style.border = "2px solid white"

    // Set the text content
    textElement.textContent = Tag.tag;
    // console.log(Tag.tag)
    element.parentNode.insertBefore(textElement, element);
}



function showTagDialogBox(tweets) {
    var originalDiv = document.querySelector(".css-1dbjc4n.r-g2wdr4.r-14wv3jr.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x");

    if (originalDiv) {
        // Clone the original div
        var clonedDiv = originalDiv.cloneNode(true); // true means to clone all child elements as well
        // Insert the cloned div into the DOM (you can choose where to insert it)
        var newContent = document.createElement("div");

        // Add styling classes to the "Filter" text and checkboxes

        newContent.innerHTML = `
        <div style='padding-left: 10px; padding-top: 10px; padding-bottom: 10px'>
            <h1 class="filter-text display-4" style='padding: 10 10 10 10'>Filter</h1>
            <div class="custom-control custom-checkbox" style='padding: 10 10 10 10'>
                <input type="checkbox" id="techCheckbox" class="custom-control-input" name="tech" value="Tech">
                <label class="custom-control-label" for="techCheckbox">Tech</label>
            </div>
            <div class="custom-control custom-checkbox" style='padding: 10 10 10 10'>
                <input type="checkbox" id="politicsCheckbox" class="custom-control-input" name="politics" value="Politics">
                <label class="custom-control-label" for="politicsCheckbox">Politics</label>
            </div>
            <div class="custom-control custom-checkbox" style='padding: 10 10 10 10'>
                <input type="checkbox" id="sportsCheckbox" class="custom-control-input" name="sports" value="Sports">
                <label class="custom-control-label" for="sportsCheckbox">Sports</label>
            </div>
        </div>
        `;

        // Replace the content of the cloned div with the new content
        clonedDiv.innerHTML = '';
        clonedDiv.appendChild(newContent);

        // Insert the cloned div above the original div
        originalDiv.parentNode.insertBefore(clonedDiv, originalDiv);

        // Add event listeners to the checkboxes
        const techCheckbox = document.getElementById("techCheckbox");
        const politicsCheckbox = document.getElementById("politicsCheckbox");
        const sportsCheckbox = document.getElementById("sportsCheckbox");

        techCheckbox.addEventListener("change", function () {
            // Handle the change of the Tech checkbox here
            if (techCheckbox.checked) {
                // Checkbox is checked
                console.log("Tech checkbox is checked");
                for (e in tweets) {
                    if (e.tag != 'tech') {
                        console.log(e)
                        e.tweetElement.remove()
                    }
                }
            } else {
                // Checkbox is unchecked
                console.log("Tech checkbox is unchecked");
            }
        });

        politicsCheckbox.addEventListener("change", function () {
            // Handle the change of the Politics checkbox here
            if (politicsCheckbox.checked) {
                // Checkbox is checked
                console.log("Politics checkbox is checked");
                for (e in tweets) {
                    if (e.tag != 'politics') {
                        console.log(e)
                        e.tweetElement.remove()
                    }
                }
            } else {
                // Checkbox is unchecked
                console.log("Politics checkbox is unchecked");
            }
        });

        sportsCheckbox.addEventListener("change", function () {
            // Handle the change of the Sports checkbox here
            if (sportsCheckbox.checked) {
                // Checkbox is checked
                console.log("Sports checkbox is checked");
                for (e in tweets) {
                    if (e.tag != 'sports') {
                        console.log(e)
                        e.tweetElement.remove()
                    }
                }
            } else {
                // Checkbox is unchecked
                console.log("Sports checkbox is unchecked");
            }
        });
    }
}

function assignTag(tweetTitle, tweetElement) {
    var tags = ['tech', 'politics', 'sports']
    var tagColors = ['blue', 'green', 'red']

    var rem = tweetTitle.length % 3

    if (rem == 0) {
        return { tweetTitle: tweetTitle, tag: tags[0], tagColor: tagColors[0], tweetElement: tweetElement }
    } else if (rem == 1) {
        return { tweetTitle: tweetTitle, tag: tags[1], tagColor: tagColors[1], tweetElement: tweetElement }
    } else {
        return { tweetTitle: tweetTitle, tag: tags[2], tagColor: tagColors[2], tweetElement: tweetElement }
    }
}

async function getTweetTitles(numTitles) {
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
                tweetTitles.push(titleText);
                index += 1;
            }
        }

        // Scroll down by a certain amount (adjust as needed)
        window.scrollBy(0, window.innerHeight * numTitlesPerScroll);

        // Wait for a brief moment to allow content to load
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
    }

    // console.log(tweetTitles.slice(0, numTitles).join('\n'));
    return tweetTitles
}