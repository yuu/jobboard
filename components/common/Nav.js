import styles from '../../styles/nav.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.img_container}>
					<Link href="/">
						<a>
							<Image
								src="/logo.png"
								alt="jobboard"
								width={200}
								height={70}
							/>
						</a>
					</Link>
				</div>
				<div className={styles.links_container}>
					<Link href="/login">
						<div className={styles.links}>
							<a>Login</a>
						</div>
					</Link>
					<Link href="/signup">
						<div className={styles.links}>
							<a>Sign Up</a>
						</div>
					</Link>
					<div>
						<Link href="/hire">
							<a>
								<button>Post a Job</button>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
