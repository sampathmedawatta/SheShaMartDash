import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web'



const Home = () => {
  const springs = useSpring({
    from: { opacity: "0"},
    to: { opacity: "1" },
    config: { duration: "400" },
  })
  const springs2 = useSpring({
    from: { opacity: "0"},
    to: { opacity: "1" },
    config: { duration: "500" },
    delay: 200,
  })
  const springs3 = useSpring({
    from: { opacity: "0"},
    to: { opacity: "1" },
    config: { duration: "600" },
    delay: 400,
  })

  return (
    <div className="text-center">
    <h4 className="welcome-message text-gray">Welcome to SenShaMart</h4>
    <p className="tagline">Sensing the Future: Secure IoT Sensor Sharing and Monetization</p>
    
      
      <div className="row g-3 my-5 justify-content-center align-items-center">
        <animated.div className="col-md-3 p-1"
        style={springs}>
          <Link to={"/sensor"} className="nav-link">
            <div className="provider shadow-sm d-flex flex-column justify-content-start align-items-center">
              <img className="icon-1 mb-2" alt="" src="/provider.svg"></img>
              <h1 className="fs-2">Provider</h1>
            </div>
          </Link>
        </animated.div>
        <animated.div className="col-md-3 p-1"
        style={springs2}>
          <Link to={"/broker"} className="nav-link">
            <div className="broker shadow-sm d-flex flex-column justify-content-start align-items-center">
              <img className="icon-1 mb-2" alt="" src="/broker.svg"></img>
              <h1 className="fs-2">Broker</h1>
            </div>
          </Link>
        </animated.div>
        <animated.div className="col-md-3 p-1"
        style={springs3}>
          <Link to={"/client"} className="nav-link">
            <div className="client shadow-sm d-flex flex-column justify-content-start align-items-center">
              <img className="icon-1 mb-2" alt="" src="/client.svg"></img>
              <h1 className="fs-2 white">Client</h1>
            </div>
          </Link>
        </animated.div>
        
      </div>
    </div>
  );
};

export default Home;
