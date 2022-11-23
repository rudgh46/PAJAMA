import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './CarouselPage.css';

const HomeCarouselMoblie = () => {

    return (  
        <>
        <AwesomeSlider className='container mt-4' style={{width:"90%"}}>
            <div data-src="/backimg1.png" style={{width:"100%"}} />
            <div data-src="/backimg2.png" style={{width:"100%"}} />
            <div data-src="/backimg3.png" style={{width:"100%"}} />
        </AwesomeSlider>
        </>  
    )
};

export default HomeCarouselMoblie;