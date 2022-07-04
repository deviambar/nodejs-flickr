const config = require('../config/config.json');
const fetch = require('node-fetch');
const { send } = require('micro');
const Q = require('q');

const fetchUrl = (url) => {
	let def = Q.defer();

	fetch(url)
		.then((res) => res.json())
		.then(function(json) {
			return def.resolve(json);
		})
		.catch(function(err) {
			return def.resolve(false);
		});

	return def.promise;
};

const getImages = (req) => {
	let def = Q.defer();
    console.log(req.text);
	let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + config['flickr']['key']+'&text='+ req.text+'&per_page=4&page=1&format=json&nojsoncallback=true';
	
	fetchUrl(url).then(function(rs) {
		return def.resolve(rs);
	});

	return def.promise;
};

module.exports = async (req, res) => {
    
    let rs = await getImages(req.query);

    return send(res, 200, {
			rs
	});
}