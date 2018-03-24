import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locale/en.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: { en }
})

export const supportedLanguages = ['en', 'zh-tw']

export async function loadLanguage(lang) {
	lang = lang.toLowerCase()
	if (!supportedLanguages.includes(lang)) return
	const msgs = await import(/* webpackChunkName: "lang-[request]" */ `./locale/${lang}.json`)
	i18n.setLocaleMessage(lang, msgs)
	i18n.locale = lang
	document.querySelector('html').setAttribute('lang', lang)
	return lang
}
