import MuiLink, { LinkProps as MuiLinksProps } from '@mui/material/Link';
import { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LinkProps } from './Link.types';

export const Link = ({
	href,
	onClick,
	children,
	target,
	noWrap,
	...props
}: PropsWithChildren<LinkProps & MuiLinksProps>) => {
	return (
		<MuiLink
			component={RouterLink}
			to={href}
			color='text.primary'
			sx={{
				textDecoration: 'unset',
				'&:hover > *': {
					color: 'primary.main',
					textDecoration: 'underline'
				},
				...(noWrap && {
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis'
				}),
				...props.sx
			}}
			onClick={onClick}
			target={target}
			{...props}
		>
			{children}
		</MuiLink>
	);
};
