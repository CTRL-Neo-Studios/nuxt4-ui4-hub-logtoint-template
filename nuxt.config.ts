// https://nuxt.com/docs/api/configuration/nuxt-config
import {UserScope} from "@logto/nuxt";

export default defineNuxtConfig({
	modules: [
		'@nuxt/ui',
		'@comark/nuxt',
		'@nuxt/image',
		'@logto/nuxt',
		'@nuxthub/core',
		'@vueuse/nuxt',
		'@nuxtjs/i18n',
		'@type32/nuxt-cs-utils',
		'nuxt-security',
		'nuxt-authorization',
		'motion-v/nuxt',
		'@type32/logto-nuxt-utils',
	],

	extends: [['github:CTRL-Neo-Studios/nuxt-ui-extras#dev', {install: true}]],

	app: {
		pageTransition: {name: 'page', mode: 'out-in'},
		layoutTransition: {name: 'layout', mode: 'out-in'},
	},

	hub: {
		db: {
			dialect: 'postgresql',
			applyMigrationsDuringDev: false,
			applyMigrationsDuringBuild: false,
		},
		blob: true
	},

	logto: {
		pathnames: {
			signIn: '/signin',
			signOut: '/signout',
			callback: '/api/v1/auth/callback',
		},
		postCallbackRedirectUri: '/api/v1/auth/postcb',
	},

	logtoRbac: {
		resources: [],
		permissions: []
	},

	devtools: {
		enabled: true
	},

	i18n: {
		defaultLocale: 'en',
		locales: [
			{code: 'en', name: 'English', file: 'en.json'},
			{code: 'zh', name: '简体中文', file: 'zh.json'}
		]
	},

	vite: {
		optimizeDeps: {
			include: [
				'zod',
				'@internationalized/date',
			]
		},
	},

	security: {
		headers: {
			contentSecurityPolicy: {
				'img-src': ["'self'", 'data:', 'https:', 'blob:'],
				// Allow inline event handlers (e.g. NuxtImg/UAvatar fallback `onerror`),
				// which would otherwise be blocked by the default `script-src-attr 'none'`.
				'script-src-attr': ["'unsafe-inline'"],
				// `'unsafe-eval'` is required by the Vite dev client; keep it dev-only so
				// production CSP stays strict.
				// @ts-ignore
				'script-src': process.env.NODE_ENV === 'development'
					? ["'self'", 'https:', "'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", "'nonce-{{nonce}}'"]
					: ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
			},
			crossOriginEmbedderPolicy: false, // TODO: Find a better solution than disabling this security measure.
		},
		rateLimiter: {
			interval: 100000,
		}
	},

	image: {
		domains: [],
		provider: 'none', // or configure ipx with a custom fetchAdapter
	},

	css: ['~/assets/css/main.css'],

	routeRules: {
		'/': {prerender: true}
	},

	compatibilityDate: '2026-08-01',
})
