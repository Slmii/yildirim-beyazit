import { Pillars, Main, Prayers, Services, About, Contact, Member } from 'components/Home';

export const HomeView = () => {
	return (
		<>
			<Main />
			<About />
			<Prayers />
			<Services />
			<Pillars />
			{/* <Events /> */}
			<Member />
			<Contact />
			{/* <Location /> */}
		</>
	);
};
