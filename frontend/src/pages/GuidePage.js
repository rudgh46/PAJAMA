import React from "react";
import NavBar from "../components/nav/NavBar";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
};

const items = [
    <img src="/guide1.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide2.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide3.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide4.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide5.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide6.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide7.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide8.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide9.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide10.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>,
    <img src="/guide11.png" alt="guide"  style={{width:'100%'}} onDragStart={handleDragStart} role="presentation" ></img>
];


const GuidePage = () => {
    return (
        <>
        <NavBar></NavBar>
        <div className="container" style={{display:"flex", "justifyContent":"center", "marginTop":"1%", "width":"70%"}}>
            <AliceCarousel mouseTracking items={items} responsive={responsive} />
        </div>
        </>
    )
};

export default GuidePage;