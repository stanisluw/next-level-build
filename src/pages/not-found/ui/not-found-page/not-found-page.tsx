import { LOCALE, LOGO_DARK_PATH } from '#shared/external';

enum CL {
	MAIN = 'size-full flex flex-col items-center justify-center gap-4',
	TITLE = 'text-9xl font-semibold',
	DESCRIPTION = 'text-white/60 text-4xl',
}

export default function NotFoundPage() {
	return (
		<div className={CL.MAIN}>
			<img src={LOGO_DARK_PATH} alt={LOCALE.app.name} />
			<span className={CL.TITLE}>{LOCALE['404']}</span>
			<span className={CL.DESCRIPTION}>{LOCALE.pageNotFound}</span>
		</div>
	);
}
