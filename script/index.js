const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayIssues(json.data))
}

const displayIssues = (issues) => {
    /*1.get the content and empty
    2. get into every lessons
    3. create element
    4. append 
    */
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ''
    for (let issue of issues) {
        const card = document.createElement("div")
        //card.classList= "bg-[#f8fafc] border-t-4 border-green-500 rounded-lg shadow-sm p-4 space-y-3"
        card.innerHTML = `
    
                <div class="bg-[#f8fafc] border-t-4 border-green-500 rounded-lg shadow-sm p-4 space-y-3">

                    <div class="flex justify-between items-center">
                        <img class="h-6" src="assets/Open-Status.png" alt="">
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

                </div>

    
    `
        cardContainer.append(card)
    }
}


loadIssues()