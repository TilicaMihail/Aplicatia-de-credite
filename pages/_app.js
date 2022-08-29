import '../styles/globals.css'
import AuthProvider from '../contexts/AuthContext'
import Script from 'next/script'
import UsersProvider from '../contexts/UsersContext'
import ProjectsProvider from '../contexts/ProjectsContext'
import InternshipsProvider from '../contexts/InternshipsContext'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider >
            <UsersProvider>
                <ProjectsProvider>
                    <InternshipsProvider>
                        <Component {...pageProps} />
                        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
                        <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
                    </InternshipsProvider>
                </ProjectsProvider>
            </UsersProvider>
        </AuthProvider >
    )
}

export default MyApp
