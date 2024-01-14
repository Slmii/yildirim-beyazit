import {
	AppBar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Slide,
	Stack,
	Toolbar,
	Typography,
	useMediaQuery,
	useScrollTrigger,
	useTheme
} from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher.component';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button';
import { Logo } from 'components/Logo';
import { Icon } from './Icon';
import { useMemo, useState } from 'react';
import { Section } from './Section.component';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderItem {
	label: string;
	action?: () => void;
	href?: string;
	divider?: boolean;
}

export const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const headerItems: HeaderItem[] = useMemo(
		() => [
			{
				label: t('header.contact'),
				action: () => {
					const element = document.getElementById('contact');
					element?.scrollIntoView({ behavior: 'smooth' });
				}
			},
			{
				label: t('header.donations'),
				href: 'https://betaalverzoek.rabobank.nl/betaalverzoek/?id=jIBzRf_zRrSVjVEVOhY2Uw'
			}
		],
		[t]
	);

	const subHeaderItems: HeaderItem[] = useMemo(
		() => [
			{
				label: t('header.islam'),
				action: () => navigate('/islam')
			},
			{
				label: t('header.services'),
				action: () => {
					navigate('/');

					setTimeout(() => {
						const element = document.getElementById('services');
						element?.scrollIntoView({ behavior: 'smooth' });
					}, 0);
				}
			},
			{
				label: t('header.events'),
				action: () => navigate('/events')
			},
			{
				label: t('header.membership'),
				action: () => navigate('/membership')
			},
			{
				label: t('header.religiousDays'),
				action: () => navigate('/religious-days')
			},
			{
				label: t('header.funeralFund'),
				action: () => window.open('https://diyanet.nl/cenaze-fonu/form-ve-bilgi-isteme/', '_blank')
			}
		],

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t]
	);

	const allHeaderItems = useMemo((): HeaderItem[] => {
		if (isMdUp) {
			return headerItems;
		}

		return [...headerItems, ...subHeaderItems];
	}, [headerItems, isMdUp, subHeaderItems]);

	return (
		<>
			<HideOnScroll>
				<AppBar
					elevation={0}
					sx={theme => ({
						py: 2,
						[theme.breakpoints.up('md')]: {
							pb: 0
						},
						[theme.breakpoints.down('md')]: {
							borderBottom: theme => `1px solid ${theme.palette.divider}`
						},
						'&.MuiPaper-root': {
							backgroundColor: '#ffffff',
							color: '#000000'
						}
					})}
				>
					<Toolbar>
						<Container
							component='div'
							maxWidth='xl'
							sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
						>
							<Logo />
							<Stack direction='row' gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
								{allHeaderItems.map(item => (
									<Button
										key={item.label}
										size='large'
										color='secondary'
										variant='text'
										onClick={item.action}
										href={item.href}
										target={item.href ? '_blank' : undefined}
										sx={{
											fontFamily: 'Amita',
											fontWeight: 'bold',
											textTransform: 'none'
										}}
									>
										{item.label}
									</Button>
								))}
								<LanguageSwitcher />
							</Stack>
							<Stack direction='row' gap={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
								<LanguageSwitcher size='small' />
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'
								>
									<Icon icon='menu' />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left'
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: 'block', md: 'none' }
									}}
								>
									{allHeaderItems.map(item => (
										<MenuItem
											key={item.label}
											onClick={() => {
												handleCloseNavMenu();

												if (item.href) {
													window.open(item.href, '_blank');
													return;
												}

												item.action?.();
											}}
										>
											<Typography textAlign='center'>{item.label}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Stack>
						</Container>
					</Toolbar>
					<Stack
						direction='row'
						sx={{
							display: { xs: 'none', md: 'flex' },
							mt: { xs: 0, md: 2 },
							py: { xs: 0, md: 1 },
							backgroundColor: 'grey.100'
						}}
					>
						<Section
							sx={{
								gap: 4,
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							{subHeaderItems.map(item => (
								<React.Fragment key={item.label}>
									<Button
										size='large'
										variant='text'
										color='inherit'
										onClick={item.action}
										sx={{
											fontFamily: 'Amita',
											fontWeight: 'bold',
											textTransform: 'none',
											position: 'relative'
										}}
									>
										{item.label}
										<Box
											sx={{
												display: 'none',
												position: 'absolute',
												height: 5,
												width: 5,
												bgcolor: 'primary.main',
												bottom: 5
											}}
										/>
									</Button>
								</React.Fragment>
							))}
						</Section>
					</Stack>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</>
	);
};

function HideOnScroll({ children }: { children: React.ReactElement }) {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}
