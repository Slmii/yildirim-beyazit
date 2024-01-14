import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';

const defaultProps = {
	center: {
		lat: 52.780546,
		lng: 6.923639
	},
	zoom: 17
};

export const Location = () => {
	const renderMarkers = (map: unknown, maps: unknown) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const marker = new maps.Marker({
			position: { lat: defaultProps.center.lat, lng: defaultProps.center.lng },
			map,
			title: 'Hello World!'
		});

		return marker;
	};

	return (
		<Box component='section' id='map' height={500} width='100%' position='relative'>
			<Box height={500}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: '' }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
				/>
			</Box>
		</Box>
	);
};
