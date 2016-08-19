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

const optimus = require('connect-image-optimus');
// router.use(optimus(panos));

const zlib = require('zlib');
const compression = require('compression');
router.use(compression({strategy: zlib.Z_HUFFMAN_ONLY }));

router.use('/:building/:scene', function(req, res) {
	var panoDir = '../../../panoramas',
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

	filePath = path.join(__dirname, panoDir, size, dir);

  var options = {
    root: filePath,
    extensions: ['jpg', 'webp'],
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile(req.params.scene, options);
});
// router.use(express.static(panos));

module.exports = router;