function setup() {
    fetchPhotos("/photos").then((photos) => {
        render(photos);
        createForm();
        zoomPhoto(photos[0]);
        metaPhoto(photos[0]);
        handleSearchForm(photos);
    });
}

function fetchPhotos(url) {
    return fetch(url).then((response) => {
        return response.json();
    })

}

function render(photos) {
    photos.forEach((photo) => {
        const $area = document.getElementById('app');
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        $img.addEventListener("click", () => zoomPhoto(photo));
        $img.addEventListener("click", () => metaPhoto(photo));
        $area.appendChild($img);
    })
}

function zoomPhoto(photo) {
    const $area = document.getElementById('app');
    const $imageContainerEl = document.getElementById('imageContainer');
    const $imageEl = document.createElement('img');
    const $divEl = document.createElement('div');

    if ($imageContainerEl) {
        $imageContainerEl.remove();
    }

    $divEl.setAttribute('id', 'imageContainer');
    $area.appendChild($divEl);

    $imageEl.setAttribute('src', photo.image);
    $divEl.appendChild($imageEl);
}

function metaPhoto(photo) {
    const $area = document.getElementById('imageContainer');
    const $divEl = document.createElement('div');

    $divEl.setAttribute('id', 'imageMeta');
    $area.appendChild($divEl);

    const $imageMetaEl = document.getElementById('imageMeta');

    if ($imageMetaEl) {
        $imageMetaEl.innerHTML = '<h3>' + photo.author + '</h3>' + '<h4>' + photo.title + '</h4>';
        const newArrayTags = [];
        photo.tags.map((tag) => {
            newArrayTags.push('#' + tag)
        });
        $imageMetaEl.innerHTML += '<p>' + newArrayTags.join(', ') +' </p>';
    }
}

function createForm() {
    const $area = document.getElementById('app');
    const $formEl = document.createElement('form');
    const $inputEl = document.createElement('input');

    $inputEl.setAttribute('type', 'text');
    $inputEl.setAttribute('placeholder', 'Search ...');
    $inputEl.setAttribute('id', 'search');
    $area.appendChild($formEl);
    $formEl.appendChild($inputEl);
}

function handleSearchForm(photos) {
    const $searchInputEl = document.getElementById('search');

    if($searchInputEl) {
        $searchInputEl.addEventListener('keyup', function(){
            console.log($searchInputEl.value);
        })
    }


}

window.addEventListener("DOMContentLoaded", setup);
