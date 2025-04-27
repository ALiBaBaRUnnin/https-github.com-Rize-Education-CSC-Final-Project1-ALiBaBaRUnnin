document.getElementById("find-volunteers").addEventListener("click", function() {
    const apiUrl = "https://www.volunteermatch.org/api/v1/opportunities"; // Example URL
    const params = {
        location: "New York", 
        skills: "Education", 
        time_commitment: "Flexible" // Adjust as needed
    };

    const query = new URLSearchParams(params);
    const url = `${apiUrl}?${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVolunteerOpportunities(data);
        })
        .catch(error => {
            document.getElementById("volunteer-list").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
});

function displayVolunteerOpportunities(data) {
    const list = document.getElementById("volunteer-list");
    list.innerHTML = ""; // Clear any previous results

    if (data && data.opportunities) {
        data.opportunities.forEach(opportunity => {
            const div = document.createElement("div");
            div.classList.add("volunteer-opportunity");
            div.innerHTML = `
                <h3>${opportunity.title}</h3>
                <p>${opportunity.description}</p>
                <a href="${opportunity.url}" target="_blank">Learn More</a>
            `;
            list.appendChild(div);
        });
    } else {
        list.innerHTML = "<p>No volunteer opportunities found.</p>";
    }
}
