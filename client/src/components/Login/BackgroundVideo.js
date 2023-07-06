import './BackgroundVideo.css'

export default function BackgroundVideo(){

    return(
        <div>
            <video loop autoPlay muted id="bg-video">
                <source src={require('./../../assets/videos/loginBackground.mp4')} type='video/mp4'/>
            </video>
        </div>
    )

}