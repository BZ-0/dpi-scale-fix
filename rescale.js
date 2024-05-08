const facticalScale = 1.25;
const brokenScale = 2;

//
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

//
const rezoom = async ()=>{
    const tabId = (await getCurrentTab()).id;
    chrome.tabs.setZoom(tabId, facticalScale/brokenScale);
    chrome.scripting.insertCSS({
        target: { tabId },
        css: `:where(body) { zoom: ${brokenScale/facticalScale}; }`
    });
}

//
chrome.tabs.onActivated.addListener(rezoom);
chrome.tabs.onCreated.addListener(rezoom);
chrome.tabs.onUpdated.addListener(rezoom);
