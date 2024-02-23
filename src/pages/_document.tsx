import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' className='bg-slate-900 text-slate-100 font-[Ubuntu]'>
      <Head>
        <meta name='application-name' content='TMDB Quickly' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='TMDB Quickly' />
        <meta
          name='description'
          content='a TMDB application designed for speed'
        />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#1e293b' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        <link rel='icon' type='image/png' sizes='16x16' href='/icon-16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icon-32.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/icon-192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/icon-512.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body className='container mx-auto'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
