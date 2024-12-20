const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spots, spotImage, User } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    
    const userId = req.user.id;
    const spotId = parseInt(req.params.spotId);
    
    const spot = await Spots.findByPk(spotId);

    if(!spot){
        return res.status(404).json({
            "message": "Spot couldn't be found"
          });
    };

    if (userId !== spot.ownerId) {
        return res.status(403).json({
            "message": "Forbidden"
        });
    }

    const { url, preview } = req.body;

    const addAImage = await spotImage.create({
        spotId: spotId,
        url,
        preview
    })
    const response = {
        id: addAImage.id,
        url: addAImage.url,
        preview: addAImage.preview,
    }
    return res.status(201).json(response);
})

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = parseInt(req.params.imageId);
    const userId = req.user.id;
    const deleteImage = await spotImage.findByPk(imageId);
    
    if(!deleteImage){
        return res.status(404).json({
            "message": "Spot Image couldn't be found"
          });
    }

    const spot = await Spots.findByPk(deleteImage.spotId)

    if(userId !== spot.ownerId){
        return res.status(403).json({
            "message": "Forbidden"
        });
    }

    await deleteImage.destroy();
    res.status(200).json({
        "message": "Successfully deleted"
    });
});



















module.exports = router;