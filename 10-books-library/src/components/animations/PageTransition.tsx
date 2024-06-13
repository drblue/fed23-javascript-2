import { motion } from "framer-motion";
import { swipeInFromTopAndFade } from "./transitions";

interface PageTransitionProps {
	children: React.ReactNode;
	id: React.Key;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, id }) => {
	return (
		<motion.div
			key={id}
			variants={swipeInFromTopAndFade}
			initial="initial"
			animate="enter"
			exit="exit"
			// initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
			// animate={{ opacity: 1, scale: 1, rotate: 0 }}
			// exit={{ opacity: 0, scale: 0.1, rotate: -359 }}
			// transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
}

export default PageTransition;
