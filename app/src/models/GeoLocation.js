import * as Immutable from 'immutable';

export type GeoLocationProps = {|
  longitude: number,
  latitude: number,
|};

export type RawCoordinates = {|
  accuracy: number,
  altitude: ?number,
  altitudeAccuracy: ?number,
  heading: ?number,
  latitude: number,
  longitude: number,
  speed: ?number,
|};

export type GeoLocationRecord = Immutable.Record<GeoLocationProps> & GeoLocationProps;

const defaultGeoLocation: GeoLocationProps = {
  longitude: 0,
  latitude: 0,
};

const GeoLocation = Immutable.Record(defaultGeoLocation);

GeoLocation.fromJs = (raw: RawCoordinates) => GeoLocation({
  longitude: raw.longitude,
  latitude: raw.latitude,
});

export default GeoLocation;
