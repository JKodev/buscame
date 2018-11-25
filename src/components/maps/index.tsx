import { GoogleApiWrapper, Map, MapProps, Marker } from "google-maps-react";
import * as React from "react";

interface ILocation {
  id: string;
  _geoloc: google.maps.LatLngLiteral;
  title: string;
}

type Props = MapProps & {
  hits: ILocation[];
  onLocationSelect: (location: ILocation) => void;
};

function validGeoloc(geoloc: google.maps.LatLngLiteral): boolean {
  return geoloc && (geoloc.lat !== 0 || geoloc.lng !== 0);
}

export class MapContainer extends React.Component<Props> {
  public render() {
    const { onLocationSelect, bounds, ...props } = this.props;

    const hits = this.props.hits.filter((x: ILocation) =>
      validGeoloc(x._geoloc),
    );

    return (
      <>
        <Map
          {...props}
          bounds={bounds}
          onReady={(_, map) => {
            if (!map || !bounds) {
              return;
            }
            map.fitBounds(bounds);
          }}
        >
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjPQ1F0o5tfqFe1eTix-_FVEfKp5e2-us",
})(MapContainer);
