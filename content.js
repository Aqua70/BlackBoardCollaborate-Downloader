const download = (url, name) => {
    if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
    }
    if (chrome.runtime.lastError){
        console.log("asdaerrro");
        return
    }
    return fetch(url)
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);    
        return new Promise()
    })
    .catch((error) => {});
};



chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const element = document.getElementById("playback-video-playback-video_html5_api")
    if (!element){
        sendResponse({success: 0, message : "Go to a BBC video and wait until the BBC video has loaded"})
        return false;
    }
    if (!request.download){
        sendResponse({success: 0, message : "Invalid request format"});
        return false;
    }

    if (!request.name || request.name === ""){
        sendResponse({success : 0, message : "Please enter a file name"})
        return false;
    }


    const src = element.getAttribute("src")

    
    download(src, request.name)
    sendResponse({success: 2, message : "Downloading..."})
    return true;

    
});