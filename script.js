const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const  newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quote
function newQuote(){
    loading();
    //pick a new quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // si la Quote est trop longue, on souhaite lui appliquer un style css particulier
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        // cela signifie que la variable response ne sera pas à jour tant qu'il n'aura pas eu d'update de l'API
        apiQuotes = await response.json();
        Quote = newQuote();

    } catch (error) {
        // Catch Error Here
        alert(error);
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// en chargement / on load
getQuotes();

