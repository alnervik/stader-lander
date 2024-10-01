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
                countryContainer.classList.add("country");
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
    const mainSection = document.querySelector('.main-section') || createMainSection();
    mainSection.innerHTML = '';


    //Hämta data från stad.json
    fetch("stad.json")
        .then(res => res.json())
        .then(data => {
            //Använd filter för att hämta städerna som matchar det land som klickas på
            cities = data.filter(city => city.countryid === countryId);
            //För varje stad i cities, skapa en div och lägg till stadens namn
            cities.map(city => {
                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city');

                const cityName = document.createElement('div');
                cityName.innerText = city.stadname;
                cityDiv.appendChild(cityName);
                //Skapar en div, hämtar "population:" och lägger till den i en div
                const cityPopulation = document.createElement('div');
                cityPopulation.classList.add('population');
                cityPopulation.innerText = `Invånare: ${city.population}`;
                cityDiv.appendChild(cityPopulation);
                
                mainSection.appendChild(cityDiv);
            });
        });
}
createTopSection();

function createMainSection() {
    const mainSection = document.createElement('div');
    mainSection.classList.add('main-section');
    root.appendChild(mainSection);
    return mainSection;
}
