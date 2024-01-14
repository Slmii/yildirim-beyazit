import { Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button';

export const Main = () => {
	const { t } = useTranslation();

	return (
		<Stack
			component='section'
			width='100%'
			alignItems='center'
			justifyContent='center'
			sx={{
				minHeight: '100%',
				position: 'relative',
				backgroundImage:
					'linear-gradient(rgba(194, 14, 27, 0.5), rgba(50, 43, 128, 0.5)), url("./images/banner.jpeg")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				zIndex: 1,
				'&::before': {
					position: 'absolute',
					content: '""',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: -11
				}
			}}
		>
			<Container component='div' maxWidth='xl'>
				<Stack spacing={4}>
					<Typography variant='h2' component='h1' color='common.white' fontWeight='bold' textAlign='center'>
						{t('title')}
					</Typography>
					<Stack direction={['column', 'column', 'row']} gap={2} alignItems='center' justifyContent='center'>
						<Button
							variant='contained'
							size='large'
							sx={theme => ({
								height: 60,
								width: '100%',
								[theme.breakpoints.up('md')]: {
									width: 400
								}
							})}
							onClick={() => {
								const element = document.getElementById('contact');
								element?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							{t('contact.title')}
						</Button>
						<Button
							variant='contained'
							color='secondary'
							size='large'
							sx={theme => ({
								height: 60,
								width: '100%',
								[theme.breakpoints.up('md')]: {
									width: 200
								}
							})}
							href='https://betaalverzoek.rabobank.nl/betaalverzoek/?id=jIBzRf_zRrSVjVEVOhY2Uw'
							target='_blank'
						>
							{t('header.donations')}
						</Button>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};
