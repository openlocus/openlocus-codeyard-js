// Global Variables

var techCheckboxVal = 0
var sportsCheckboxVal = 0
var politicsCheckboxVal = 0


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
    if (message.action === 'getTitleTags') {
        // reload webpage
        showTagDialogBox([])
        getCheckBoxUpdates()

        // First assign tags to already loaded Tweets
        const tweetTitleElements = document.querySelectorAll('[data-testid="cellInnerDiv"]');

        for (const element of tweetTitleElements) {
            const tweetElement = element.querySelector('[data-testid="tweetText"')
            if (tweetElement) {
                // console.log("Tweet Text:", tweetText.textContent);
                var assignedTag = assignTag(Element)
                console.log(assignedTag)
                if ((assignedTag.tag == "sports" && sportsCheckboxVal == 1) ||
                    (assignedTag.tag == "tech" && techCheckboxVal == 1) ||
                    (assignedTag.tag == "politics" && politicsCheckboxVal == 1)) {
                    console.log("HI")
                    addTagBeforeElements(assignedTag)
                } else {
                    element.style.visibility = 'hidden';
                }
            }
        }

        // find the primaryColumn div
        const targetNode = document.querySelector('[data-testid="primaryColumn"]');

        if (targetNode) {
            const config = { childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                mutationList.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach((node) => {
                            // Check if the added node has the data-testid attribute set to 'cellInnerDiv'
                            if (node instanceof Element && node.getAttribute('data-testid') === 'cellInnerDiv') {
                                // Find and print the content of the 'tweetText' div
                                const tweetTextElement = node.querySelector('[data-testid="tweetText"]');
                                if (tweetTextElement) {
                                    // console.log("Tweet Text:", tweetText.textContent);
                                    var assignedTag = assignTag(tweetTextElement)
                                    console.log(assignedTag)
                                    if ((assignedTag.tag == "sports" && sportsCheckboxVal == 1) ||
                                        (assignedTag.tag == "tech" && techCheckboxVal == 1) ||
                                        (assignedTag.tag == "politics" && politicsCheckboxVal == 1)) {
                                        console.log("HI")
                                        addTagBeforeElements(assignedTag)
                                    } else {
                                        node.style.visibility = 'hidden';
                                    }
                                }
                            }
                        });
                    }
                });
            };

            const observer = new MutationObserver(callback);

            observer.observe(targetNode, config);
        } else {
            console.log('The target node was not found.');
        }
    }
});


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
    textElement.style.display = 'inline'
    textElement.style.width = 'fit-content'
    textElement.style.backgroundColor = Tag.tagColor
    textElement.style.color = "white"
    textElement.style.borderRadius = "5px"
    textElement.style.padding = "5px 10px 5px 10px"

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
                <input type="checkbox" id="techCheckboxVal" class="custom-control-input" name="tech" value="Tech">
                <label class="custom-control-label" for="techCheckboxVal">Tech</label>
            </div>
            <div class="custom-control custom-checkbox" style='padding: 10 10 10 10'>
                <input type="checkbox" id="politicsCheckboxVal" class="custom-control-input" name="politics" value="Politics">
                <label class="custom-control-label" for="politicsCheckboxVal">Politics</label>
            </div>
            <div class="custom-control custom-checkbox" style='padding: 10 10 10 10'>
                <input type="checkbox" id="sportsCheckboxVal" class="custom-control-input" name="sports" value="Sports">
                <label class="custom-control-label" for="sportsCheckboxVal">Sports</label>
            </div>
        </div>
        `;

        // Replace the content of the cloned div with the new content
        clonedDiv.innerHTML = '';
        clonedDiv.appendChild(newContent);

        // Insert the cloned div above the original div
        originalDiv.parentNode.insertBefore(clonedDiv, originalDiv);
    }
}


function getCheckBoxUpdates() {
    // Add event listeners to the checkboxes
    const techCheckbox = document.getElementById("techCheckboxVal");
    const politicsCheckbox = document.getElementById("politicsCheckboxVal");
    const sportsCheckbox = document.getElementById("sportsCheckboxVal");

    techCheckbox.addEventListener("change", function () {
        // Handle the change of the Tech checkbox here
        if (techCheckbox.checked) {
            // Checkbox is checked
            console.log("Tech checkbox is checked");
            techCheckboxVal = 1
        } else {
            // Checkbox is unchecked
            console.log("Tech checkbox is unchecked");
            techCheckboxVal = 0
        }
    });

    politicsCheckbox.addEventListener("change", function () {
        // Handle the change of the Politics checkbox here
        if (politicsCheckbox.checked) {
            // Checkbox is checked
            console.log("Politics checkbox is checked");
            politicsCheckboxVal = 1
        } else {
            // Checkbox is unchecked
            console.log("Politics checkbox is unchecked");
            politicsCheckboxVal = 0
        }
    });

    sportsCheckbox.addEventListener("change", function () {
        // Handle the change of the Sports checkbox here
        if (sportsCheckbox.checked) {
            // Checkbox is checked
            console.log("Sports checkbox is checked");
            sportsCheckboxVal = 1
        } else {
            // Checkbox is unchecked
            console.log("Sports checkbox is unchecked");
            sportsCheckboxVal = 0
        }
    });

}

i = 0
function assignTag(tweetElement) {
    var tags = ['tech', 'politics', 'sports']
    var tagColors = ['#d64161', '#b5e7a0', '#4040a1']

    var tweetTitle = tweetElement.textContent

    var rem = i % 3

    if (rem == 0) {
        i += 1
        return { tweetTitle: tweetTitle, tag: tags[0], tagColor: tagColors[0], tweetElement: tweetElement }
    } else if (rem == 1) {
        i += 1
        return { tweetTitle: tweetTitle, tag: tags[1], tagColor: tagColors[1], tweetElement: tweetElement }
    } else {
        i += 1
        return { tweetTitle: tweetTitle, tag: tags[2], tagColor: tagColors[2], tweetElement: tweetElement }
    }
}

function getAvailableTweets() {
    const tweetTitles = [];
    const tweetTitleElements = document.querySelectorAll('[data-testid="tweetText"]');

    for (const element of tweetTitleElements) {
        const titleText = element.innerText.trim();
        if (titleText) {
            tweetTitles.push(titleText);
        }
    }

    return tweetTitleElements
}