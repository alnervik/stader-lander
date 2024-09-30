const root = document.getElementById("root");

function createTopSection() {

    fetch("land.json")
        .then(res => res.json())
        .then(data => {
            data.map(country => {
                console.log("country", country.countryname);

                const countryContainer = document.createElement("div");
                countryContainer.innerText = country.countryname;
                root.appendChild(countryContainer);

            })
    })
}

createTopSection();