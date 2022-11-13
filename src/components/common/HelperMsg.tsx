import Link from 'next/link'
import styles from 'styles/helperMsg.module.css'

interface HelperMsgProps {
  content: string
  option: string
  url: string
}

const HelperMsg = ({ content, option, url }: HelperMsgProps) => {
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
