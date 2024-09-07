import styles from './footer.module.css'

export function Footer(): JSX.Element {
	return (
		<footer className={styles.footer}>
			<a
				href='http://khariton90.ru'
				target='_blank'
				className={styles.footer__link}
			>
				Developed Khariton90
			</a>
		</footer>
	)
}
