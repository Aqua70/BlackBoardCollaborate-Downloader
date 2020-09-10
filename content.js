


const download = (url, name) => {
    if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
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
        
    })
    .catch((error) => console.log(error.message));
};



chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const element = document.getElementById("playback-video-playback-video_html5_api")
    if (!element){
        sendResponse({success: 1, message : "Go to a BBC video and wait until the BBC video has loaded"})
        return
    }
    if (!request.download){
        sendResponse({success: 0, message : "Invalid request format"});
        return
    }

    if (!request.name || request.name === ""){
        sendResponse({success : 1, message : "Please enter a file name"})
        return
    }


    const src = element.getAttribute("src")

    
    download(src, request.name)
    sendResponse({success: 2, message : "Downloading..."})
    .then(response =>{
        sendResponse({success : 2, message : "Downloaded!"})
    })
    return true;

    
});