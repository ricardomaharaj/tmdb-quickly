import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='application-name' content='TMDB NEXT' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='TMDB NEXT' />
        <meta name='description' content='TMDB NEXT' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#1e293b' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content='TMDB NEXT' />
        <meta property='og:description' content='TMDB NEXT' />
        <meta property='og:site_name' content='TMDB NEXT' />
        <meta property='og:url' content='https://r8r-tmdb-next.vercel.app/' />
        <meta
          property='og:image'
          content='https://r8r-tmdb-next.vercel.app/icon-512x512.png'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
