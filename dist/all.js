var jsSearchButton,
    imgTag,
    jsResults,
    apiKey = 'a5e95177da353f58113fd60296e1d250',
    userId = '132365033@N08';

window.addEventListener('load', function init() {
    jsSearchButton = document.getElementById('jsSearchButton');
    jsResults = document.getElementById('jsResults');
    jsSearchButton.addEventListener('click', callSearchFlickr);
});

function callSearchFlickr(e) {
    e.preventDefault();
    client(apiKey, userId);
}

var client = function (apiKey, userId) {
    var res;

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

    // Create 'p' for description and add it to container.
    var imgDescription = document.createElement('p');
    imgDescription.className = 'title';
    imgDescription.innerText = pic.title;
    imgContainer.appendChild(imgDescription);

    // Create 'a' element, give it class for click and 'a' stuff, add it to container.
    var imgHref = document.createElement('a');
    imgHref.setAttribute('href', pic.url_l);
    imgHref.className = 'embiggen';
    imgContainer.appendChild(imgHref);

    // Create img element, give it src and add it to the 'a'.
    var imgInner = document.createElement('img');
    imgInner.setAttribute('src', pic.url_s);
    imgHref.appendChild(imgInner);

    // Stick the whole thing in jsResults div.
    jsResults.appendChild(imgContainer);

    // Click a picture to get a bigger picture!
    imgHref.addEventListener('click', function (e) {
        e.preventDefault();
        overlay();
    });
    function overlay() {
        var modal = document.getElementById('overlay');
        modal.style.visibility = 'visible';
        modal.addEventListener('click', function () {
            modal.style.visiblity = (modal.style.visibility == "visible") ? "hidden" : "visible";
        });
    }
};

