const { addBrandImage, updateBrandImage } = require('../Controllers/BrandUpdateController');

const router = require('express').Router();

router.route('/upload').get((req,res) => {
    res.status(200).send("uploaded")
}).post(addBrandImage).put(updateBrandImage);


module.exports = router;