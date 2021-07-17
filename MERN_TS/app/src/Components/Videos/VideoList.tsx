import { useEffect, useState } from 'react';
import { Video } from "./Video";
import VideoItem from './VideoItem';
import * as VideoService from "./VideoService";

const VideoList = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const loadVideos = async () => {
        const resp = await VideoService.getVideos();

        //Sort video by most recent
        const orderedVideos = resp.data.map(video => {
            return {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date()
            }
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setVideos(orderedVideos);
    }

    useEffect(() => {
        loadVideos();   
    }, []); //If depending a change into a variable inside the array the function will execute

    return (
        <div className="row">
            {videos.map((video, i) => (
                <VideoItem key={i} video={video} loadVideos={loadVideos} />
            ))}
        </div>
    );
}

export default VideoList;