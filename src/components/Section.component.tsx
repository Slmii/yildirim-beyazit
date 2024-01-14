import { Container, ContainerProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export const Section = ({ children, ...props }: PropsWithChildren<ContainerProps>) => {
	return (
		<Container component='div' maxWidth='xl' {...props}>
			{children}
		</Container>
	);
};
