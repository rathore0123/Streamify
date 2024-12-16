import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function VideoPlay() {
    const Navigate = useNavigate();
    const isLogin = useSelector((store) => store.user.isLogin);
    const movieData = useSelector((store) => store.movie.movieDetails);

    useEffect(() => {
        console.log(movieData);
        
        if (!isLogin) {
            Navigate("/");
        }
    }, [isLogin]);

    return (
        <div>
            <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${movieData[0]?.key}?autoplay=1&mute=0&controls=1&loop=0&playlist=${movieData[0]?.key}&cc_load_policy=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            >
            </iframe>
        </div>
    )
}

export default VideoPlay