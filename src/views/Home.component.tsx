import { Pillars, Main, Prayers, Services, About, Contact, Member, Events, Khutbe } from 'components/Home';

export const HomeView = () => {
	return (
		<>
			<Main />
			<About />
			<Prayers />
			<Khutbe />
			<Services />
			<Pillars />
			<Events />
			<Member />
			<Contact />
		</>
	);
};
