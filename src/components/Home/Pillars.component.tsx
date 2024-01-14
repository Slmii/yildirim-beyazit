import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { PADDING, TRANSITION_OPTIONS } from 'lib/constants';
import { useTranslation } from 'react-i18next';

export const Pillars = () => {
	const { t } = useTranslation();

	const pillarsIslam = [
		{
			title: t('pillars.islam.shahada'),
			description: ''
		},
		{
			title: t('pillars.islam.salah'),
			description: ''
		},
		{
			title: t('pillars.islam.sawm'),
			description: ''
		},
		{
			title: t('pillars.islam.zakat'),
			description: ''
		},
		{
			title: t('pillars.islam.hajj'),
			description: ''
		}
	];

	// const pillarsImaan = [
	// 	{
	// 		title: t('pillars.imaan.tawheed'),
	// 		description: ''
	// 	},
	// 	{
	// 		title: t('pillars.imaan.malaikah'),
	// 		description: ''
	// 	},
	// 	{
	// 		title: t('pillars.imaan.kutub'),
	// 		description: ''
	// 	},
	// 	{
	// 		title: t('pillars.imaan.rusul'),
	// 		description: ''
	// 	},
	// 	{
	// 		title: t('pillars.imaan.lastDay'),
	// 		description: ''
	// 	},
	// 	{
	// 		title: t('pillars.imaan.qadr'),
	// 		description: ''
	// 	}
	// ];

	return (
		<Box
			component='section'
			id='pillars'
			sx={{
				py: PADDING,
				position: 'relative',
				backgroundImage: 'url("./images/pillars/bg.png")',
				zIndex: 1,
				'&::before': {
					position: 'absolute',
					content: '""',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: '#F6F6F6',
					zIndex: -11,
					opacity: 0.7
				}
			}}
		>
			<Section>
				<Stack gap={4}>
					<Stack>
						<Title textAlign='center' gutterBottom>
							{t('pillars.islam.title')}
						</Title>
						<SubTitle textAlign='center'>{t('pillars.islam.description')}</SubTitle>
					</Stack>
					<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
						{pillarsIslam.map((pillar, index) => (
							<Grid key={pillar.title} item xs={12} sm={6} md={4} lg={2.4}>
								<Stack
									spacing={2}
									mt={[0, 0, index % 2 === 0 ? 0 : 8]}
									mb={[0, 0, index % 2 !== 0 ? 0 : 8]}
								>
									<Paper
										elevation={10}
										component='img'
										loading='lazy'
										src={`./images/pillars/${index + 1}.jpeg`}
										sx={{
											width: '100%',
											height: 300,
											borderRadius: 4,
											transition: theme =>
												theme.transitions.create('transform', TRANSITION_OPTIONS),
											'&:hover': {
												// Scale
												transform: 'scale(1.05)'
											}
										}}
									/>
									<Typography variant='h5' component='p' fontFamily='Amita' textAlign='center'>
										{pillar.title}
									</Typography>
								</Stack>
							</Grid>
						))}
					</Grid>
				</Stack>
			</Section>
		</Box>
	);
};
