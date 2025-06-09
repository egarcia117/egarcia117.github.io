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
                // Converts the csv into a 2D array
                const arr = data.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].split(',');
                }

                // Might be able to get away with keeping the decodeText as one string
                // then converting each row in arr into the same format as decodeText
                decodeText = decodeText.split("-");

                // Still need to handle when we have no entry found
                for (let i = 1; i < arr.length; i++){
                    if (arr[i][0] == decodeText[0]) {
                        var entry = arr[i];
                        break;
                    }
                }

                var printOut = "";

                for (let i = 0; i < arr[0].length; i++) {
                    printOut += `${arr[0][i]}: ${entry[i]} \r\n`;
                }
                
                document.getElementById("data-display").textContent = `${printOut}`;
            })
            .catch(error => {
                alert(`${error}`);
            });
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

