import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './CarouselPage.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const HomeCarousel = () => {

    return (  
        <>
        <AutoplaySlider play={true} cancelOnInteraction={false} interval={6000} className='container mt-4' style={{width:"58%"}}>
            <div data-src="/backimg1.png" style={{width:"100%"}} />
            <div data-src="/backimg2.png" style={{width:"100%"}} />
            <div data-src="/backimg3.png" style={{width:"100%"}} />
        </AutoplaySlider>
        </>  
    )
};

export default HomeCarousel;