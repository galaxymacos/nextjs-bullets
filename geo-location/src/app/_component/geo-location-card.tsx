"use client"

import React, {useState, useTransition} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const GeoLocation = () => {
    const [latitude, setLatitude] = useState<undefined | string>(undefined)
    const [longitude, setLongitude] = useState<undefined | string>(undefined)
    const [error, setError] = useState<undefined | string>(undefined)
    const [isFetchingLocation, setIsFetchingLocation] = useState(false)
    const getLocation = () => {
        if (navigator.geolocation) {
            setIsFetchingLocation(true)
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude.toString())
                setLongitude(position.coords.longitude.toString())
                console.log("get client's location")
                setIsFetchingLocation(false)
            }, (error) => {
                setIsFetchingLocation(false)
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("User denied the request for Geolocation.")
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError("Location information is unavailable.")
                        break;
                    case error.TIMEOUT:
                        setError("The request to get user location timed out.")
                        break;
                    default:
                        setError("An unknown error occurred.")
                        break;
                }
            })
        } else {
            console.log("Geolocation is not supported by this browser.")
            setError("Geolocation is not supported by this browser.")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Get Geo Location of User</CardTitle>
            </CardHeader>
            <CardContent>
                User's Geo Location:
                <br/>
                Latitude: {latitude}
                <br/>
                Longitude: {longitude}
                {error && <p>Error: {error}</p>}
            </CardContent>
            <CardFooter>
                <Button disabled={isFetchingLocation} onClick={getLocation}>Get Location</Button>
            </CardFooter>

        </Card>
    );
};

export default GeoLocation;
