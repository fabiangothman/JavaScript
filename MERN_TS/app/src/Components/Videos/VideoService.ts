import axios from "axios";
import { Video } from "./Video";

const api_url: string = `http://localhost:4001`;

export const getVideos = async () => {
    return await axios.get<Video[]>(`${api_url}/videos`); 
}

export const createVideo = async (video: Video) => {
    return await axios.post(`${api_url}/videos`, video); 
}

export const getVideo = async (id: string) => {
    return await axios.get<Video>(`${api_url}/videos/id/${id}`); 
}

export const updateVideo = async (id: string, video: Video) => {
    return await axios.put<Video>(`${api_url}/videos/id/${id}`, video); 
}

export const deleteVideo = async (id: string) => {
    return await axios.delete<Video>(`${api_url}/videos/id/${id}`); 
}