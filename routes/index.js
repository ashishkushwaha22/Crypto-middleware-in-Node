const router = require("express").Router();
const { decryptionController, test } = require("../controllers/encryption.controller");


router.post("/decrypt", decryptionController);
router.post("/data", test);

module.exports = router;