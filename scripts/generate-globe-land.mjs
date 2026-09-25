// Offline geographic sampling. Run only when changing land data or density.
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';
const world = JSON.parse(readFileSync(new URL('../node_modules/world-atlas/land-110m.json', import.meta.url)));
const data = feature(world, world.objects.land);
const lands = data.features.flatMap(({geometry}) => geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates);
function inside(lon, lat, ring) {
  let hit = false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const [xi,yi]=ring[i], [xj,yj]=ring[j];
    if((yi>lat)!==(yj>lat) && lon < (xj-xi)*(lat-yi)/(yj-yi)+xi) hit=!hit;
  }
  return hit;
}
const result = {};
for (const [name,step] of [['desktop',1.2],['mobile',1.9]]) {
  const start=performance.now();
  const points=[];
  for(let lat=-58;lat<82;lat+=step) {
    for(let lon=-180;lon<180;lon+=step/Math.max(.24,Math.cos(lat*Math.PI/180))) {
      if(lands.some(([outer,...holes])=>outer && inside(lon,lat,outer) && !holes.some(h=>inside(lon,lat,h)))) points.push(+lat.toFixed(5),+lon.toFixed(5));
    }
  }
  result[name]=points;
  console.log(`${name}: ${points.length/2} points; geographic sampling ${Math.round(performance.now()-start)}ms (removed from browser startup)`);
}
writeFileSync(new URL('../components/hero/land-samples.json',import.meta.url),JSON.stringify(result));
