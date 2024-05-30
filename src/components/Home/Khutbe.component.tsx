import { Box, Paper, Stack } from '@mui/material';
import { Section } from 'components/Section.component';
import { SubTitle, Title } from 'components/Typography';
import { PADDING } from 'lib/constants';
import { useLocale } from 'lib/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup } from './Events.component';

export const items = [
	{
		label: 'Vaaz',
		link: 'https://www.youtube.com/watch?v=23baOGp76Cs',
		date: '2024-05-17'
	},
	{
		label: 'Khutbah',
		link: 'https://www.youtube.com/watch?v=jEwJBMHYEcg',
		date: '2024-05-17'
	},
	{
		label: 'Vaaz',
		link: 'https://www.youtube.com/watch?v=UbMSGWasFA0',
		date: '2024-05-10'
	},
	{
		label: 'Khutbah',
		link: 'https://www.youtube.com/watch?v=gduP-4Erx3E',
		date: '2024-05-10'
	}
];

const youtubeUrlRegex =
	/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\s*[^/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&][^#\s]*)?$/;

const getYoutubeVideoId = (url: string) => {
	const match = url.match(youtubeUrlRegex);
	return match ? match[1] : undefined;
};

export const Khutbe = () => {
	const { t } = useTranslation();
	const locale = useLocale();

	const [active, setActive] = useState(items[0]);
	const youtubeId = getYoutubeVideoId(active.link);

	return (
		<Section
			component='section'
			id='khutbe'
			sx={{
				py: PADDING
			}}
		>
			<Stack gap={4} alignItems='center' position='relative'>
				<Title textAlign='center'>{t('kutbe.title')}</Title>
				<Stack gap={1} alignItems='center' width='80%'>
					<SubTitle>
						{active.label} -{' '}
						{new Date(active.date).toLocaleDateString(locale, {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</SubTitle>
					<Paper elevation={10} sx={{ height: 600, width: '100%', borderRadius: 1 }}>
						<Box
							component='iframe'
							width='100%'
							height='100%'
							src={`https://www.youtube.com/embed/${youtubeId}`}
							frameBorder='0'
							allowFullScreen
							sx={{ borderRadius: 'inherit' }}
						/>
					</Paper>
				</Stack>
				<ButtonGroup
					next={() => {
						const index = items.indexOf(active);
						setActive(items[index + 1] || items[0]);
					}}
					previous={() => {
						const index = items.indexOf(active);
						setActive(items[index - 1] || items[items.length - 1]);
					}}
				/>
			</Stack>
		</Section>
	);
};
