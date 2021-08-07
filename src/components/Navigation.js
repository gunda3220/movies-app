import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  }
};

export const Navigation = ({toggleOpen,isOpen}) => (
  <motion.ul variants={variants} className = {isOpen?"nav-open":"nav-close"}>
    {itemIds.map(i => (
      <MenuItem id={i.id} key={i.id} name = {i.name} toggleOpen = {toggleOpen}/>
    ))}
  </motion.ul>
);

const itemIds = [{id:0,name:"Popular"},{id:1,name:"Recent"},{id:2,name:"Upcoming"}];