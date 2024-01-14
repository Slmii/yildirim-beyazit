import { Box, ButtonBase, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { LANGUAGES } from 'lib/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button';

export const LanguageSwitcher = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { i18n } = useTranslation();

	useEffect(() => {
		if (!['nl', 'tr', 'ar'].includes(i18n.language)) {
			i18n.changeLanguage('nl');
		}
	}, [i18n.language]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (lng: string) => {
		handleClose();
		i18n.changeLanguage(lng);
	};

	const open = Boolean(anchorEl);
	const language = LANGUAGES.find(language => language.code.split('-')[0] === i18n.language);

	return (
		<>
			{size === 'small' ? (
				<ButtonBase onClick={handleClick} sx={{ width: 40, height: 'fit-content', borderRadius: 1 }}>
					<Box component='img' src={language?.icon} width='100%' alt={language?.name} borderRadius={1} />
				</ButtonBase>
			) : (
				<Button
					onClick={handleClick}
					variant='text'
					size={size}
					startImage={language?.icon}
					sx={{ px: 4, fontFamily: 'Amita', textTransform: 'none' }}
				>
					{language?.name}
				</Button>
			)}

			<Menu
				id='language-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'language-button'
				}}
			>
				{LANGUAGES.map(language => (
					<MenuItem key={language.code} onClick={() => handleChange(language.code)}>
						<ListItemIcon>
							<img src={language.icon} alt={language.name} width={20} />
						</ListItemIcon>
						{language.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
