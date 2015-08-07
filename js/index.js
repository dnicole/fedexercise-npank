var jsSearchButton,
    jsSearchField,
    imgTag,
    jsResults,
    apiKey = 'a5e95177da353f58113fd60296e1d250',
    userId = '132365033@N08';

window.addEventListener('load', function init() {
    jsSearchButton = document.getElementById('jsSearchButton');
    jsSearchField = document.getElementById('jsSearchField');
    jsResults = document.getElementById('jsResults');
    jsSearchButton.addEventListener('click', callSearchFlickr);
});

function callSearchFlickr(e) {
    e.preventDefault();

    var searched = jsSearchField.value;

    if (jsResults.index >= 1) {
        console.log('clearing old results');
        jsResults.clear();
    } else {
        console.log('nothing to clear');
    }

    jsSearchField.value = '';

    client(searched, apiKey, userId);
}

var client = function (searched, apiKey, userId) {
    var res;
    imgTag = searched;

    // Hello giant string!
    var endpoint = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' +
        apiKey +
        '&user_id=' +
        userId +
        '&format=json&nojsoncallback=1&extras=url_s,url_l';

    // Create AJAX request
    var searchFlickr = new XMLHttpRequest();

    // Send it off!
    searchFlickr.open('get', endpoint, true);

    searchFlickr.onload = function() {
        // Process results
        if (searchFlickr.status >= 200 && searchFlickr.status < 400) {
            showPics(JSON.parse(searchFlickr.responseText));
        } else {
            var err = document.createTextNode('Sorry, something went wrong.');
            jsResults.appendChild(err);
            throw new Error('No pictures for you!');
        }
    };

    searchFlickr.send();
};

var showPics = function (res) {
    var imgData = res.photos.photo;
    imgData.forEach(function(pic) {
        createHtmlTemplate(pic);
    });
};

var createHtmlTemplate = function (pic) {
    // Create container for pic
    var imgContainer = document.createElement('div');
    imgContainer.className = 'picture';

    // Create 'a' element, give it class for click and 'a' stuff, add it to container.
    var imgHref = document.createElement('a');
    imgHref.setAttribute('href', pic.url_l);
    imgHref.className = 'jsPic';
    imgContainer.appendChild(imgHref);

    // Create img element, give it src and add it to the 'a'.
    var imgInner = document.createElement('img');
    imgInner.setAttribute('src', pic.url_s);
    imgHref.appendChild(imgInner);

    // Create 'p' for description and add it to container.
    var imgDescription = document.createElement('p');
    imgDescription.className = 'description';
    imgDescription.innerText = pic.title;
    imgContainer.appendChild(imgDescription);

    // Stick the whole thing in results div.
    jsResults.appendChild(imgContainer);
};
