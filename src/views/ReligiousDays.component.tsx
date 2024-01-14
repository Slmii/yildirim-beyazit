import { Box, ClickAwayListener, Divider, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { PageHeader } from 'components/PageHeader';
import { Section } from 'components/Section.component';
import { Title } from 'components/Typography';
import { DOW, MONTHS, PADDING, ReligiousDay } from 'lib/constants';
import { getReligiousEventsForDay, isToday } from 'lib/utilts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const YEAR = new Date().getFullYear();

export interface CalendarDay {
	day: number;
	month: number;
	year: number;
	data: ReligiousDay[];
}

export const ReligiousDaysView = () => {
	const { t } = useTranslation();

	return (
		<Stack component='section' id='religious-days'>
			<PageHeader
				src='./images/religious-days/bg.avif'
				title={t('header.religiousDays')}
				backgroundPosition='bottom'
			/>
			<Section
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: 4,
					py: PADDING / 2
				}}
			>
				<Title>{YEAR}</Title>
				<Grid container spacing={4}>
					{MONTHS.map((month, index) => (
						<Grid key={month} item xs={12} sm={6} md={3}>
							<Calendar year={YEAR} title={t(`months.${index + 1}`)} month={index} />
						</Grid>
					))}
				</Grid>
			</Section>
		</Stack>
	);
};

const Calendar = ({ title, year, month }: { title: string; year: number; month: number }) => {
	const { t } = useTranslation();
	const [days, setDays] = useState<CalendarDay[]>([]);

	useEffect(() => {
		// Adjust for Monday as the start of the week
		const startOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const prevMonthDays = new Date(year, month, 0).getDate();
		const totalDaysToShow = 35;

		const days: CalendarDay[] = [];
		// Show 5 rows and 7 columns. Fill in the empty columns from the previous or next month. Start the day on monday
		for (let i = 0; i < totalDaysToShow; i++) {
			const day = i + 1 - startOfMonth;
			if (day < 1) {
				const d = prevMonthDays + day;
				const m = month - 1;

				// Get the events matching date
				days.push({
					day: d,
					month: m,
					year,
					data: getReligiousEventsForDay({ day: d, month: m, year })
				});
			} else if (day > daysInMonth) {
				const d = day - daysInMonth;
				const m = month + 1;

				// Get the events matching date
				days.push({
					day: d,
					month: m,
					year,
					data: getReligiousEventsForDay({ day: d, month: m, year })
				});
			} else {
				// Get the events matching date
				days.push({ day, month, year, data: getReligiousEventsForDay({ day, month, year }) });
			}
		}

		setDays(days);
	}, [month, year]);

	return (
		<Stack spacing={0.5}>
			<Typography color='text.primary' fontFamily='Amita' variant='h5'>
				{title}
			</Typography>
			<Divider sx={{ borderColor: 'secondary.main' }} />
			<Box
				sx={{
					position: 'relative',
					display: 'grid',
					gridTemplateColumns: 'repeat(7, 1fr)'
				}}
			>
				{DOW.map((dow, index) => (
					<Typography variant='body2' fontWeight='bold' key={dow} textAlign='center'>
						{t(`dow.${index + 1}`)}
					</Typography>
				))}
			</Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(7, 1fr)'
				}}
			>
				{days.map(day => (
					<CalendarDay key={`${day.day}-${day.month}-${day.year}`} calendarDay={day} month={month} />
				))}
			</Box>
		</Stack>
	);
};

const CalendarDay = ({
	calendarDay: { data, day, month: m, year },
	month
}: {
	calendarDay: CalendarDay;
	month: number;
}) => {
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	const hasData = data.length > 0;
	const id = `${day}-${m + 1}-${year}`;

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				PopperProps={{
					disablePortal: true
				}}
				onClose={handleTooltipClose}
				open={open}
				arrow
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title={
					hasData ? (
						<Stack px={2} py={2} spacing={1}>
							{data.map(d => (
								<Stack
									spacing={-0.5}
									key={`${d.name}-${d.miladi.day}-${d.miladi.month}-${d.miladi.year}`}
								>
									<Typography variant='caption' fontFamily='Amita'>
										{d.hicri.day} {d.hicri.month} {d.hicri.year}
									</Typography>
									<Typography variant='body1' fontWeight='bold'>
										{d.name}
									</Typography>
								</Stack>
							))}
						</Stack>
					) : undefined
				}
			>
				<Box
					id={id}
					role={hasData ? 'button' : undefined}
					tabIndex={hasData ? 0 : -1}
					onClick={handleTooltipOpen}
					onMouseEnter={handleTooltipOpen}
					onMouseLeave={handleTooltipClose}
					sx={{
						visibility: month === m ? 'visible' : 'hidden',
						position: 'relative',
						padding: 1,
						width: 40,
						height: 40,
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minWidth: 'calc(100% / 7)',
						...(isToday({ day, month: m, year }) && {
							backgroundColor: 'secondary.main',
							color: 'secondary.contrastText',
							borderRadius: '50%'
						}),
						...(hasData && {
							'&:focus, &:active': {
								outline: 'none',
								filter: theme => `drop-shadow(0 0 0.1rem ${theme.palette.secondary.main})`
							}
						})
					}}
				>
					<Typography
						variant='body2'
						textAlign='center'
						fontFamily='Amita'
						sx={{
							...(isToday({ day, month: m, year }) && {
								color: 'secondary.contrastText',
								fontWeight: 'bold'
							})
						}}
					>
						{day}
					</Typography>
					{/* Indicator (dot) that there is an event on this day */}
					{data.length ? (
						<>
							<Box
								id='indicator'
								sx={{
									position: 'absolute',
									// Center X and Y
									top: '80%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									height: 6,
									width: 6,
									borderRadius: '50%',
									backgroundColor: 'primary.main'
								}}
							/>
						</>
					) : null}
				</Box>
			</Tooltip>
		</ClickAwayListener>
	);
};
