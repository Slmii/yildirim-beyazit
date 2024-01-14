import { MemberForm } from 'lib/types';
import axios from 'axios';

export const addMember = async (member: MemberForm) => {
	try {
		const data = axios.post<{ message: string }>(import.meta.env.VITE_API_URL + '/member', member);
		return data;
	} catch (error) {
		throw error;
	}
};
