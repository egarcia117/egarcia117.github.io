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

        fetch('furniture-inventory-dummy.csv')
            .then(response => response.text())
            .then(data => {
                const arr = (data.split('\n'))
                //alert(`${typeof(data)}`);
                document.getElementById("data-display").textContent = `${arr[2]}`;
            })
            .catch(error => {
                alert(`${error}`);
            });

        //document.getElementById("data-display").textContent = `${globalThis.csvData}`;
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

