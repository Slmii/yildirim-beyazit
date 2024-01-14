import { Box, ButtonBase, Grid, Stack, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { EVENTS, PADDING } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { getRemainingTime, toReadableDate } from 'lib/utilts';
import { UpcomingEvent } from 'lib/types';
import { Icon } from 'components/Icon';
import { Link } from 'components/Link';
import useEmblaCarousel from 'embla-carousel-react';

export const Events = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ active: true });
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
				<Box
					className='embla'
					ref={emblaRef}
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
					<div className='embla__container'>
						{futureEvents.map(event => (
							<div className='embla__slide' key={event.id}>
								<UpcomingEvent event={event} />
							</div>
						))}
					</div>
					<ButtonGroup next={() => emblaApi?.scrollNext()} previous={() => emblaApi?.scrollPrev()} />
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
		<Stack direction='row' spacing={2}>
			<Grid container>
				<Grid item xs={12} md={6}>
					<Stack width='100%' height={[400, 400, 560]} borderRadius={20} alignItems='center' px={[4, 4, 0]}>
						<Box
							component='img'
							src={event.img}
							height='100%'
							width='100%'
							loading='lazy'
							sx={{ objectFit: 'cover', borderRadius: 'inherit' }}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} md={6}>
					<Stack justifyContent='center' height='100%' width='100%' gap={2} px={[4, 8]} mt={[4, 4, 0]}>
						<Title>{t(event.title)}</Title>
						<Stack>
							<EventDateLocation event={event} locale={i18n.language} />
						</Stack>
						<Stack
							mt={2}
							gap={2}
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
