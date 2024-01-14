import * as prayerTimes from './prayer-times';
import * as member from './member';
import * as contact from './contact';

export const api = {
	...prayerTimes,
	...member,
	...contact
};
