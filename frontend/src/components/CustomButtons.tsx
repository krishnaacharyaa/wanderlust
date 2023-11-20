import { customButtonProps } from "../types/custombuttonTypes"

const CustomButtons = ({title, btnType, onClick, containerStyle} : customButtonProps) => {
  return (
    <button 
    disabled= {false}
    type={btnType}
    className={`custom-btn ${containerStyle}`}
    onClick={onClick}
    >
    <span className={`flex-1`}>
      {title}
    </span>
    </button>
  )
}

export default CustomButtons
