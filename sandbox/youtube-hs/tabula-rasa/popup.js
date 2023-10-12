console.log('This is a popup!');
console.log('It is Tabula Rasa!');


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, function(response) {
      console.log(response);  // Logs the video title
    });
  });

// Function to get videos from a playlist
function getPlaylistVideos() {
    //let videoElements = document.querySelectorAll('#contents .style-scope ytd-playlist-video-renderer');
    let videoElements = document.querySelectorAll('#contents');

    let videos = [];

    console.log("starting video iter");
    console.log(videoElements);

    videoElements.forEach(videoElement => {
        console.log("inside video element");
        let titleElement = videoElement.querySelector('#video-title');
        console.log(titleElement);       
        if (titleElement) {
            videos.push({
                title: titleElement.getAttribute('title'),
                url: titleElement.href
            });
        }
    });

    return videos;
}

// Console log the title of the page
console.log("Page Title:", document.title);

// Sample usage
console.log("Playlist Videos:", getPlaylistVideos());


