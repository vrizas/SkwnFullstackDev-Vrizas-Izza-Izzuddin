import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import api from '../utils/api';
import { AuthUserProvider } from '../contexts/AuthUserContext';
import { useRouter } from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [authUser, setAuthUser] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const getOwnProfile = async () => {
            if (typeof window !== 'undefined') {
                const token = api.getAccessToken();
                if (token) {
                    const user = await api.getOwnProfile();
                    user.role = await api.getRole(user.role_id);
                    setAuthUser(user);
                    if (router.asPath === '/login') router.replace('/');
                } else {
                    router.replace('/login');
                }
            }

            setLoading(false);
        }

        getOwnProfile();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <AuthUserProvider value={{ authUser, setAuthUser }}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </AuthUserProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
