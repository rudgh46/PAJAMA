import Particles from "react-particles";

import { loadFull } from "tsparticles";
import { useCallback } from "react";

const Particle = (props) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    console.log("bg", props.bg);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  if (props.bg == "/frame1.png") {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#FCF2F7",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: { enable: false, force: 60, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#C8BFE7" },
            move: {
              direction: "none",
              enable: true,
              outModes: "out",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 0.05,
                sync: true,
                startValue: "max",
                count: 1,
                destroy: "min",
              },
              value: {
                min: 0,
                max: 0.5,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    );
  } else if (props.bg == "/frame2.png") {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detect_on: "canvas",
            events: {
              onclick: { enable: true, mode: "repulse" },
              onhover: {
                enable: true,
                mode: "bubble",
                parallax: { enable: false, force: 2, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              bubble: { distance: 200, duration: 2, opacity: 0, size: 0, speed: 3 },
              grab: { distance: 400, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
              repulse: { distance: 400, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            line_linked: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 600 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: true,
              speed: 0.3,
              straight: false,
            },
            number: { density: { enable: true, value_area: 800 }, value: 600 },
            opacity: {
              anim: { enable: true, opacity_min: 0.3, speed: 5, sync: false },
              random: {
                enable: true,
                minimumValue: 0.3,
              },
              value: 0.6,
            },
            shape: {
              type: "circle",
            },
            size: {
              anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
              random: false,
              value: 1,
            },
          },
          retina_detect: true,
        }}
      />
    );
  } else if (props.bg == "/frame3.png") {
    //과일^^
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#FFFBFD",
            },
          },
          detectRetina: true,
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onDiv: {
                elementId: "repulse-div",
                enable: false,
                mode: "repulse",
              },
              // onHover: {
              //   enable: true,
              //   mode: "bubble",
              //   parallax: {
              //     enable: false,
              //     force: 60,
              //     smooth: 10,
              //   },
              // },
              resize: true,
            },
            modes: {
              connect: {
                distance: 80,
                lineLinked: {
                  opacity: 0.5,
                },
                radius: 60,
              },
              grab: {
                distance: 400,
                lineLinked: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            lineLinked: {
              blink: false,
              color: "#000",
              consent: false,
              distance: 150,
              enable: false,
              opacity: 0,
              width: 0,
            },
            rotate: {
              value: 0,
              random: true,
              direction: "clockwise",
              animation: {
                enable: true,
                speed: 5,
                sync: false,
              },
            },
            move: {
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
              bounce: false,
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1600,
              },
              limit: 0,
              value: 20,
            },
            opacity: {
              animation: {
                enable: false,
                minimumValue: 0.1,
                speed: 1,
                sync: false,
              },
              random: false,
              value: 0.8,
            },
            shape: {
              character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400",
              },
              image: [
                {
                  src: "https://particles.js.org/images/fruits/apple.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/avocado.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/banana.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/berries.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/cherry.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/grapes.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/lemon.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/orange.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/peach.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/pear.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/pepper.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/plum.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/star.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/strawberry.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/watermelon.png",
                  width: 64,
                  height: 64,
                },
                {
                  src: "https://particles.js.org/images/fruits/watermelon_slice.png",
                  width: 64,
                  height: 64,
                },
              ],
              polygon: {
                nb_sides: 5,
              },
              stroke: {
                color: "#000000",
                width: 0,
              },
              type: "image",
            },
            size: {
              animation: {
                enable: false,
                minimumValue: 0.1,
                speed: 40,
                sync: false,
              },
              random: false,
              value: 32,
            },
          },
          polygon: {
            draw: {
              enable: false,
              lineColor: "#ffffff",
              lineWidth: 0.5,
            },
            move: {
              radius: 10,
            },
            scale: 1,
            type: "none",
            url: "",
          },
        }}
      />
    );
  } else if (props.bg == "v") {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          fullScreen: {
            enable: true,
          },
          background: {
            color: "#ffffff",
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: { enable: false, force: 60, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
              grab: { distance: 400, links: { opacity: 1 } },
              push: { quantity: 4 },
              remove: { quantity: 2 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "random" },
            links: {
              color: "random",
              distance: 150,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: false,
              speed: 3,
              straight: false,
            },
            rotate: {
              animation: {
                enable: true,
                speed: 10,
                sync: false,
              },
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: {
              animation: { enable: true, minimumValue: 0.5, speed: 1, sync: false },
              random: false,
              value: 1,
            },
            shape: {
              character: [
                {
                  fill: true,
                  font: "Verdana",
                  value: ["💩", "✌", "🍀", "✌", "✌", "✌"],
                  style: "",
                  weight: 400,
                },
              ],
              image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 100,
              },
              polygon: { nb_sides: 5 },
              stroke: { color: "random", width: 1 },
              type: "char",
            },
            size: {
              anim: { enable: true, minimumValue: 8, speed: 20, sync: false },
              random: { minimumValue: 8, enable: true },
              value: 32,
            },
          },
          detectRetina: true,
        }}
      />
    );
  }

  //============
  else if (props.bg == "heart") {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          fullScreen: {
            enable: true,
          },
          background: {
            color: "#ffffff",
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: { enable: false, force: 60, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
              grab: { distance: 400, links: { opacity: 1 } },
              push: { quantity: 4 },
              remove: { quantity: 2 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "random" },
            links: {
              color: "random",
              distance: 150,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: false,
              speed: 3,
              straight: false,
            },
            rotate: {
              animation: {
                enable: true,
                speed: 10,
                sync: false,
              },
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: {
              animation: { enable: true, minimumValue: 0.5, speed: 1, sync: false },
              random: false,
              value: 1,
            },
            shape: {
              character: [
                {
                  fill: true,
                  font: "Verdana",
                  value: ["💖", "💗", "💜", "💙", "💚", "💛", "🧡"],
                  style: "",
                  weight: 400,
                },
              ],
              image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 100,
              },
              polygon: { nb_sides: 5 },
              stroke: { color: "random", width: 1 },
              type: "char",
            },
            size: {
              anim: { enable: true, minimumValue: 8, speed: 20, sync: false },
              random: { minimumValue: 8, enable: true },
              value: 32,
            },
          },
          detectRetina: true,
        }}
      />
    );
  } else if (props.bg == "one") {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          fullScreen: {
            enable: true,
          },
          background: {
            color: "#ffffff",
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: { enable: false, force: 60, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
              grab: { distance: 400, links: { opacity: 1 } },
              push: { quantity: 4 },
              remove: { quantity: 2 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "random" },
            links: {
              color: "random",
              distance: 150,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: false,
              speed: 3,
              straight: false,
            },
            rotate: {
              animation: {
                enable: true,
                speed: 10,
                sync: false,
              },
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: {
              animation: { enable: true, minimumValue: 0.5, speed: 1, sync: false },
              random: false,
              value: 1,
            },
            shape: {
              character: [
                {
                  fill: true,
                  font: "Verdana",
                  value: ["☝", "❗"],
                  style: "",
                  weight: 400,
                },
              ],
              image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 100,
              },
              polygon: { nb_sides: 5 },
              stroke: { color: "random", width: 1 },
              type: "char",
            },
            size: {
              anim: { enable: true, minimumValue: 8, speed: 20, sync: false },
              random: { minimumValue: 8, enable: true },
              value: 32,
            },
          },
          detectRetina: true,
        }}
      />
    );
  }
};

export default Particle;
