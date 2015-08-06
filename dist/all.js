var searchButton,
    searchField,
    apiKey = 'a5e95177da353f58113fd60296e1d250',
    userId = '132365033@N08';

window.addEventListener('load', function init() {
    searchButton = document.getElementById('searchButton');
    searchField = document.getElementById('searchField');
    searchButton.addEventListener('click', callSearchFlickr);
});

function callSearchFlickr(e) {
    e.preventDefault();
    // alert('who\'s going chicken hunting?');
    var searched = searchField.value;

    console.log(searched);
    searchField.value = '';
    console.log(searched);
    client(searched, apiKey, userId);
}

var client = function (searched, apiKey, userId) {
    // Hello giant string!
    var endpoint = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' +
        apiKey +
        '&user_id=' +
        userId +
        '&format=json&nojsoncallback=1';
    var searchFlickr = new XMLHttpRequest();
    searchFlickr.open('get', endpoint, true);
    searchFlickr.send();
};



