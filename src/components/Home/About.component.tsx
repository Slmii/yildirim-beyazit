import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Section } from 'components/Section.component';
import { PADDING } from 'lib/constants';

export const About = () => {
	return (
		<Box
			id='about'
			component='section'
			sx={{
				py: PADDING,
				position: 'relative',
				backgroundImage: `url("./images/about/bg.png")`,
				backgroundSize: 'fill',
				backgroundPosition: 'top-left',
				backgroundRepeat: 'no-repeat',
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
			<Section maxWidth='lg'>
				<Grid container>
					<Grid item xs={12} md={6}>
						<Box
							component={Paper}
							elevation={10}
							height='100%'
							minHeight={380}
							sx={{
								borderRadius: 1,
								backgroundImage: 'url(./images/banner.jpeg)',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat'
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Stack justifyContent='flex-start' height='100%' px={8} spacing={2}>
							<Typography variant='h6' color='primary.main'>
								Onze historie
							</Typography>
							<Typography variant='h4' fontFamily='Amita' fontWeight='bold'>
								Over Yildirim Beyazit
							</Typography>
							<Typography variant='body1'>dajhdakjdad</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Section>
		</Box>
	);
};
