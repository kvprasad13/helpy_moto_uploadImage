const Brand = require('../models/BrandModel.js');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage: Storage
}).single('testImage');

const addBrandImage = (req, res) => {
    const name = req?.body?.name;
    console.log(name, req?.files);
    console.log(req.body);
    if (!name || !req.files) {
        return res.status(400).json({ message: "All fields are required" });
    }

    upload(req, res, async (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "An error occurred while uploading the image" });
        }

        const filename = req.file.filename;
        const newBrand = {
            name,
            image: {
                data: filename,
                contentType: 'image/png'
            }
        };

        try {
            const brand = await Brand.create(newBrand);
            console.log(brand);
            res.status(201).json(brand);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "An error occurred while creating the brand" });
        }
    });
};

const updateBrandImage = (req, res) => {
    const name = req.body.name;

    if (!name || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
    }

    upload(req, res, async (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "An error occurred while uploading the image" });
        }

        const filename = req.file.filename;
        try {
            const currBrand = await Brand.findOne({ name });

            if (!currBrand) {
                return res.status(404).json({ message: "Brand not found" });
            }

            const newBrand = {
                name,
                image: {
                    data: filename,
                    contentType: 'image/png'
                }
            };

            const updatedBrand = await Brand.findByIdAndUpdate(currBrand._id, newBrand, { new: true });
            console.log(updatedBrand);
            res.status(200).json(updatedBrand);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "An error occurred while updating the brand" });
        }
    });
};

module.exports = { addBrandImage, updateBrandImage };
