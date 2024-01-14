import { Typography, TypographyProps } from '@mui/material';
import { TEXT_ALIGN } from 'lib/constants';
import { PropsWithChildren } from 'react';

export const Title = (props: PropsWithChildren<TypographyProps>) => {
	return (
		<Typography variant='h3' fontWeight='bold' textAlign={TEXT_ALIGN} {...props}>
			{props.children}
		</Typography>
	);
};

export const SubTitle = (props: PropsWithChildren<TypographyProps>) => {
	return (
		<Typography variant='h6' component='p' color='text.secondary' {...props}>
			{props.children}
		</Typography>
	);
};
