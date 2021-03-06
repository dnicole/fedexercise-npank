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
    jsSearchButton.style.visibility = 'hidden';
    createClearButton();
};

var createClearButton = function () {
    var clearButton;
    var pageContain = document.getElementById('container');
    if (clearButton === undefined) {
        clearButton = document.createElement('a');
        clearButton.className = 'button do-over';
        clearButton.setAttribute('href', '#');
        clearButton.innerText = 'Start Over';
    }

    var insertButton = pageContain.insertBefore(clearButton, jsResults);

    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        while(jsResults.firstChild) {
            jsResults.removeChild(jsResults.firstChild);
        }
        clearButton.remove();
        jsSearchButton.style.visibility = 'visible';
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
    if (pic.url_l) {
        imgHref.setAttribute('href', pic.url_l);
        imgHref.className = 'embiggen';

        // Click a picture that has a link to get a bigger picture!
        imgHref.addEventListener('click', function (e) {
            e.preventDefault();
            overlay(pic);
        });
    } else {
        // Some pics don't have url_l, we don't want those to be clickable.
        imgHref.className = 'no-api-link';
    }
    imgContainer.appendChild(imgHref);

    // Create img element, give it src and add it to the 'a'.
    var imgInner = document.createElement('img');
    imgInner.setAttribute('src', pic.url_s);
    imgHref.appendChild(imgInner);

    // Stick the whole thing in jsResults div.
    jsResults.appendChild(imgContainer);


    function overlay(pic) {
        var modal = document.getElementById('overlay'),
            modalInner = document.getElementById('modalInner'),
            bigImg;
        modal.style.visibility = 'visible';
        modal.focus();

        bigImg = document.createElement('img');
        bigImg.setAttribute('src', imgHref);
        modalInner.appendChild(bigImg);

        modal.addEventListener('click', function () {
            modalInner.removeChild(bigImg);
            modal.style.visibility = 'hidden';
        });
    }
};

