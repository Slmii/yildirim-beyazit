import MuiButton from '@mui/material/Button';
import { CustomButtonProps } from './Button.types';
import { Icon } from 'components/Icon';
import Box from '@mui/material/Box';
import { CircularProgress, Tooltip } from '@mui/material';

export const Button = ({
	tooltip,
	loading,
	startIcon,
	endIcon,
	startImage,
	endImage,
	children,
	...props
}: CustomButtonProps) => {
	const button = (
		<MuiButton
			{...props}
			disabled={props.disabled || loading}
			startIcon={
				!loading ? (
					startIcon ? (
						<Icon icon={startIcon} />
					) : startImage ? (
						<Box component='img' borderRadius={1} src={startImage} alt='' height={20} />
					) : undefined
				) : undefined
			}
			endIcon={
				!loading ? (
					endIcon ? (
						<Icon icon={endIcon} />
					) : endImage ? (
						<Box component='img' borderRadius={1} src={startImage} alt='' height={20} />
					) : undefined
				) : undefined
			}
		>
			{loading ? (
				<CircularProgress
					color='inherit'
					size={20}
					sx={{
						marginRight: 1
					}}
				/>
			) : null}
			{children}
		</MuiButton>
	);

	return (
		<>
			{tooltip ? (
				<Tooltip arrow title={tooltip ?? null}>
					{props.disabled ? <span>{button}</span> : button}
				</Tooltip>
			) : (
				<>{button}</>
			)}
		</>
	);
};
