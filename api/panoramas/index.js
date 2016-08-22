/* SET UP PATH TO PANORAMA LOCATION */
/* INIT ROUTER INSTANCE */
/* ENABLE CORS */
const path = require('path');
const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

const device = require('express-device');
router.use(device.capture({ parseUserAgent: true }));

// const optimus = require('connect-image-optimus');
// router.use(optimus());

const zlib = require('zlib');
const compression = require('compression');
router.use(compression({strategy: zlib.Z_HUFFMAN_ONLY }));

const panos = path.join(process.cwd(), '../panoramas');
// console.log(panos);
// router.use('/:building/:scene', express.static(panos))
// 

const webp = require('webp-middleware');

router.use('/:building', function(req, res, next) {
	var panoDir = panos,
			// fileName = `${req.params.scene}`,
			device = req.device.type,
			dir = req.params.building,
			size;

	switch (device) {
		case 'desktop':
  		size = 'large';
			break;
		case 'phone':
  		size = 'small';
			break;
		case 'tablet':
		default:
  		size = 'medium';
			break;
	}

	if (req.query.large) {
  	size = 'large';
	}
	if (req.query.medium)  {
  	size = 'medium';
	}
	if (req.query.small) {
  	size = 'large';
	}

	filePath = path.join(panoDir, size, dir);
	req.url = filePath;
	next();
	//return webp(filePath, { cacheDir: '/' }).apply(this, arguments);
});

router.use('/:building', function(req, res, next) {

  var options = {
    //root: filePath,
    extensions: ['jpg', 'webp'],
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  return express.static(req.filePath, options).apply(this, arguments);
  //res.sendFile(req.url, options);
});
// router.use(express.static(panos));

module.exports = router;