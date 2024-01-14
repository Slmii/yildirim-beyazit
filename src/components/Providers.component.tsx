import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { nlNL as coreNlNL } from '@mui/material/locale';
import { nlNL } from '@mui/x-date-pickers/locales';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
	const { i18n } = useTranslation();

	const theme = useMemo(() => {
		document.dir = i18n.dir();
		document.documentElement.lang = i18n.language;

		let theme = createTheme(
			{
				direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
				palette: {
					primary: {
						main: '#c20e1b'
					},
					secondary: {
						main: '#322b80'
					}
				},
				typography: {
					fontFamily: "'Roboto', serif",
					fontSize: 16,
					htmlFontSize: 16,
					fontWeightBold: 700,
					fontWeightRegular: 400
				},
				components: {
					MuiTypography: {
						styleOverrides: {
							h1: {
								fontFamily: "'Amita', serif"
							},
							h2: {
								fontFamily: "'Amita', serif"
							},
							h3: {
								fontFamily: "'Amita', serif"
							}
						}
					},
					MuiCssBaseline: {
						styleOverrides: theme => ({
							bold: {
								fontWeight: theme.typography.fontWeightBold
							},
							b: {
								fontWeight: theme.typography.fontWeightBold
							},
							code: {
								backgroundColor: theme.palette.secondary.main,
								color: theme.palette.secondary.contrastText
							},
							pre: {
								backgroundColor: theme.palette.secondary.main,
								color: theme.palette.secondary.contrastText,
								padding: theme.spacing(2),
								borderRadius: theme.shape.borderRadius,
								overflowX: 'auto'
							}
						})
					},
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: 999
							}
						}
					},
					MuiInputBase: {
						styleOverrides: {
							root: {
								backgroundColor: '#ffffff'
							}
						}
					}
				}
			},
			{
				nlNL, // x-date-pickers translations
				coreNlNL // core translations
			}
		);
		theme = responsiveFontSizes(theme);

		return theme;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.language]);

	const rtlCache = useMemo(() => {
		const stylisPlugins = [prefixer];
		if (i18n.language === 'ar') {
			stylisPlugins.push(rtlPlugin);
		}

		return createCache({
			key: `mui${i18n.dir()}`,
			stylisPlugins
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.language]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<CacheProvider value={rtlCache}>
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />
					<QueryClientProvider client={queryClient}>
						<ScrollToTop />
						{children}
						<ToastContainer
							position='top-right'
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={true}
							closeOnClick
							rtl={i18n.language === 'ar'}
							pauseOnFocusLoss
							theme='colored'
						/>
						<Analytics />
					</QueryClientProvider>
				</ThemeProvider>
			</CacheProvider>
		</LocalizationProvider>
	);
};

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
