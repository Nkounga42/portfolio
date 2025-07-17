/**
 * Un composant qui crée un effet de superposition de flou dégradé
 * @param {Object} props - Les props du composant
 * @param {string} [props.direction="toTop"] - La direction du flou dégradé ("toTop" ou "toBottom")
 * @param {string} [props.position="top"] - La position de la superposition ("top" ou "bottom")
 * @returns {JSX.Element} Un élément div avec un style de superposition de flou dégradé
 */

const ShadowOverlay = ({direction = "toTop", position = "bottom", type = "fixed", index = "88"}:{direction?:string; type?:string; position?: string; index?:string})=>{

  return(
    <div className=
      {
        `pointer-events-none blur-overlay z-${index} ${type} ${ position == "top" ? `top-0`:`bottom-0 ` } left-0 right-0 h-[150px] bg-gradient-to-t ${direction == 'toTop' ? `from-base-200 to-transparent` : 'from-transparent to-base-200 '}`
      }
      >
    </div>
  )
}

export default ShadowOverlay;