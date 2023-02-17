let x = 0;

function trychange() {
    const collection = document.getElementsByClassName("quote");
    collection[0].innerText= x.toString();
    x++;
}