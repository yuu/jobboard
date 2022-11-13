import styles from 'styles/initial.module.css'

interface InitialProps {
  letter: string
  name?: string
}

const Initial = ({ letter, name = '' }: InitialProps) => {
  return (
    <p className={styles.initial}>
      {letter} <br />
      {name !== '' && <span>{name}</span>}
    </p>
  )
}

export default Initial
