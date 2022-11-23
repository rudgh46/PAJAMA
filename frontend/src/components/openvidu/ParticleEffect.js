import Particles from "react-particles";

import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticleEffect = (props) => {
  const particlesInit = useCallback(async (engine) => {
    console.log("eee", engine);
    console.log("bg왜안돼~", props);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#301A47",
          },
        },
        particles: {
          color: {
            value: [
              "#FFAEBC",
              "#A0E7E5",
              "#B4F8C8",
              "#FBE7C6",
              "#FFC9AE",
              "#FFAEE5",
              "#A0C6E7",
              "#A0E7C2",
              "#B4F8EA",
              "#C2F8B4",
              "#F4FBC6",
              "#FBCDC6",
            ],
          },
          move: {
            decay: {
              min: 0.05,
              max: 0.15,
            },
            direction: "top",
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: true,
              maxSpeed: 200,
            },
            enable: true,
            outModes: {
              top: "none",
              default: "destroy",
            },
            speed: {
              min: 10,
              max: 20,
            },
          },
          number: {
            value: 0,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: "heart",
          },
          size: {
            value: { min: 4, max: 16 },
          },
          roll: {
            darken: {
              enable: true,
              value: 30,
            },
            enlighten: {
              enable: true,
              value: 30,
            },
            enable: true,
            mode: "horizontal",
            speed: {
              min: 5,
              max: 15,
            },
          },
        },
        emitters: {
          size: {
            width: 0,
            height: 0,
          },
          life: {
            duration: 0.5,
            delay: 2,
            count: 0,
          },
          rate: {
            quantity: 5,
            delay: 0.1,
          },
        },
      }}
    />
  );
};

export default ParticleEffect;
