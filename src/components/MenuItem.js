import React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    x:0,
    y:0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 100,
    x:-300,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ id,name,toggleOpen }) => {

    const scrollToCategory = (name) => {
        const categoryDiv = document.getElementById(name);
        let topPos = categoryDiv.offsetTop;
        document.body.scrollTop = topPos; // For Safari
        document.documentElement.scrollTop = topPos; // For Chrome, Firefox, IE and Opera
        toggleOpen();
    }
    
  const style = { border: `2px solid ${colors[id]}`,color:colors[id] };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick = {() => scrollToCategory(name)}
    >
      <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style}><p>{name}</p></div> 
    </motion.li>
  );
};
