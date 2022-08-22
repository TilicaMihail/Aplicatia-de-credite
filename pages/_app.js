import '../styles/globals.css'
import AuthProvider from '../contexts/AuthContext'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider >
            <Component {...pageProps} />
            <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
            <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
        </AuthProvider >
    )
}

export default MyApp
