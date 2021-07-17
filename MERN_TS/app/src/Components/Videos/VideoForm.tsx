import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Video } from './Video';
import * as VideoService from "./VideoService";
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
const videoInitialState = {
    title: '',
    description: '',
    url: ''
};
const doRedirect: boolean = true;
interface Params {
    id: string;
}

const VideoForm = () => {    
    const [video, setVideo] = useState<Video>(videoInitialState);
    const history = useHistory();
    const params = useParams<Params>(); 

    const handleInputChange = (e: InputChange) => {
        setVideo({...video, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(params.id){
            await VideoService.updateVideo(params.id, video);
            toast.success("Video updated");
            setVideo(videoInitialState);
            history.push("/");
        }else{
            await VideoService.createVideo(video);
            toast.success("New video added");
            setVideo(videoInitialState);
            if(doRedirect)
                history.push("/");
        }
    }

    const loadVideo = async (id: string) => {
        const resp = await VideoService.getVideo(id);
        const { title, description, url } = resp.data;
        setVideo({
            title,
            description,
            url
        });
    }

    useEffect(() => {
        if(params.id)
            loadVideo(params.id);
    }, [params.id]);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    name="title"
                                    placeholder="Write a title for this video"
                                    className="form-control"
                                    autoFocus={true}
                                    onChange={handleInputChange}
                                    value={video.title} />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    name="url"
                                    placeholder="https://example.com"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.url} />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Write a description"
                                    onChange={handleInputChange}
                                    value={video.description}></textarea>
                            </div>
                            {(params.id) ? (
                                <button className="btn btn-info">Update video</button>
                            ) : (
                                <button className="btn btn-primary">Create video</button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm
