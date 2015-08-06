window.addEventListener('load',
    function init() {
        console.log('loaded');
        var searchButton = document.getElementById('search');
        searchButton.onclick = showAlert;
    });
    false;


function showAlert(e) {
    e.preventDefault();
    alert("onclick Event detected!");
}

