import { useIsTouchDevice } from '@studio-freight/hamo'
import { RealViewport } from 'components/real-viewport'
import { GA_ID, GTM_ID } from 'lib/analytics'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import 'resize-observer-polyfill'
import 'styles/global.scss'
import useDarkMode from 'use-dark-mode'

const Stats = dynamic(
  () => import('components/stats').then(({ Stats }) => Stats),
  { ssr: false }
)
function MyApp({ Component, pageProps }) {
  const isTouchDevice = useIsTouchDevice()
  const darkMode = useDarkMode()

  return (
    <>
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <Script
            id="gtm-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${GTM_ID}');
          `,
            }}
          />
          <Script
            id="ga-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
            }}
          />
        </>
      )}
      <RealViewport />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
