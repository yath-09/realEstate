const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

// trip list 

router.get("/:userId/trips",async(req,res)=>{
    try {
        const {userId}=req.params
        const trips=await Booking.find({customerId:userId}).populate("customerId hostId listingId")
        res.status(202).json(trips)

    } catch (error) {
        console.log(err);
        res.status(404).json({message:"Cannot fond trip list"})
    }
})

module.exports=router