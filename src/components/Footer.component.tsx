import { PADDING } from 'lib/constants';
import { Section } from './Section.component';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Icon } from 'components/Icon';
import { Logo } from 'components/Logo';

export const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				py: PADDING,
				backgroundColor: 'rgba(0, 0, 0, 0.9)',
				color: 'common.white'
			}}
		>
			<Section
				component='footer'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: [2, 2, 0]
				}}
			>
				<Box
					sx={{
						gap: 2,
						width: '100%',
						display: 'flex',
						flexDirection: ['column', 'column', 'row'],
						alignItems: 'center',
						justifyContent: ['center', 'center', 'space-between']
					}}
				>
					<Logo hasMobileText />
					<Stack direction='row' alignItems='center' justifyContent='center'>
						<IconButton
							color='inherit'
							aria-label='instagram'
							href='https://www.instagram.com/hdvemmen/'
							target='_blank'
						>
							<Icon icon='instagram' />
						</IconButton>
						<IconButton color='inherit' aria-label='diyanet' href='https://diyanet.nl/' target='_blank'>
							<img src='./images/diyanet.png' alt='Diyanet' height={28} width={28} loading='lazy' />
						</IconButton>
					</Stack>
				</Box>
				<Typography variant='body2' textAlign={['center', 'center', 'right']}>
					© {new Date().getFullYear()} Yıldırım Beyazıt Cami
				</Typography>
			</Section>
		</Box>
	);
};
