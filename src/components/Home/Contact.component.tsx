import { Box, Link, Paper, Stack } from '@mui/material';
import { ContactForm } from 'components/ContactForm';
import { Icon } from 'components/Icon';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { Icons } from 'components/icons';
import { PADDING } from 'lib/constants';
import { useTranslation } from 'react-i18next';

const ITEMS = [
	{
		label: 'contact.address',
		icon: 'location',
		description: 'Peysorhof 20\n7824 CP Emmen'
	},
	{
		label: 'contact.email',
		icon: 'email',
		description: 'hdvemmen@vakif.nl'
	}
];

export const Contact = () => {
	const { t } = useTranslation();

	return (
		<Section
			component='section'
			id='contact'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 5,
				pt: PADDING
			}}
		>
			<Stack direction={['column', 'column', 'row']} justifyContent='center' gap={5}>
				{ITEMS.map(({ label, icon, description }) => (
					<Paper
						key={label}
						elevation={4}
						sx={{
							px: 10,
							py: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 4,
							borderRadius: 1
						}}
					>
						<Box
							sx={{
								width: 90,
								height: 90,
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								bgcolor: 'primary.main'
							}}
						>
							<Icon icon={icon as Icons} fontSize='large' sx={{ color: 'primary.contrastText' }} />
						</Box>
						<Title>{t(label)}</Title>
						<Stack alignItems='center'>
							{icon === 'email' ? (
								<Link
									href='mailto:hdvemmen@vakif.nl'
									target='_blank'
									sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
								>
									<SubTitle>hdvemmen@vakif.nl</SubTitle>
								</Link>
							) : (
								<>
									{description.split('\n').map((text, index) => (
										<SubTitle key={index}>{text}</SubTitle>
									))}
								</>
							)}
						</Stack>
					</Paper>
				))}
			</Stack>
			<Paper
				elevation={4}
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					px: [4, 4, 10],
					py: 5,
					marginBottom: -10,
					position: 'relative',
					zIndex: 1
				}}
			>
				<Title>{t('contact.title')}</Title>
				<SubTitle>{t('contact.description')}</SubTitle>
				<ContactForm />
			</Paper>
		</Section>
	);
};
