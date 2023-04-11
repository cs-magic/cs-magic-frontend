/**
 * Change the theme of the built-in pages.
 *
 * [Documentation](https://next-auth.js.org/configuration/options#theme) |
 * [Pages](https://next-auth.js.org/configuration/pages)
 */
import { AuthLayout } from '@/layouts/AuthLayout'

export interface Theme {
	colorScheme?: 'auto' | 'dark' | 'light'
	logo?: string
	brandColor?: string
	buttonText?: string
}

export interface InternalUrl {
	/** @default "http://localhost:3000" */
	origin: string
	/** @default "localhost:3000" */
	host: string
	/** @default "/api/auth" */
	path: string
	/** @default "http://localhost:3000/api/auth" */
	base: string
	/** @default "http://localhost:3000/api/auth" */
	toString: () => string
}


/**
 * The following errors are passed as error query parameters to the default or overridden error page.
 *
 * [Documentation](https://next-auth.js.org/configuration/pages#error-page) */
export type ErrorType =
	| 'default'
	| 'configuration'
	| 'accessdenied'
	| 'verification'

export interface ErrorProps {
	url?: InternalUrl
	theme?: Theme
	error?: ErrorType
}

interface ErrorView {
	status: number
	heading: string
	message: JSX.Element
	signin?: JSX.Element
}

/** Renders an error page. */
export default function ErrorPage(props: ErrorProps) {
	const { url, error = 'default', theme } = props
	const signinPageUrl = `${url}/signin`
	
	const errors: Record<ErrorType, ErrorView> = {
		default: {
			status: 200,
			heading: 'Error',
			message: (
				<p>
					<a className="site" href={url?.origin}>
						{url?.host}
					</a>
				</p>
			),
		},
		configuration: {
			status: 500,
			heading: 'Server error',
			message: (
				<div>
					<p>There is a problem with the server configuration.</p>
					<p>Check the server logs for more information.</p>
				</div>
			),
		},
		accessdenied: {
			status: 403,
			heading: 'Access Denied',
			message: (
				<div>
					<p>You do not have permission to sign in.</p>
					<p>
						<a className="button" href={signinPageUrl}>
							Sign in
						</a>
					</p>
				</div>
			),
		},
		verification: {
			status: 403,
			heading: 'Unable to sign in',
			message: (
				<div>
					<p>The sign in link is no longer valid.</p>
					<p>It may have been used already or it may have expired.</p>
				</div>
			),
			signin: (
				<p>
					<a className="button" href={signinPageUrl}>
						Sign in
					</a>
				</p>
			),
		},
	}
	
	const { status, heading, message, signin } =
		// @ts-ignore
	errors[error.toLowerCase()] ?? errors.default
	
	return {
		status,
		html: (
			<AuthLayout>
				<h1>{heading}</h1>
				<div className="message">{message}</div>
				{signin}
			</AuthLayout>
		),
	}
}
