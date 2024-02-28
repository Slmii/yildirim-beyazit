import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { EventDateLocation } from 'components/Home';
import { PageHeader } from 'components/PageHeader';
import { Section } from 'components/Section.component';
import { Title } from 'components/Typography';
import { EVENTS, PADDING } from 'lib/constants';
import { getRemainingTime, toReadableDate } from 'lib/utilts';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const EventsView = () => {
	const { t, i18n } = useTranslation();

	const firstEvent = EVENTS[0];
	const remainingEvents = EVENTS.slice(1);

	const remainingTime = useMemo(() => {
		if (!firstEvent) {
			return;
		}

		return getRemainingTime(new Date(firstEvent.date));
	}, []);

	const remainingTimeValues = remainingTime
		? [
				{ title: 'events.days', value: remainingTime.days },
				{ title: 'events.hours', value: remainingTime.hours },
				{ title: 'events.minutes', value: remainingTime.minutes }
			]
		: [];

	return (
		<Stack component='section' id='events'>
			<PageHeader
				src='./images/events/bg2.avif'
				title={`Yıldırım Beyazıt ${t('header.events').toLowerCase()}`}
				backgroundPosition='bottom'
			/>
			{firstEvent ? (
				<>
					<Section
						maxWidth='lg'
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							py: PADDING / 2
						}}
					>
						<Grid container component={Paper} elevation={10}>
							<Grid item xs={12} md={6}>
								<Box
									height='100%'
									minHeight={380}
									sx={{
										borderTopLeftRadius: 2,
										borderBottomLeftRadius: 2,
										backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${firstEvent.img})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
								>
									<Stack
										direction='row'
										alignItems='flex-end'
										justifyContent='space-evenly'
										height='100%'
									>
										{remainingTimeValues.map(({ title, value }) => (
											<Stack key={title} alignItems='center' pb={4}>
												<Typography variant='h3' fontWeight='bold' color='common.white'>
													{value}
												</Typography>
												<Typography variant='h6' color='common.white'>
													{t(title)}
												</Typography>
											</Stack>
										))}
									</Stack>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Stack justifyContent='center' height='100%' p={8} spacing={4}>
									<Stack
										direction={['column', 'row']}
										alignItems={['flex-start', 'flex-start', 'center']}
										columnGap={4}
										rowGap={2}
										flexWrap='wrap'
									>
										<EventDateLocation event={firstEvent} locale={i18n.language} />
									</Stack>
									<Typography variant='h4' fontFamily='Amita' fontWeight='bold'>
										{t(firstEvent.title)}
									</Typography>
									<Typography variant='body1'>{t(firstEvent.description)}</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Section>
					{!!remainingEvents.length ? (
						<Section
							sx={{
								gap: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								py: PADDING
							}}
						>
							<Title>{t('events.subtitle')}</Title>
							<Stack width='100%'>
								<Divider />
								{remainingEvents.map(event => (
									<React.Fragment key={event.id}>
										<Stack
											direction='row'
											alignItems='center'
											p={4}
											height='100%'
											gap={4}
											flexWrap='wrap'
										>
											<Stack width={300}>
												<Typography variant='h4' fontFamily='Amita' fontWeight='bold'>
													{toReadableDate(new Date(event.date), { locale: i18n.language })}
												</Typography>
												<Typography variant='body1'>
													{t(`dow-full.${new Date(event.date).getDay()}`)}
												</Typography>
											</Stack>
											<Divider
												orientation='vertical'
												flexItem
												sx={{
													display: ['none', 'none', 'none', 'block']
												}}
											/>
											<Stack>
												<Typography gutterBottom variant='h6' fontWeight='bold'>
													{t(event.title)}
												</Typography>
												<Typography gutterBottom variant='body1'>
													{t(event.description)}
												</Typography>
												<Stack
													direction={['column', 'row']}
													alignItems={['flex-start', 'flex-start', 'center']}
													columnGap={4}
													flexWrap='wrap'
												>
													<EventDateLocation
														event={event}
														locale={i18n.language}
														iconSize='small'
													/>
												</Stack>
											</Stack>
										</Stack>
										<Divider />
									</React.Fragment>
								))}
							</Stack>
						</Section>
					) : (
						<NoEvents />
					)}
				</>
			) : (
				<Section
					sx={{
						gap: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						py: PADDING
					}}
				>
					<Typography variant='h4' fontFamily='Amita' fontWeight='bold'>
						{t('events.noEvents')}
					</Typography>
				</Section>
			)}
		</Stack>
	);
};

export const NoEvents = () => {
	const { t } = useTranslation();

	return (
		<Section
			sx={{
				gap: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				py: PADDING
			}}
		>
			<Typography variant='h4' fontFamily='Amita' fontWeight='bold'>
				{t('events.noEvents')}
			</Typography>
		</Section>
	);
};
