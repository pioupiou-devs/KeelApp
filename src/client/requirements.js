// Page that will appear upon loading game for first time
// Goal: asks user for number of players, pins and rounds they want to play with

const SERVER_URL = "http://localhost:3000";

/**
 * Show error text on page
 * @param {String} txt 
 */
function showErrorText(txt) {
    let errorText = document.getElementById("txtRequirementsError");
    errorText.textContent = txt;
    errorText.style.visibility = 'visible';

    console.error("ERROR (requirements) - ", txt);
}

/**
 * Return true if there are as much playerNames as asked with nbPlayers
 * @param {number} nbPlayers 
 * @param {Array<String>} playersNames 
 * @returns {boolean}
 */
function hasEnoughPlayerNames(nbPlayers, playersNames) {
    return (playersNames.length == nbPlayers);
}

/**
 * Return true if there are duplicate names in playerNames
 * @param {Array<String>} playersNames 
 * @returns {boolean}
 */
function containDuplicateNames(playersNames) {    
    return new Set(playersNames).size !== playersNames.length
}

/**
 * Send json data to target url
 * @param {String} url
 * @param {String} data
 * @param {String} method
 * @returns {String} Response JSON
 */
async function sendRequest(url, data={}, method) {
    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    return response.json();
}

/**
 * Check form inputs and sends a JSON with all data to server
 * @returns {boolean} True if all inputs are valid, else False
 */
function setRequirements() {
    let inputNbPlayers = +document.getElementById("nbPlayers").value;
    let inputNames = document.getElementById("playersNames").value.split(',');
    inputNames = inputNames.map(name => {
        return name.trim();
    });
    let inputNbRounds = +document.getElementById("nbRounds").value;
    let inputNbPins = +document.getElementById("nbPins").value;

    if (!hasEnoughPlayerNames(inputNbPlayers, inputNames)) {
        showErrorText("Number of names is not the number of players.")
        return false;
    } else if (inputNbPlayers > 1 && containDuplicateNames(inputNames)) {
        showErrorText("Some players have the same name.")
        return false;
    } else {
        let redirectURL = location.href.substring(0, location.href.lastIndexOf("/")+1) + "scoreboard.html";
        let data = JSON.stringify({nbKeel:inputNbPins, nbFrames:inputNbRounds, players:inputNames, "redirect":redirectURL});
        console.log(data);

        // Send json to server
        // sendRequest(SERVER_URL + '/api/grid',data, 'PUT')
        //     .catch((error) => {
        //         console.error("ERROR (sending requirements to server) - ", error);
        //     });
        fetch(SERVER_URL + '/api/grid'+`?nbK=${inputNbPins}&nbF=${inputNbRounds}&n=${inputNames}&u=${redirectURL}`, {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow',
        })
            .then(response => console.log(response.redirected))
            .catch(error => console.error(error))

        return true;
    }
}