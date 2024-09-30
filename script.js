const root = document.getElementById("root");

// Funktion för att skapa top-sectionen
function createTopSection() {
    //Skapa topsection-div för att lägga landen inuti
    const topSection = document.createElement("div");
    topSection.classList.add("top-section");
    root.appendChild(topSection);

    //Hämta data från land.json
    fetch("land.json")
        .then(res => res.json())
        .then(data => {
            data.map(country => {
                console.log("country", country.countryname);
                //Skapa en div-container för varje land
                const countryContainer = document.createElement("div");
                countryContainer.innerText = country.countryname + " - ";
                topSection.appendChild(countryContainer);

            })
            const visitedCities = document.createElement("div");
            visitedCities.innerText = "Besökta städer";
            topSection.appendChild(visitedCities);
    })
}
createTopSection();