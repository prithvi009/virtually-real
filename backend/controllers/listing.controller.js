import Listing from '../models/listing.model.js';

export const createListing = async(req, res, next)=>{
    try{
        console.log(req.body);
        const newListing= new Listing(req.body);
        const listing = await newListing.save();
        res.status(201).json(listing);
        console.log(res)
    }
    catch(err){
        next(err);
    }
}