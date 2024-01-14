import { Stack, Tab, Tabs, Typography } from '@mui/material';
import { PageHeader } from 'components/PageHeader';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { PADDING } from 'lib/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
		sx: {
			alignItems: 'flex-start',
			minHeight: 'unset',
			padding: 0,
			paddingLeft: 2,
			my: 1,
			fontFamily: 'Amita',
			textTransform: 'none',
			fontSize: 20,
			fontWeight: 'bold'
		}
	};
}

export const IslamView = () => {
	const { t } = useTranslation();
	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack component='section' id='member-form'>
			<PageHeader src='./images/islam/bg.jpeg' title={t('header.islam')} />
			<Section
				sx={{
					display: 'flex',
					flexDirection: ['column', 'column', 'row'],
					flexGrow: 1,
					gap: [5, 5, 15],
					py: PADDING / 2
				}}
			>
				<Tabs
					orientation='vertical'
					variant='scrollable'
					value={value}
					onChange={handleChange}
					aria-label='Vertical tabs Islam'
					sx={theme => ({
						minWidth: 'fit-content',
						height: 'fit-content',
						[theme.breakpoints.up('md')]: {
							position: 'sticky',
							top: 158
						}
					})}
					TabIndicatorProps={{
						sx: {
							left: 0,
							width: 4,
							borderRadius: 2
						},
						style: {
							height: 20
						}
					}}
				>
					<Tab label={t('islam.islam.title')} {...a11yProps(0)} />
					<Tab label={t('islam.Allah.title')} {...a11yProps(1)} />
					<Tab label={t('islam.prophet.title')} {...a11yProps(2)} />
					<Tab label={t('islam.worship.title')} {...a11yProps(3)} />
					<Tab label={t('islam.living.title')} {...a11yProps(4)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Stack spacing={2}>
						<Title>{t('islam.islam.title')}</Title>
						<SubTitle>{t('islam.islam.subtitle')}</SubTitle>
						<Typography variant='body1'>{t('islam.islam.p1')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p2')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p3')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p4')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p5')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p6')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p7')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p8')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p9')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p10')}</Typography>
						<Typography variant='body1'>{t('islam.islam.p11')}</Typography>
					</Stack>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Stack spacing={2}>
						<Title>{t('islam.Allah.title')}</Title>
						<Typography variant='body1'>{t('islam.Allah.p1')}</Typography>
					</Stack>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Stack spacing={2}>
						<Title>{t('islam.prophet.title')}</Title>
						<Typography variant='body1'>{t('islam.prophet.p1')}</Typography>
					</Stack>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Stack spacing={2}>
						<Title>{t('islam.worship.title')}</Title>
						<Typography variant='body1'>{t('islam.worship.p1')}</Typography>
						<Typography variant='body1'>{t('islam.worship.p2')}</Typography>
						<Typography variant='body1'>{t('islam.worship.p3')}</Typography>
						<Typography variant='body1'>{t('islam.worship.p4')}</Typography>
						<Typography variant='body1'>{t('islam.worship.p5')}</Typography>
					</Stack>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<Stack spacing={2}>
						<Title>{t('islam.living.title')}</Title>
						<Typography variant='body1'>{t('islam.living.p1')}</Typography>
						<Typography variant='body1'>{t('islam.living.p2')}</Typography>
						<Typography variant='body1'>{t('islam.living.p3')}</Typography>
						<Typography variant='body1'>{t('islam.living.p4')}</Typography>
						<Typography variant='body1'>{t('islam.living.p5')}</Typography>
						<Typography variant='body1'>{t('islam.living.p6')}</Typography>
						<Typography variant='body1'>{t('islam.living.p7')}</Typography>
					</Stack>
				</TabPanel>
			</Section>
		</Stack>
	);
};
