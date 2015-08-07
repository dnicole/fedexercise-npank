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
        '&format=json&nojsoncallback=1&tags=' +
        imgTag;

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
    for (var pic in imgData) {
        if (imgData.hasOwnProperty(pic)) {
            console.log('DATA', pic);
            // var img = ;
            // var imgHref = '<a class="jsPic" href="#"><img src="img"></a>';
            // jsResults.appendChild(imgHref);

        } else {
            console.log('RESPONSE', res);
        }
    }
};

