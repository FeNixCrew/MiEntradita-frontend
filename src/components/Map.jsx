import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

const ACCESS_TOKEN = 'pk.eyJ1Ijoibmljb2xhc21hcnRpbmV6MDUxMCIsImEiOiJja3cwbW84Z2VkaHhxMnZwZzIyODg5Nzk4In0.3WRMNapO4tRArFLEoenJKQ'

mapboxgl.accessToken = ACCESS_TOKEN;

function Map({ className = '', latitude = -34.599722, longitude = -58.381944, stadiumName }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const nav = useMemo(() => new mapboxgl.NavigationControl(), []);

    const geolocate = useMemo(() => new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), []);

    const directions = useMemo(() => new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        language: 'es-ES',
        placeholderOrigin: 'Origen',
        placeholderDestination: stadiumName,
        flyTo: false,
        controls: {
            profileSwitcher: false,
            instructions: false
        }
    }), []);

    const hacerAlgo = useCallback(() => {
        map.current.on('load', () => {
            directions.setDestination([longitude, latitude]);

            navigator.geolocation.getCurrentPosition((position) => {
                directions.setOrigin([position.coords.longitude, position.coords.latitude])
            })
        })
    }, [longitude, latitude, directions])

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 15,
        })

        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        map.current.addControl(geolocate, "top-right");
        map.current.addControl(nav, "top-right");
        map.current.addControl(directions, 'top-left');

        map.current.on('load', () => {
            directions.setDestination([longitude, latitude]);
        })


    }, [map, mapContainer, geolocate, nav, latitude, longitude, directions, hacerAlgo]);

    return (<div ref={mapContainer} className={className} />);
}


export default Map;