import { isToday } from 'date-fns';

export interface PrayerTimeResponse {
	Aksam: string;
	AyinSekliURL: string;
	GreenwichOrtalamaZamani: string;
	Gunes: string;
	GunesBatis: string;
	GunesDogus: string;
	HicriTarihKisa: string;
	HicriTarihKisaIso8601: string;
	HicriTarihUzun: string;
	HicriTarihUzunIso8601: string;
	Ikindi: string;
	Imsak: string;
	KibleSaati: string;
	MiladiTarihKisa: string;
	MiladiTarihKisaIso8601: string;
	MiladiTarihUzun: string;
	MiladiTarihUzunIso8601: string;
	Ogle: string;
	Yatsi: string;
}

export const prayerTimes = async (): Promise<PrayerTimeResponse[]> => {
	const prayerTimesLs = localStorage.getItem('prayerTimes');

	if (!prayerTimesLs) {
		return fetchPrayerTimes();
	}

	const prayerTimes = JSON.parse(prayerTimesLs) as PrayerTimeResponse[];

	// Check if the 5th prayer time from the tail is the same as the current date
	// If it is, we fetch new data
	const fifthPrayerTime = prayerTimes[prayerTimes.length - 5];
	const fifthPrayerTimeDate = new Date(fifthPrayerTime.MiladiTarihUzunIso8601);

	// If the 5th prayer time is today, we fetch new data
	if (isToday(fifthPrayerTimeDate)) {
		return fetchPrayerTimes();
	}

	return prayerTimes;
};

const fetchPrayerTimes = async () => {
	const response = await fetch('https://ezanvakti.herokuapp.com/vakitler/13880');
	const data = (await response.json()) as PrayerTimeResponse[];

	// Update localStorage
	localStorage.setItem('prayerTimes', JSON.stringify(data));

	return data;
};
