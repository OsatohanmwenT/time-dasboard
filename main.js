const container = document.querySelector(".container")
const dailyEl = document.getElementById("daily")
const weeklyEl = document.getElementById("weekly")
const monthlyEl = document.getElementById("monthly")
let currentTimeframe = "weekly" // Default timeframe

async function fetchData() {
    try {
        let response = await fetch("https://github.com/OsatohanmwenT/time-dasboard/blob/main/data.json")
        let data = await response.json()
        renderData(data, currentTimeframe)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

function renderData(data, timeframe) {
    let template = ""
    data.forEach((result) => {
        template += `
            <div class="card" id="${result.title}">
                <div class="card-item">
                    <div class="head">
                        <h2>${result.title}</h2>
                        <img src="images/icon-ellipsis.svg" alt="icon-ellipsis">
                    </div>
                    <div class="time">
                        <h3>${result.timeframes[timeframe].current}hrs</h3>
                        <p>Last ${capitalizeFirstLetter(timeframe)} - ${result.timeframes[timeframe].previous}hrs</p>
                    </div>
                </div>
            </div>
        `
    })

    container.innerHTML = template
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

dailyEl.addEventListener("click", () => {
    currentTimeframe = "daily"
    fetchData()
})

weeklyEl.addEventListener("click", () => {
    currentTimeframe = "weekly"
    fetchData()
})

monthlyEl.addEventListener("click", () => {
    currentTimeframe = "monthly"
    fetchData()
})
// Initial data fetch and rendering
fetchData()
