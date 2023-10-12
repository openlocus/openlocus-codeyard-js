// Code to parse YouTube page
function getVideoTitle() {
    let titleElement = document.querySelector('h1.title');
    if (titleElement) {
        return titleElement.innerText;
    }
    return null;
}

function getPageTitle() {
    return document.title;
}

// Listening for a message from the popup
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       if(request.message === "clicked_browser_action") {
//         sendResponse({title: getPageTitle()});
//     }
//     }
//   );

  function getAllVideoTitles() {
    // Find all video title elements in the playlist
    let videoElements = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
    
    console.log(videoElements);

    // Extract and return all video titles
    let titles = [];
    videoElements.forEach(element => {
        titles.push(element.innerText.trim());
    });

    return titles;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "clicked_browser_action") {
      sendResponse({titles: getAllVideoTitles()});
    }
  }
);


