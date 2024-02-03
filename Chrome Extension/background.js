let isFetching = false;
let lastFetchedUrls = new Set(); // Store unique URLs
let currentDay = new Date().toLocaleDateString(); // Store the current day

function fetchHistory() {
  const queryStartTime = new Date();
  queryStartTime.setHours(0,0,0,0); // Set to 12:00 AM of the current day
  const queryEndTime = new Date();
  queryEndTime.setHours(23,59,59,999); // Set to 11:59 PM of the current day

  chrome.history.search({
      'text': '', // Fetch all history items
      'startTime': queryStartTime.getTime(),
      'endTime': queryEndTime.getTime(),
      'maxResults': 100 // Adjust based on your needs
  }, (historyItems) => {
      const today = new Date().toLocaleDateString();
      // Check if the day has changed
      if (today !== currentDay) {
          lastFetchedUrls.clear(); // Clear the set for the new day
          currentDay = today; // Update the current day
      }

      // Filter and process new history items
      const newItems = historyItems.filter(item => !lastFetchedUrls.has(item.url));
      newItems.forEach(item => {
          console.log(`New history item: ${item.url}`);
          lastFetchedUrls.add(item.url); // Add new URL to the set
      });
  });
}

// The startFetching and stopFetching functions remain the same

function startFetching() {
  if (isFetching) return; // Avoid starting multiple intervals
  isFetching = true;
  fetchHistory(); // Fetch immediately, then start interval
  setInterval(() => {
    if (!isFetching) return; // Stop the interval if fetching has been stopped
    fetchHistory();
  }, 10000); // Adjust the interval as needed
}

function stopFetching() {
  isFetching = false; // This will stop the interval started in startFetching
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
      startFetching();
      sendResponse({status: "Started fetching history"});
    } else if (request.command === "stop") {
      stopFetching();
      sendResponse({status: "Stopped fetching history"});
    }
    return true; // To allow asynchronous use of sendResponse
  });
  
