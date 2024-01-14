import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Logo = ({ hasMobileText = false }: { hasMobileText?: boolean }) => {
	const navigate = useNavigate();

	return (
		<Stack
			direction='row'
			alignItems='center'
			gap={2}
			sx={{ flexGrow: 1, cursor: 'pointer' }}
			onClick={() => navigate('/')}
		>
			<Box
				component='img'
				src='./images/diyanet.png'
				alt='Diyanet'
				minHeight={64}
				minWidth={64}
				height={64}
				width={64}
				loading='lazy'
			/>
			<Typography
				variant='h6'
				fontFamily='Amita'
				component='div'
				sx={{ display: { xs: !hasMobileText ? 'none' : undefined, md: 'flex' } }}
			>
				Yıldırım Beyazıt Cami
			</Typography>
		</Stack>
	);
};
