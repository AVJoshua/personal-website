function getNewRandomQuote () {
    // Make a GET request to the Quotable API
fetch("https://api.quotable.io/quotes/random")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    const quoteText = data[0].content
    const quoteAuthor = data[0].author
    document.getElementById("random-quote-text").innerHTML = quoteText
    document.getElementById("random-quote-author").innerHTML = quoteAuthor
  })
  .catch(error => {
    alert("There was a problem getting a new quote");
  });

}