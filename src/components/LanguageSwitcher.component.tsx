import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { LANGUAGES } from 'lib/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button';

export const LanguageSwitcher = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { i18n } = useTranslation();

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
	const language = LANGUAGES.find(language => language.code === i18n.language);

	return (
		<>
			<Button onClick={handleClick} variant='outlined' size={size} startImage={language?.icon} sx={{ px: 4 }}>
				{language?.name}
			</Button>
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
