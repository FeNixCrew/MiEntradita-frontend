import React, { useRef, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

const ACCESS_TOKEN = 'pk.eyJ1Ijoibmljb2xhc21hcnRpbmV6MDUxMCIsImEiOiJja3cwbW84Z2VkaHhxMnZwZzIyODg5Nzk4In0.3WRMNapO4tRArFLEoenJKQ'

mapboxgl.accessToken = ACCESS_TOKEN;

function Map({ className = ''}) {
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
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-58.449444, -34.545278],
            zoom: 15,
        })

        new mapboxgl.Marker({color: 'red'})
            .setLngLat([-58.449444, -34.545278])
            .addTo(map.current);

        map.current.addControl(geolocate, "top-right");
        map.current.addControl(nav, "top-right");

    }, [map, mapContainer, geolocate, nav]);

    return (<div ref={mapContainer} className={className} />);
}

export default Map;
