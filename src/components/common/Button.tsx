import { MouseEventHandler } from 'react'
import styles from 'styles/button.module.css'

interface ButtonProps {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <div className={styles.container}>
      <button onClick={onClick}>{label}</button>
    </div>
  )
}

export default Button
