// Retrieve the search term input field and search button
const searchTermInput = document.getElementById('search_term');
const searchButton = document.getElementById('searchButton');

// Attach event listener to the search button
searchButton.addEventListener('click', search);

// Function to perform the search
function search() {
  // Retrieve the search term from the input field
  const searchTerm = searchTermInput.value;

  // Make a request to the Oxylabs API
  // Replace YOUR_API_KEY with your own Oxylabs API key
  const url = `https://data.oxylabs.io/v1/queries?query=${encodeURIComponent(searchTerm)}`;

  // Send a GET request to the Oxylabs API
  fetch(url, {
    headers: {
      'Authorization': 'Token YOUR_API_KEY'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Process the response data
      if (data && data.results) {
        const searchResults = data.results;
        displayResults(searchResults); // Display the search results
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to display the search results in HTML format
function displayResults(searchResults) {
  // Retrieve the results container
  const resultsContainer = document.getElementById('results');

  // Clear previous results
  resultsContainer.innerHTML = '';

  // Iterate over the search results and create HTML elements to display each result
  searchResults.forEach(result => {
    // Create a div element for each result
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    // Create elements for displaying the result details
    const title = document.createElement('p');
    title.textContent = result.title;
    const url = document.createElement('a');
    url.href = result.url;
    url.textContent = 'View';

    // Append the result details to the result div
    resultDiv.appendChild(title);
    resultDiv.appendChild(url);

    // Append the result div to the results container
    resultsContainer.appendChild(resultDiv);
  });
}
