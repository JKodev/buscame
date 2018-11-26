import MapContainer from "@/components/maps";
import Wrapper from "@/components/wrapper";
import * as React from "react";

export interface IMainProps {
  title: string;
}

export interface IMainState {
  loading: boolean;
}

export default class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public render() {
    return (
      <Wrapper title="Hola">
        <div className="map">
          <MapContainer
            hits={[
              { id: "1", title: "First Hit", _geoloc: { lat: 32, lng: 32 } },
            ]}
            onLocationSelect={(loc: any) => loc._geoloc.lat}
          />
        </div>
      </Wrapper>
    );
  }
}
