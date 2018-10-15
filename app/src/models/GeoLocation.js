import * as Immutable from 'immutable';

export type GeoLocationProps = {|
  longitude: number,
  latitude: number,
|};

export type GeoLocationRecord = Immutable.Record<GeoLocationProps> & GeoLocationProps;

const defaultGeoLocation: GeoLocationProps = {
  longitude: 0,
  latitude: 0,
};

const GeoLocation = Immutable.Record(defaultGeoLocation);

export default GeoLocation;
