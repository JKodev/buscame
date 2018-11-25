import MapContainer from "@/components/maps";
import * as React from "react";

export interface IWrapperProps {
  title: string;
}

export interface IWrapperState {
  loading: boolean;
}

export default class IWrapper extends React.Component<
  IWrapperProps,
  IWrapperState
> {
  constructor(props: IWrapperProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public render() {
    return (
      <div>
        hola
        <MapContainer
          hits={[
            { id: "1", title: "First Hit", _geoloc: { lat: 32, lng: 32 } },
          ]}
          onLocationSelect={(loc: any) => loc._geoloc.lat}
        />
      </div>
    );
  }
}
