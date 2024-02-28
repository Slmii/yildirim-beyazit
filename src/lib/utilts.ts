import { isSameDay } from 'date-fns';
import { RELIGIOUS_DAYS, ReligiousDay } from './constants';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	// Remove the hash if it's there
	hex = hex.replace(/^#/, '');

	const digits = hex.length / 3;
	const red = parseInt(hex.substring(0, digits), 16);
	const green = parseInt(hex.substring(digits, digits * 2), 16);
	const blue = parseInt(hex.substring(digits * 2, digits * 3), 16);

	return { r: red, g: green, b: blue };
}

export const toReadableDate = (
	date: Date,
	options?: {
		locale?: string;
		includeTime?: boolean;
	}
) => {
	return date.toLocaleDateString(options?.locale ?? 'nl-NL', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: options?.includeTime ? '2-digit' : undefined,
		minute: options?.includeTime ? '2-digit' : undefined
	});
};

export const isToday = ({ day, month, year }: { day: number; month: number; year: number }): boolean => {
	const today = new Date();
	return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
};

export const getReligiousEventsForDay = ({
	day,
	month,
	year
}: {
	day: number;
	month: number;
	year: number;
}): ReligiousDay[] => {
	return RELIGIOUS_DAYS.filter(religiousDay =>
		isSameDay(
			new Date(year, month, day),
			new Date(religiousDay.miladi.year, religiousDay.miladi.month - 1, religiousDay.miladi.day)
		)
	);
};

export const getRemainingTime = (date: Date) => {
	const total = date.getTime() - new Date().getTime();
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));

	return {
		total,
		days: days < 10 ? `0${days}` : days.toString(),
		hours: hours < 10 ? `0${hours}` : hours.toString(),
		minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
		seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
	};
};
