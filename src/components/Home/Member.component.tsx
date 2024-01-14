import { Box, Stack, Typography } from '@mui/material';
import { Button } from 'components/Button';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { PADDING } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

export const Member = () => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const countUpRef = useRef(null);
	const { ref, inView } = useInView({
		triggerOnce: true
	});

	const { start } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: 150
	});

	useEffect(() => {
		if (inView) {
			start();
		}
	}, [inView, start]);

	return (
		<Box
			component='section'
			id='member'
			sx={{
				py: PADDING,
				position: 'relative',
				backgroundImage: `url("./images/member/${i18n.language === 'ar' ? 'bg-flip' : 'bg'}.jpeg")`,
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
			<Section>
				<Stack gap={4} alignItems='flex-start' width={['100%', '100%', '75%', '50%']}>
					<Title color='common.white'>{t('member.title')}</Title>
					<SubTitle
						color='common.white'
						sx={{
							textShadow: '0px 4px 4px rgba(0, 0, 0, 1)'
						}}
					>
						{t('member.description')}
					</SubTitle>
					<Stack ref={ref}>
						<Title
							color='common.white'
							sx={{
								textShadow: '#FC0 1px 0 10px'
							}}
						>
							<Box
								component='span'
								sx={{ minWidth: [0, 0, 80], display: 'inline-flex' }}
								ref={countUpRef}
							/>{' '}
							+
						</Title>
						<Typography
							sx={{
								textShadow: '#FC0 1px 0 10px'
							}}
							color='common.white'
						>
							{t('member.members')}
						</Typography>
					</Stack>
					<Button
						sx={theme => ({
							width: 220,
							height: 70,
							[theme.breakpoints.down('md')]: {
								width: '100%'
							}
						})}
						variant='contained'
						color='secondary'
						size='large'
						onClick={() => navigate('/membership')}
					>
						{t('member.button')}
					</Button>
				</Stack>
			</Section>
		</Box>
	);
};
