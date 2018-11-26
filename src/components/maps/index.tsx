import mapStyles from "@/themes/map";
import { GoogleApiWrapper, Map, MapProps, Marker } from "google-maps-react";
import * as React from "react";
import { geolocated, GeolocatedProps } from "react-geolocated";

interface ILocation {
  id: string;
  _geoloc: google.maps.LatLngLiteral;
  title: string;
}

type Props = MapProps &
  GeolocatedProps & {
    hits: ILocation[];
    onLocationSelect: (location: ILocation) => void;
  };

function validGeoloc(geoloc: google.maps.LatLngLiteral): boolean {
  return geoloc && (geoloc.lat !== 0 || geoloc.lng !== 0);
}

export class MapContainer extends React.Component<Props> {
  public render() {
    const {
      onLocationSelect,
      bounds,
      isGeolocationEnabled,
      coords,
      // tslint:disable-next-line:trailing-comma
      ...props
    } = this.props;

    const hits = this.props.hits.filter((x: ILocation) =>
      validGeoloc(x._geoloc),
    );

    let center = { lat: -12.0464877, lng: -77.0294432 };
    if (isGeolocationEnabled && coords) {
      center = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
    }
    return (
      <>
        <Map
          {...props}
          styles={mapStyles}
          center={center}
          bounds={bounds}
          zoom={17}
          disableDefaultUI={true}
          onReady={(_, map) => {
            if (!map || !bounds) {
              return;
            }
            map.fitBounds(bounds);
          }}
        >
          <Marker
            onClick={() =>
              this.props.onLocationSelect({
                id: "currentLocation",
                // tslint:disable-next-line:object-literal-sort-keys
                _geoloc: center,
                title: "Tu ubicación",
              })
            }
            icon={{
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(64, 64),
              url:
                "https://res.cloudinary.com/multileaf/image/upload/v1543189556/buscame/location.svg",
            }}
            cursor="pointer"
            position={center}
            title={"Tu ubicación"}
            key={"currentLocation"}
          />
          {this.renderMarkers(...hits)}
        </Map>
      </>
    );
  }

  private renderMarkers(...hits: ILocation[]) {
    return hits.map((hit: ILocation) => {
      return (
        <Marker
          onClick={() => this.props.onLocationSelect(hit)}
          cursor="pointer"
          position={hit._geoloc}
          title={hit.title}
          key={hit.id}
        />
      );
    });
  }
}

const geoLocated = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 1000,
  },
  watchPosition: true,
})(MapContainer);

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjPQ1F0o5tfqFe1eTix-_FVEfKp5e2-us",
})(geoLocated);
