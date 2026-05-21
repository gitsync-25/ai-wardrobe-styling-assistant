import { motion } from "framer-motion";

function Loader() {

  return (

    <motion.div
      className="loader"

      initial={{ opacity: 1 }}

      exit={{
        opacity: 0,
      }}

      transition={{
        duration: 0.8,
      }}
    >

      <motion.h1

        initial={{
          opacity: 0,
          scale: 0.8,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        transition={{
          duration: 0.8,
        }}
      >
        AI Wardrobe
      </motion.h1>

    </motion.div>

  );

}

export default Loader;