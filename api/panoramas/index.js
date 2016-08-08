const path = require('path');
const panos = path.join(__dirname, '../../../build/images/panoramas');

const express = require('express');
const router = express.Router();

const cors = require('cors');
router.use(cors());

const optimus = require('connect-image-optimus');
router.use(optimus(panos));

const zlib = require('zlib');
const compression = require('compression');
router.use(compression({strategy: zlib.Z_HUFFMAN_ONLY }));

router.use(express.static(panos));

module.exports = router;