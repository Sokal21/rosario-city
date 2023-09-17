import { FeatureCollection, Polygon, GeoJsonProperties } from "geojson";

export const invertMapPolyon = (data: FeatureCollection<Polygon, GeoJsonProperties>) => {
    data.features[0].geometry.coordinates.unshift([
        [180, -90],
        [180, 90],
        [-180, 90],
        [-180, -90],
    ])
}