let allIssues = []

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data;
            displayIssues(json.data)
        })
}

const displayIssues = (issues) => {
    /*1.get the content and empty
    2. get into every lessons
    3. create element
    4. append 
    */
    const cardContainer = document.getElementById("all-card-container")
    cardContainer.innerHTML = ''
    for (let issue of issues) {
        const card = document.createElement("div");
        card.classList = "bg-[#f8fafc] border-t-5 border-green-500 rounded-lg shadow-sm p-4 space-y-3"

        if (issue.status === "open") {
            card.classList.add('border-green-500')
        } else {
            card.classList.add("border-purple-500")
        }


        card.innerHTML = `
                    <div class="flex justify-between items-center">
                        <div>
                        <img class="h-6" src="assets/Open-Status.png" alt="">

                        </div>
                        <span class="bg-[#FEE2E2] text-[#EF4444] text-xs font-semibold px-3 py-1 rounded-full">${issue.priority}</span>
                    </div>

                    <h3 class="font-semibold text-[15px]">${issue.title}</h3>

                    <p class="text-xs text-gray-500">${issue.description}</p>

                    <div class="flex gap-2 flex-wrap">
                        <span class="bg-[#FEE2E2] text-[#EF4444] text-xs px-2 py-1 rounded-full">${issue.labels[0]}</span>
                        <span class="bg-[#FEF3C7] text-[#D97706] text-xs px-2 py-1 rounded-full">${issue.labels[1]}</span>
                    </div>

                    <hr class="border-gray-300">

                    <div class="flex justify-between text-xs text-gray-500">
                        <p>#${issue.id} by ${issue.author}</p>
                        <p>${issue.updatedAt}</p>
                    </div>
   
    `
        cardContainer.append(card)
    }
}


let btnAll = document.getElementById("btn-all")
let btnOpened = document.getElementById("btn-open")
let btnClosed = document.getElementById("btn-closed")
let count = document.getElementById("count")


document.getElementById("btn-all").addEventListener("click", function () {
    displayIssues(allIssues)
    count.innerText = allIssues.length;

    btnAll.classList.remove('btn-primary')
    btnOpened.classList.remove('btn-primary')
    btnClosed.classList.remove('btn-primary')

    btnAll.classList.add('btn-primary')

})

document.getElementById("btn-open").addEventListener("click", function () {
    const openIssues = allIssues.filter(issue => issue.status === "open")
    count.innerText = openIssues.length;
    displayIssues(openIssues)

    btnAll.classList.remove('btn-primary')
    btnOpened.classList.remove('btn-primary')
    btnClosed.classList.remove('btn-primary')

    btnOpened.classList.add('btn-primary')
})
document.getElementById("btn-closed").addEventListener("click", function () {
    const closedIssues = allIssues.filter(issue => issue.status === "closed")
    count.innerText = closedIssues.length;
    displayIssues(closedIssues)

    btnAll.classList.remove('btn-primary')
    btnOpened.classList.remove('btn-primary')
    btnClosed.classList.remove('btn-primary')

    btnClosed.classList.add('btn-primary')
})



function toggleEffect() {




}


loadIssues()