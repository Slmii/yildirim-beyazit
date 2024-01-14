import { Pillars, Main, Prayers, Services, Location, About, Contact, Member, Events } from 'components/Home';

export const HomeView = () => {
	return (
		<>
			<Main />
			<About />
			<Prayers />
			<Services />
			<Pillars />
			<Events />
			<Member />
			<Contact />
			<Location />
		</>
	);
};
