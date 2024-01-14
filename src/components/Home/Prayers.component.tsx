import { Grid, Stack, Tooltip, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { PADDING } from 'lib/constants';
import { useQuery } from '@tanstack/react-query';
import { api } from 'lib/api';
import { useTranslation } from 'react-i18next';
import { Title } from 'components/Typography';
import { toReadableDate } from 'lib/utilts';

const now = new Date();

export const Prayers = () => {
	const { t, i18n } = useTranslation();
	const { data } = useQuery({
		queryKey: ['prayer-times'],
		queryFn: () => api.prayerTimes()
	});

	const prayerTime = data?.find(prayerTime => {
		const prayerDate = new Date(prayerTime.MiladiTarihUzunIso8601.split('T')[0]);

		return (
			prayerDate.getDate() === now.getDate() &&
			prayerDate.getMonth() === now.getMonth() &&
			prayerDate.getFullYear() === now.getFullYear()
		);
	});

	return (
		<Section
			component='section'
			id='prayer-times'
			maxWidth={false}
			disableGutters
			sx={{
				py: PADDING,
				position: 'relative',
				backgroundImage: `url("./images/prayers/bg.jpeg")`,
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
			<Stack gap={4} alignItems='center' width='100%'>
				<Title color='common.white'>{t('prayerTimes.title')}</Title>
				<Stack direction='row' alignItems='center' spacing={4}>
					<img src='./images/prayers/icon.png' alt='icon' width={50} height={50} />
					<Stack alignItems='center'>
						<Typography variant='body2' color='common.white'>
							{prayerTime?.HicriTarihUzun}
						</Typography>
						<Typography variant='body2' color='common.white'>
							{toReadableDate(new Date(), { locale: i18n.language })}
						</Typography>
					</Stack>
					<img src='./images/prayers/icon.png' alt='icon' width={50} height={50} />
				</Stack>
				<Section maxWidth='xl'>
					<Grid container spacing={0}>
						<PrayerTimeItem text={t('prayerTimes.fajr')} time={prayerTime?.Imsak ?? ''} />
						<PrayerTimeItem text={t('prayerTimes.shoeroeq')} time={prayerTime?.Gunes ?? ''} />
						<PrayerTimeItem text={t('prayerTimes.dhuhr')} time={prayerTime?.Ogle ?? ''} />
						<PrayerTimeItem text={t('prayerTimes.asr')} time={prayerTime?.Ikindi ?? ''} />
						<PrayerTimeItem text={t('prayerTimes.maghrib')} time={prayerTime?.Aksam ?? ''} />
						<PrayerTimeItem text={t('prayerTimes.isha')} time={prayerTime?.Yatsi ?? ''} />
					</Grid>
				</Section>
			</Stack>
		</Section>
	);
};

export const PrayerTimeItem = ({ text, time }: { text: string; time: string }) => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={2}>
			<Stack
				alignItems='center'
				justifyContent='center'
				height='100%'
				sx={{
					p: 2
				}}
			>
				<Tooltip title={text} arrow placement='top'>
					<Typography
						noWrap
						textAlign='center'
						variant='h5'
						fontFamily='Amita'
						fontWeight='bold'
						color='common.white'
					>
						{text}
					</Typography>
				</Tooltip>
				<Typography textAlign='center' variant='h6' color='common.white'>
					{time}
				</Typography>
			</Stack>
		</Grid>
	);
};
