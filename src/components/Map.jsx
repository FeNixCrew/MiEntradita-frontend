import React, { useRef, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

const ACCESS_TOKEN = 'pk.eyJ1Ijoibmljb2xhc21hcnRpbmV6MDUxMCIsImEiOiJja3cwbW84Z2VkaHhxMnZwZzIyODg5Nzk4In0.3WRMNapO4tRArFLEoenJKQ'

mapboxgl.accessToken = ACCESS_TOKEN;

function Map({ className = '', latitude = -34.599722, longitude = -58.381944}) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const nav = useMemo(() => new mapboxgl.NavigationControl(), []);

    const geolocate = useMemo(() => new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), []);

    useEffect(() => {
        if (map.current) {return;}
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 15,
        })

        console.log(latitude, longitude)

        new mapboxgl.Marker({color: 'red'})
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        map.current.addControl(geolocate, "top-right");
        map.current.addControl(nav, "top-right");

    }, [map, mapContainer, geolocate, nav, latitude, longitude]);

    return (<div ref={mapContainer} className={className} />);
}

export default Map;
