import { Box, ButtonBase, Grid, Stack, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { EVENTS, PADDING } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { getRemainingTime, toReadableDate } from 'lib/utilts';
import { UpcomingEvent } from 'lib/types';
import { Icon } from 'components/Icon';
import { Link } from 'components/Link';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Events = () => {
	const { t } = useTranslation();

	const futureEvents = EVENTS.filter(event => {
		// Filter out events that have already passed
		const date = new Date(event.date);
		const now = new Date();
		return date > now;
	}).sort((a, b) => {
		// Sort events by date
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateA > dateB ? 1 : -1;
	});

	return (
		<Section
			component='section'
			id='events'
			sx={{
				py: PADDING
			}}
		>
			<Stack gap={4}>
				<Title textAlign='center'>{t('events.title')}</Title>
				<Box position='relative'>
					<Carousel
						responsive={{
							desktop: {
								breakpoint: { max: 3000, min: 1024 },
								items: 1
							},
							tablet: {
								breakpoint: { max: 1024, min: 464 },
								items: 1
							},
							mobile: {
								breakpoint: { max: 464, min: 0 },
								items: 1
							}
						}}
						showDots
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						customDot={<CustomDot />}
						renderButtonGroupOutside={true}
						arrows={false}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						customButtonGroup={<ButtonGroup />}
					>
						{futureEvents.map(event => (
							<UpcomingEvent key={event.id} event={event} />
						))}
					</Carousel>
				</Box>
				<Link href='/events' fontFamily='Amita' variant='h5' textAlign='center' color='primary.main'>
					{t('events.all')}
				</Link>
			</Stack>
		</Section>
	);
};

const ButtonGroup = ({ next, previous }: { next: () => void; previous: () => void }) => {
	return (
		<Box
			position='absolute'
			sx={{
				// Center Y
				top: '50%',
				transform: 'translateY(-50%)',
				position: 'absolute',
				zIndex: 1,
				width: '100%',
				diaplay: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<ButtonBase
				onClick={() => previous()}
				sx={{
					// Center Y
					top: '50%',
					transform: 'translateY(-50%)',
					position: 'absolute',
					left: 0,
					backgroundColor: 'primary.main',
					p: 2,
					borderRadius: '50%',
					color: 'primary.contrastText',
					boxShadow: theme => `0 0 10px ${theme.palette.common.black}`
				}}
			>
				<Icon icon='arrow-left' />
			</ButtonBase>
			<ButtonBase
				onClick={() => next()}
				sx={{
					// Center Y
					top: '50%',
					transform: 'translateY(-50%)',
					position: 'absolute',
					right: 0,
					backgroundColor: 'primary.main',
					p: 2,
					borderRadius: '50%',
					color: 'primary.contrastText',
					boxShadow: theme => `0 0 10px ${theme.palette.common.black}`
				}}
			>
				<Icon icon='arrow-right' />
			</ButtonBase>
		</Box>
	);
};

const CustomDot = ({ onClick, ...rest }: { onClick: () => void; index: number; active: boolean }) => {
	const { index, active } = rest;

	return (
		<ButtonBase
			onClick={() => onClick()}
			sx={{
				width: 10,
				height: 10,
				borderRadius: '50%',
				bgcolor: active ? 'primary.main' : 'transparent',
				m: 1,
				border: theme => `1px solid ${theme.palette.primary.main}`,
				borderColor: ['primary.main', 'primary.main', index <= 2 ? 'white' : 'primary.main'],
				boxShadow: theme => `0 0 10px ${theme.palette.common.black}`
			}}
		/>
	);
};

const UpcomingEvent = ({ event }: { event: UpcomingEvent }) => {
	const { t, i18n } = useTranslation();

	// Add time to date
	const date = new Date(event.date);
	const time = event.time.split(':');
	date.setHours(Number(time[0]));
	date.setMinutes(Number(time[1]));

	const { days, hours, minutes } = getRemainingTime(date);

	const remainingTimeValues = [
		{ title: 'events.days', value: days },
		{ title: 'events.hours', value: hours },
		{ title: 'events.minutes', value: minutes }
	];

	return (
		<Stack
			direction='row'
			spacing={2}
			sx={{
				borderRadius: 20,
				height: [undefined, undefined, 560],
				position: 'relative',
				backgroundImage: 'url("./images/events/bg.jpeg")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				zIndex: 1,
				py: [4, 4, 0],
				'&::before': {
					position: 'absolute',
					content: '""',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: '#F6F6F6',
					zIndex: -11,
					opacity: 0.7,
					borderRadius: 20
				}
			}}
		>
			<Grid container>
				<Grid item xs={12} md={6}>
					<Stack width='100%' height={560} borderRadius={20} alignItems='center'>
						<Box
							component='img'
							src={event.img}
							height={560}
							width={[500, 500, '100%']}
							loading='lazy'
							sx={{ objectFit: 'cover', borderRadius: 'inherit' }}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} md={6}>
					<Stack justifyContent='center' height='100%' width='100%' gap={2} px={8} mt={[4, 4, 0]}>
						<Title>{t(event.title)}</Title>
						<EventDateLocation event={event} locale={i18n.language} />
						<Stack
							mt={2}
							spacing={5}
							direction='row'
							alignItems='center'
							justifyContent={['center', 'center', 'flex-start']}
						>
							{remainingTimeValues.map(value => (
								<Stack alignItems='center' key={value.title} spacing={1}>
									<Stack
										alignItems='center'
										justifyContent='center'
										sx={{
											width: 80,
											height: 80,
											borderRadius: '50%',
											border: theme => `1px solid ${theme.palette.primary.main}`
										}}
									>
										<SubTitle color='text.primary' fontWeight='bold' fontFamily='Amita'>
											{value.value}
										</SubTitle>
									</Stack>
									<Typography variant='body1'>{t(value.title)}</Typography>
								</Stack>
							))}
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
};

export const EventDateLocation = ({
	event,
	locale,
	iconSize = 'medium'
}: {
	event: UpcomingEvent;
	locale: string;
	iconSize?: 'small' | 'medium';
}) => {
	return (
		<>
			<Stack
				gap={1}
				direction='row'
				alignItems='center'
				justifyContent={['center', 'center', 'flex-start']}
				sx={{
					color: 'text.secondary'
				}}
			>
				<Icon icon='clock' color='primary' fontSize={iconSize} />
				<Typography variant='body1' fontFamily='Amita'>
					{toReadableDate(new Date(event.date), {
						locale
					})}
				</Typography>
				<Typography variant='body1' fontFamily='Amita'>
					@ {event.time}
				</Typography>
			</Stack>
			<Stack
				gap={1}
				direction='row'
				alignItems='center'
				justifyContent={['center', 'center', 'flex-start']}
				sx={{
					color: 'text.secondary'
				}}
			>
				<Icon icon='location' color='primary' fontSize={iconSize} />
				<Typography variant='body1' fontFamily='Amita'>
					{event.location}
				</Typography>
			</Stack>
		</>
	);
};
