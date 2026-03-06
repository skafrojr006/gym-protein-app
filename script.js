// Exercise Data
const exercises = {
    normal: ["Pushups", "Squats", "Running", "Plank", "Yoga"],
    gym: ["Bench Press", "Deadlift", "Lat Pulldown", "Leg Press", "Shoulder Press"]
};

// Food Data
const foods = {
    veg: ["Rice", "Dal", "Paneer", "Milk", "Nuts", "Fruits"],
    nonveg: ["Chicken", "Eggs", "Fish", "Salmon", "Protein Powder"]
};

function generatePlan() {

    let budget = document.getElementById("budget").value;
    let exerciseType = document.getElementById("exerciseType").value;
    let foodType = document.getElementById("foodType").value;
    let date = document.getElementById("date").value;

    if (!date) {
        alert("Please select a date");
        return;
    }

    let selectedExercises =
        exerciseType === "all"
            ? [...exercises.normal, ...exercises.gym]
            : exercises[exerciseType];

    let selectedFoods =
        foodType === "all"
            ? [...foods.veg, ...foods.nonveg]
            : foods[foodType];

    document.getElementById("output").innerHTML = `
        <h2>Generated Plan</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Exercises:</strong> ${selectedExercises.join(", ")}</p>
        <p><strong>Food:</strong> ${selectedFoods.join(", ")}</p>
    `;
}


// Google Search Function
function handleSearch() {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Please enter something to search");
        return;
    }

    searchGoogle(query);
}

async function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${CONFIG.GOOGLE_API_KEY}&cx=${CONFIG.SEARCH_ENGINE_ID}&q=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayResults(data.items);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayResults(results) {
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";

    if (!results) {
        resultContainer.innerHTML = "<p>No results found</p>";
        return;
    }

    results.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
            <hr>
        `;
        resultContainer.appendChild(div);
    });
}