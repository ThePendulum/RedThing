const redgifsUrl = document.querySelector('#redgifsUrl');
const redgifsLoad = document.querySelector('#redgifsLoad');

const collectionInfo = document.querySelector('#collectionInfo');
const collectionTitle = document.querySelector('#collectionTitle');
const collectionSize = document.querySelector('#collectionSize');
const collectionContent = document.querySelector('#collectionContent');

const player = document.querySelector('#player');

function validateRedgifsUrl(url) {
    if (!url) {
	return false;
    }

    try {
	const { hostname } = new URL(url);

	if (hostname === 'redgifs.com' || hostname === 'www.redgifs.com') {
	    return true;
	}

	return false;
    } catch (error) {
	return false;
    }
}

async function retrieveCollection() {
    const url = redgifsUrl.value;

    if (!validateRedgifsUrl(url)) {
	return;
    }

    const res = await fetch(`/api/collection?url=${encodeURI(url)}`);

    if (!res.ok) {
	return;
    }

    const collection = await res.json();

    console.log(collection);

    collectionTitle.textContent = `${collection.title} by ${collection.username}`;
    collectionSize.textContent = `${collection.content.length} GIFs`;

    collection.content.forEach((gif) => {
	const gifListItem = document.createElement('li');

	gifListItem.textContent = gif.sources.hd;

	collectionContent.appendChild(gifListItem);
    });

    player.src = collection.content[Math.floor(Math.random() * collection.content.length)].sources.hd;

    collectionInfo.classList.remove('hidden');
}

redgifsLoad.addEventListener('click', retrieveCollection);
