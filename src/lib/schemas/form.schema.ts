import { TFunction } from 'i18next';
import * as yup from 'yup';
import IBAN from 'iban';

export const schema = (t: TFunction<'translation', undefined>) => {
	return yup
		.object()
		.shape({
			name: yup.string().required(t('schema.provideValue')),
			birthday: yup.string().required(t('schema.provideValue')),
			address: yup.string().required(t('schema.provideValue')),
			zip: yup.string().required(t('schema.provideValue')),
			city: yup.string().required(t('schema.provideValue')),
			phone: yup.string().required(t('schema.provideValue')),
			email: yup.string().required(t('schema.provideValue')).email(t('schema.provideValidEmail')),
			bank: yup
				.string()
				.required(t('schema.provideValue'))
				.test('is-iban', t('schema.provideValidIBAN'), value => {
					return !!value && IBAN.isValid(value);
				}),
			amount: yup.string().required(t('schema.provideValue'))
		})
		.required();
};
