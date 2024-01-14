import { ContactForm } from 'lib/types';
import axios from 'axios';

export const contactForm = async (member: ContactForm) => {
	try {
		const data = axios.post<{ message: string }>(import.meta.env.VITE_API_URL + '/contact', member);
		return data;
	} catch (error) {
		throw error;
	}
};
