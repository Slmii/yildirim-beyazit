import { Form, Select } from 'components/Form';
import { Button } from 'components/Button';
import { DatePicker } from 'components/Form/DatePicker';
import { Field, IBANInput, TelField } from 'components/Form/Field';
import { useLocale } from 'lib/hooks';
import { schema } from 'lib/schemas';
import { MemberForm as IMemberForm } from 'lib/types';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { PADDING } from 'lib/constants';
import { useNavigate } from 'react-router-dom';
import { api } from 'lib/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PageHeader } from 'components/PageHeader';

export const MemberForm = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const locale = useLocale();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: api.addMember
	});

	const handleOnFormSubmit = async (values: IMemberForm, reset: () => void) => {
		try {
			await mutateAsync(values);
			toast.success(t('membership.success'));

			reset();
			navigate('/');
		} catch (error) {
			const err = error as Error;
			toast.error(err.message);
		}
	};

	return (
		<Stack component='section' id='member-form'>
			<PageHeader src='./images/member/bg.jpeg' title={t('header.membership')} />
			<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: PADDING / 2 }}>
				<Stack direction='column'>
					<Typography variant='h4' flexWrap='wrap' component='h1'>
						{t('membership.title')}
					</Typography>
					<Typography variant='h6' fontWeight='light' component='p'>
						{t('membership.subTitle')}
					</Typography>
				</Stack>
				<Form<IMemberForm>
					action={reset => data => handleOnFormSubmit(data, reset)}
					defaultValues={{
						name: '',
						birthday: null,
						address: '',
						zip: '',
						city: '',
						email: '',
						phone: '',
						bank: '',
						amount: ''
					}}
					schema={schema(t)}
					render={({ watch }) => (
						<>
							<Field name='name' label={t('membership.name')} />
							<DatePicker name='birthday' label={t('membership.birthday')} />
							<Stack direction={['column', 'column', 'row']} gap={2}>
								<Field fullWidth name='address' label={t('membership.address')} />
								<Field fullWidth name='zip' label={t('membership.zip')} />
								<Field fullWidth name='city' label={t('membership.city')} />
							</Stack>
							<Field name='email' label={t('membership.email')} />
							<TelField name='phone' label={t('membership.phone')} />
							<Stack direction={['column', 'column', 'row']} gap={2}>
								<IBANInput
									fullWidth
									name='bank'
									label={t('membership.bank')}
									placeholder='NL00 BANK 0000 0000 00'
								/>
								<Select
									name='amount'
									placeholder={t('membership.amount')}
									label={t('membership.amount')}
									options={[
										{
											id: '10',
											label: '€ 10'
										},
										{
											id: '25',
											label: '€ 25'
										},
										{
											id: '50',
											label: '€ 50'
										},
										{
											id: '100',
											label: '€ 100'
										}
									]}
								/>
							</Stack>
							<div>
								<Typography color='primary.main' variant='h6' fontWeight='bold' component='h2'>
									{t('membership.agreement.title')}
								</Typography>
								<Typography
									variant='body2'
									fontWeight='light'
									component='p'
									dangerouslySetInnerHTML={{
										__html: t('membership.agreement.text', {
											name: `<b>${watch('name').length ? watch('name') : '-'}</b>`,
											amount: `<b>${new Intl.NumberFormat(locale, {
												style: 'currency',
												currency: 'EUR'
											}).format(Number(watch('amount')))}</b>`
										})
									}}
								/>
							</div>
							<div>
								<Typography color='primary.main' variant='h6' fontWeight='bold' component='h2'>
									{t('membership.date')}
								</Typography>
								<Typography variant='body2' fontWeight='light' component='p'>
									{new Date().toLocaleDateString(locale, {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</Typography>
							</div>
							<Stack direction={['column', 'column', 'row']} gap={2}>
								<Button
									fullWidth
									variant='contained'
									size='large'
									type='submit'
									loading={isPending}
									sx={theme => ({
										[theme.breakpoints.up('md')]: {
											width: 'fit-content'
										}
									})}
								>
									{t('contact.form.send')}
								</Button>
								<Button
									fullWidth
									variant='outlined'
									size='large'
									disabled={isPending}
									sx={theme => ({
										[theme.breakpoints.up('md')]: {
											width: 'fit-content'
										}
									})}
									onClick={() => navigate('/')}
								>
									{t('membership.back')}
								</Button>
							</Stack>
						</>
					)}
				/>
			</Section>
		</Stack>
	);
};
