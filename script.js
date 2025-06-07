// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        //alert("You Qr is : " + decodeText, decodeResult);
        document.getElementById("data-display").textContent = `${decodeText}`;

        var data = getCSV('furniture-inventory-dummy.csv');
        document.getElementById("data-display").textContent = `${data.status}`;

    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

async function getCSV(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    
    //const csvFile = await response.;

    return response;
}