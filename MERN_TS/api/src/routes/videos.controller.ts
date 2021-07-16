import { RequestHandler } from "express";
import { Types } from "mongoose";
import Video from "./Video";

export const createVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findOne({url: req.body.url});
    if(videoFound)
        return res.status(301).json({message: "The URL already exists."});
    const video = new Video(req.body);
    console.log(video);
    console.log(typeof video._id);
    
    const savedVideo = await video.save();
    return res.json(savedVideo);
}

export const getVideos: RequestHandler = async (req, res) => {
    try{
        const videos = await Video.find();
        return res.json(videos);
    }catch(err){
        res.json(err);
    }
}

export const getVideo: RequestHandler = async (req, res) => {
    if(Types.ObjectId.isValid(req.params.id)){
        const videoFound = await Video.findById(req.params.id);
        if(!videoFound) return res.status(204).json();
        res.json(videoFound);
    }else{
        return res.status(204).json();        
    }    
}

export const deleteVideo: RequestHandler = async (req, res) => {
    if(Types.ObjectId.isValid(req.params.id)){
        const videoFound = await Video.findByIdAndDelete(req.params.id);
        if(!videoFound) return res.status(204).json();
        res.json(videoFound);
    }else{
        return res.status(204).json();        
    } 
}

export const updateVideo: RequestHandler = async (req, res) => {
    if(Types.ObjectId.isValid(req.params.id)){
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedVideo) return res.status(204).json();
        res.json(updatedVideo);
    }else{
        return res.status(204).json();        
    } 
}