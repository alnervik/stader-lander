const root = document.getElementById("root");

// Funktion för att skapa top-sectionen
function createTopSection() {
    //Skapa topsection-div för att lägga länderna inuti
    const topSection = document.createElement("div");
    topSection.classList.add("top-section");
    root.appendChild(topSection);

    //Hämta data från land.json
    fetch("land.json")
        .then(res => res.json())
        .then(data => {
            data.map(country => {
                //Skapa en div-container för varje land
                const countryContainer = document.createElement("div");
                countryContainer.innerText = country.countryname + " - ";
                topSection.appendChild(countryContainer);
                //Lägg till en eventlistener för att visa städerna i det specifika landet
                countryContainer.addEventListener("click", () => showCities(country.id));
                topSection.appendChild(countryContainer);

            })
            //Skapa en div för att länka till sidan med besökta städer
            const visitedCities = document.createElement("div");
            visitedCities.innerText = "Besökta städer";
            topSection.appendChild(visitedCities);
    })
    
}

//Funktion för att visa städerna i en specifik länd
function showCities(countryId) {

    //Hämta data från stad.json
    fetch("stad.json")
        .then(res => res.json())
        .then(data => {
            //Använd filter för att hämta städerna som matchar det land som klickas på
            cities = data.filter(city => city.countryid === countryId);
            //Temporärt så loggar jag för att se så det funkar, innan det ska in i main-section
            console.log(cities);
        });
}
createTopSection();

function createMainSection() {
    const mainSection = document.createElement("div");
    mainSection.classList.add("main-section");
    root.appendChild(mainSection);
}
createMainSection();