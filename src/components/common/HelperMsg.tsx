import Link from 'next/link'
import styles from 'styles/helperMsg.module.css'

const HelperMsg = ({ content, option, url }) => {
  return (
    <div className={styles.container}>
      <p>
        {content}{' '}
        <span>
          <Link href={`/${url}`}>
            <a>{option}</a>
          </Link>
        </span>
      </p>
    </div>
  )
}

export default HelperMsg
