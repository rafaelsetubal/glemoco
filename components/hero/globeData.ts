export type City = {
  name: string;
  latitude: number;
  longitude: number;
  isStrategic?: boolean;
};

export const cities: City[] = [
  { name: "São Paulo", latitude: -23.55, longitude: -46.63, isStrategic: true }, // Anchor Hub
  { name: "Miami", latitude: 25.76, longitude: -80.19 },
  { name: "New York", latitude: 40.71, longitude: -74.0 },
  { name: "London", latitude: 51.5, longitude: -0.12 },
  { name: "Dubai", latitude: 25.2, longitude: 55.27, isStrategic: true },
  { name: "Singapore", latitude: 1.35, longitude: 103.82 },
  { name: "Tokyo", latitude: 35.67, longitude: 139.65 },
];

export type RouteConfig = {
  from: number;
  to: number;
  isSignature?: boolean;
  color: string;
  altitude: number;
};

// Signature permanent backbone: São Paulo -> Miami -> New York
// Secondary routes: Miami -> London -> Dubai -> Singapore
export const routesConfig: RouteConfig[] = [
  { from: 0, to: 1, isSignature: true, color: "#ff9a00", altitude: 1.32 }, // São Paulo -> Miami (Signature Backbone)
  { from: 1, to: 2, isSignature: true, color: "#ff9a00", altitude: 1.26 }, // Miami -> NY
  { from: 2, to: 3, isSignature: false, color: "#00baff", altitude: 1.28 }, // NY -> London
  { from: 3, to: 4, isSignature: false, color: "#00baff", altitude: 1.3 }, // London -> Dubai
  { from: 4, to: 5, isSignature: false, color: "#00baff", altitude: 1.32 }, // Dubai -> Singapore
];
