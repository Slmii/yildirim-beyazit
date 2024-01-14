import { Button } from 'components/Button';
import { Field, Form, TelField } from '../Form';
import { useTranslation } from 'react-i18next';
import { ContactForm as IContactForm } from 'lib/types';
import { toast } from 'react-toastify';
import { api } from 'lib/api';
import { useMutation } from '@tanstack/react-query';

export const ContactForm = () => {
	const { t } = useTranslation();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: api.contactForm
	});

	const handleOnFormSubmit = async (values: IContactForm, reset: () => void) => {
		try {
			await mutateAsync(values);
			toast.success(t('membership.success'));

			reset();
		} catch (error) {
			const err = error as Error;
			toast.error(err.message);
		}
	};

	return (
		<Form<IContactForm>
			action={reset => data => handleOnFormSubmit(data, reset)}
			defaultValues={{
				name: '',
				email: '',
				phone: '',
				message: ''
			}}
		>
			<Field name='name' label={t('contact.form.name')} required />
			<Field name='email' type='email' label={t('contact.form.email')} required />
			<TelField name='phone' label={t('contact.form.phone')} />
			<Field name='message' label={t('contact.form.message')} multiline multilineRows={5} required />
			<Button
				loading={isPending}
				type='submit'
				sx={theme => ({
					width: 220,
					height: 70,
					[theme.breakpoints.down('md')]: {
						width: 'unset'
					}
				})}
				variant='contained'
				size='large'
			>
				{t('contact.form.send')}
			</Button>
		</Form>
	);
};
