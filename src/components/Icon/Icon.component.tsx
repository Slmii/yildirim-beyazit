import { icons } from 'components/icons';
import { IconProps } from './Icon.types';
import { Tooltip } from '@mui/material';

export const Icon = ({ spacingLeft, spacingRight, icon, tooltip, ...props }: IconProps) => {
	const IconComponent = icons[icon as keyof typeof icons];

	return (
		<Tooltip title={tooltip ?? null} arrow>
			<IconComponent
				{...props}
				sx={{
					...props.sx,
					ml: spacingLeft ? 0.5 : 0,
					mr: spacingRight ? 0.5 : 0
				}}
			/>
		</Tooltip>
	);
};
