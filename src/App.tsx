import { Header } from 'components/Header.component';
import { Providers } from 'components/Providers.component';
import { Footer } from 'components/Footer.component';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { HomeView } from 'views/Home.component';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { MembershipView } from 'views/Membership.component';
import { IslamView } from 'views/Islam.component';
import { ReligiousDaysView } from 'views/ReligiousDays.component';
import { EventsView } from 'views/Events.component';

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language === 'ar') {
			document.dir = 'rtl';
		} else {
			document.dir = 'ltr';
		}
	}, [i18n.language]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<Providers>
							<Header />
							<Outlet />
							<Footer />
						</Providers>
					}
				>
					<Route path='/' element={<HomeView />} />
					<Route path='/membership' element={<MembershipView />} />
					<Route path='/islam' element={<IslamView />} />
					<Route path='/religious-days' element={<ReligiousDaysView />} />
					<Route path='/events' element={<EventsView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
