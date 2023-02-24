dt = undefined;
trychange();

async function updatefacts() {
    if (dt == undefined) {
        dt = await fetchJSON('https://raw.githubusercontent.com/RicAlvesO/EngWeb2023/master/TPC1/TPC/data/facts.json');
    }
}

async function fetchJSON(url) {
    const response = await fetch(url);
    return response.json();
}

async function trychange() {
    await updatefacts();
    const collection = document.getElementsByClassName("quote");
    const i = getRandomInt(dt.total);
    collection[0].innerText= "Random Fact #"+(dt.facts[i].id+1)+": "+dt.facts[i].info+"!";

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
