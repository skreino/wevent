export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

export const slideUp = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { y: '100%', transition: { duration: 0.2 } }
}
