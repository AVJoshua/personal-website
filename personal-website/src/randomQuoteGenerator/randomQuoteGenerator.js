const apiKey="jDrPRvhBbu66u9OZb1vHEQ==HdzosyIOBP267OqK"
const colors = [
    ["#FF8080", "#3d2202ff"],
    ["#FFF3DA", "#2f55d1ff"],
    ["#1b6653ff", "#82A0D8"],
    ["#28190cff", "#90de3eff"],
    ["#e7eff6ff", "#7e4b0bff"],
    ["#b7b7b7ff", "#522005ff"],
    ["#FFDEB4", "#953c3cff"],
    ["#FFAACF", "#B9F3E4"],
    ["#173221ff", "#4e792bff"],
    ["#F7ECDE", "#54BAB9"],
    ["#7897AB", "#2f111cff"],
    ["#B97A95", "#1299ceff"]
]



function randomNumber(array) {
    const randomNumber = Math.floor(Math.random()  * array.length)
    return array[randomNumber]
}



async function getNewRandomQuote () {
    const response = await fetch("https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom", {
        method: "GET",
        headers: {
            'X-Api-Key': apiKey,
        }
    })
    if (!response.ok) {
        alert("There was a problem getting a new quote!")
    }
    const data = await response.json()
    console.log(data)
    let colorCombo = randomNumber(colors)
    document.getElementById("random-quote-generator").style.background = `linear-gradient(45deg, ${colorCombo[0]}, ${colorCombo[1]})`
    const quoteText = data[0].quote
    const quoteAuthor = data[0].author
    document.getElementById("random-quote-text").innerHTML = quoteText
    document.getElementById("random-quote-author").innerHTML = quoteAuthor

}