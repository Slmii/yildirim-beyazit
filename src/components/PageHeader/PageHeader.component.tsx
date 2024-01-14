import { Stack } from '@mui/material';
import { Title } from 'components/Typography';

export const PageHeader = ({
	src,
	title,
	backgroundPosition = 'center'
}: {
	title: string;
	src: string;
	backgroundPosition?: string;
}) => {
	return (
		<Stack
			alignItems='center'
			justifyContent='center'
			width='100%'
			height={[200, 300, 400]}
			mt={['30px', '30px', '95px']}
			sx={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${src})`,
				backgroundSize: 'cover',
				backgroundPosition: backgroundPosition,
				backgroundRepeat: 'no-repeat'
			}}
		>
			<Title color='common.white'>{title}</Title>
		</Stack>
	);
};
