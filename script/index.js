let allIssues = []

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data;
            count.innerText = allIssues.length;
            displayIssues(json.data)
        })
}

const loadIssuedetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displaySingleIssue(details.data);
}
const displaySingleIssue = (single) => {

    const modalContainer = document.getElementById("modal-container");

    const statusColor =
        single.status === "open" ? "badge-success" : "badge-secondary";

    const priorityColor =
        single.priority === "high" ? "badge-error" : single.priority === "medium" ? "badge-warning" : "badge-neutral";

    modalContainer.innerHTML = 
        `
    
            <!-- Title -->
            <h2 class="text-2xl font-bold mb-3">
            ${single.title}
            </h2>

            <!-- Status Row -->
            <div class="flex items-center gap-3 text-sm mb-4">
            <span class="badge ${statusColor} text-white">
            ${single.status.toUpperCase()}
            </span>

            <span class="text-gray-500">
            Opened by ${single.author} • ${new Date(single.createdAt).toLocaleDateString()}
            </span>
            </div>

            <!-- Tags -->
            <div class="flex gap-2 mb-4">
            ${single.labels.map(label => `
            <span class="badge badge-outline">
            ${label.toUpperCase()}
            </span>
        `   
    ).join("")}
    </div>

    <!-- Description -->
    <p class="text-gray-600 mb-6">
        ${single.description}
    </p>

    <!-- Info Box -->
    <div class="bg-gray-100 rounded-lg p-5 flex justify-between">

        <div>
            <p class="text-sm text-gray-500">Assignee:</p>
            <p class="font-semibold">
                ${single.assignee ? single.assignee : "Not Assigned"}
            </p>
        </div>

        <div>
            <p class="text-sm text-gray-500">Priority:</p>
            <span class="badge ${priorityColor} text-white">
                ${single.priority.toUpperCase()}
            </span>
        </div>

    </div>
    `;

    document.getElementById("my_modal_5").showModal();
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

        //conditions
        let borderColor = issue.status === "open"
            ? "border-green-500"
            : "border-purple-500";
        let img = issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png";
        let btnColor = issue.priority === "high" ? "bg-[#FEE2E2] text-[#EF4444]" : issue.priority === "medium" ? "bg-[#FEF3C7] text-[#D97706]" : issue.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : "bg-gray-100 text-gray-500";

        card.innerHTML =
        `
            <div onclick="loadIssuedetail(${issue.id})" class="bg-[#f8fafc] border-t-5 ${borderColor} rounded-lg shadow-sm p-4 space-y-3">
                    <div class="flex justify-between items-center">
                        <div>
                        <img class="h-6" src="${img}" alt="">

                        </div>
                        <span class="${btnColor} text-xs font-semibold px-3 py-1 rounded-full">${issue.priority}</span>
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

let btnAll = document.getElementById("btn-all")
let btnOpened = document.getElementById("btn-open")
let btnClosed = document.getElementById("btn-closed")
let count = document.getElementById("count")
// btn toggle effect ....
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

loadIssues()

// search ''''
document.getElementById("searchBtn").addEventListener("click", function () {

    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.toLowerCase();

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;

    fetch(url)
        .then((res) => res.json())
        .then((json) => {

            const alldata = json.data;

            const filterData = alldata.filter(data =>
                data.title.toLowerCase().includes(searchValue)
            );
            count.innerText = filterData.length;
            displayIssues(filterData);
        });

});