import { ButtonBase, Card, CardContent, CardMedia, Fade, Grid, Paper, Slide, Stack, Typography } from '@mui/material';
import { Icon } from 'components/Icon';
import { Section } from 'components/Section.component';
import { Title } from 'components/Typography';
import { PADDING, SERVICES, TRANSITION_OPTIONS } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { ref, inView } = useInView({
		triggerOnce: true,
		delay: 250
	});

	return (
		<Section
			component='section'
			id='services'
			sx={{
				py: PADDING
			}}
		>
			<Stack gap={4} ref={ref}>
				<Title textAlign='center'>{t('services.title')}</Title>
				<Fade in={inView} timeout={1000}>
					<div>
						<Slide direction='up' in={inView} timeout={1000}>
							<Grid container spacing={2}>
								{SERVICES.map(item => (
									<Activity key={item.title} title={t(item.title)} src={item.src} />
								))}
								<Grid item xs={12} sm={6} md={4}>
									<Paper
										elevation={10}
										component={ButtonBase}
										onClick={() => navigate('/services')}
										sx={{
											py: PADDING,
											alignItems: 'center',
											justifyContent: 'center',
											width: '100%',
											height: '100%',
											borderRadius: 1,
											color: 'primary.main',
											transition: theme =>
												theme.transitions.create(
													['background-color', 'color'],
													TRANSITION_OPTIONS
												),
											'&:hover': {
												backgroundColor: 'primary.light',
												color: 'primary.contrastText'
											}
										}}
									>
										<Typography variant='h5' component='p' fontFamily='Amita'>
											{t('services.more')}
										</Typography>
										<Icon icon='arrow-right' fontSize='large' color='inherit' />
									</Paper>
								</Grid>
							</Grid>
						</Slide>
					</div>
				</Fade>
			</Stack>
		</Section>
	);
};

const Activity = ({ src, title }: { title: string; src: string }) => {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card elevation={10}>
				<CardMedia component='img' height='220' image={src} alt={title} />
				<CardContent sx={{ p: 4 }}>
					<Typography variant='h5' component='p' fontFamily='Amita'>
						{title}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};
