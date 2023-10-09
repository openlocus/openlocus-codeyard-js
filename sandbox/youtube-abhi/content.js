async function autoScroll(numTitles) {
  const scrollInterval = 1000; // Time interval between scroll actions in milliseconds
  const numTitlesPerScroll = 20; // Number of video titles loaded per scroll (adjust as needed)
  
  const videoTitles = [];

  while (videoTitles.length < numTitles) {
      const videoTitleElements = document.querySelectorAll('#video-title.yt-simple-endpoint.style-scope.ytd-video-renderer');
      
      if (videoTitleElements.length === 0) {
          // No more titles found, exit the loop
          break;
      }
      index=0
      for (const element of videoTitleElements) {
          const titleText = element.innerText.trim();
          if (titleText) {
              videoTitles.push(i + ")))" +titleText);
              index+=1;
          }
      }

      // Scroll down by a certain amount (adjust as needed)
      window.scrollBy(0, window.innerHeight * numTitlesPerScroll);

      // Wait for a brief moment to allow content to load
      await new Promise(resolve => setTimeout(resolve, scrollInterval));
  }

  console.log(videoTitles.slice(0,numTitles).join('\n'));
}

const numTitles = parseInt(prompt("Enter number"));
autoScroll(numTitles);