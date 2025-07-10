/**
 * Un composant qui crée un effet de superposition de flou dégradé
 * @param {Object} props - Les props du composant
 * @param {string} [props.direction="toTop"] - La direction du flou dégradé ("toTop" ou "toBottom")
 * @param {string} [props.position="top"] - La position de la superposition ("top" ou "bottom")
 * @returns {JSX.Element} Un élément div avec un style de superposition de flou dégradé
 */

const BlurOverlay = ({direction = "toTop", position = "bottom"}:{direction?:string; position?: string})=>{
  return(
    <div className=
      {
        `pointer-events-none blur-overlay z-88 fixed ${ position == "top" ? `top-0`:`bottom-0 ` } left-0 right-0 h-[150px] bg-gradient-to-t ${direction == 'toTop' ? `from-base-200 to-transparent` : 'from-transparent to-base-200 '}`
      }
      >
    </div>
  )
}

export default BlurOverlay;