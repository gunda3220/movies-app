import './App.css';
import "./side-nav.css";
import React, {useRef,useEffect,useState} from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {Route} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {updateAppHeight} from "./actions/otherFunctionalAction";
import {motion,useCycle} from "framer-motion";
import {useDimensions} from "./components/use-dimensions";
import { MenuToggle } from "./components/MenuToggle";
import { Navigation } from "./components/Navigation";

function App() {

  const dispatch = useDispatch();

  const appRef = useRef(null);

  const updateAppHeightHandler = () =>{  
    let appHeight = appRef.current.offsetHeight;
    dispatch(updateAppHeight(appHeight));
  }

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    window.addEventListener('resize',updateAppHeightHandler)
  },[])

  const sidebar = {
    open: () => ({
      clipPath: `circle(${height+200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 400,
        damping: 50,
      }
    }
  };

  return (
    <div className="App" ref = {appRef}>
      <motion.nav className = "side-nav"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      >
      <motion.div className="side-nav-background" variants={sidebar} />
      <Navigation toggleOpen = {toggleOpen} isOpen = {isOpen}/>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
      <Navbar />
      <Route path = {["/","/movie/:id"]}>
        <Home updateAppHeightHandler = {updateAppHeightHandler}/>
      </Route>
      
    </div>
  );
}

export default App;
