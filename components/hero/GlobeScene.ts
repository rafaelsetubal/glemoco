import * as THREE from "three";
import landSamples from "./land-samples.json";
import { cities, routesConfig } from "./globeData";

const RADIUS = 1.48;

export function geoPoint(lat: number, lon: number, r = RADIUS) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

let glowTextureCache: THREE.CanvasTexture | undefined;
function getGlowTexture() {
  if (glowTextureCache) return glowTextureCache;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.18, "rgba(255, 255, 255, 0.75)");
  gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.18)");
  gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.03)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  glowTextureCache = new THREE.CanvasTexture(canvas);
  return glowTextureCache;
}

function buildLandPointGeometry() {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  const step = typeof window !== "undefined" && window.innerWidth < 700 ? 1.9 : 1.2;

  // Geographic containment is precomputed offline, never on the UI thread.
  const samples = step === 1.9 ? landSamples.mobile : landSamples.desktop;
  for (let i = 0; i < samples.length; i += 2) {
      const lat = samples[i], lon = samples[i + 1];

      // Deterministic slight jitter for organic point cloud distribution
      const seed = Math.sin(lon * 12.9898 + lat * 78.233) * 43758.5453;
      const jitter = (seed - Math.floor(seed) - 0.5) * step * 0.24;
      const pt = geoPoint(lat + jitter, lon - jitter, RADIUS * 1.006);

      positions.push(pt.x, pt.y, pt.z);

      // Point coloring: subtle crystalline cyan with strategic gold/amber micro-accents
      const isAmberAccent = Math.abs(Math.sin((lat + lon * 1.4) * 0.22)) > 0.982;
      if (isAmberAccent) {
        colors.push(1.0, 0.6, 0.12);
        sizes.push(0.014);
      } else {
        const brightness = 0.72 + Math.abs(Math.sin(lat * 0.14)) * 0.28;
        colors.push(0.48 * brightness, 0.82 * brightness, 0.98 * brightness);
        sizes.push(0.009 + (seed - Math.floor(seed)) * .006);
      }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
  return geometry;
}

export type GlobeHandle = {
  group: THREE.Group;
  update: (time: number) => void;
};

export function createGlobe(): GlobeHandle {
  const group = new THREE.Group();

  // 1. Deep Dark Base Sphere with light edge occlusion
  const baseSphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x040c15, specular: 0x0a2434, shininess: 32 })
  );
  group.add(baseSphere);

  // 2. High-precision Land Point Cloud Matrix
  const landGeometry = buildLandPointGeometry();
  const landPoints = new THREE.Points(
    landGeometry,
    new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: { pointScale: { value: 720 } },
      vertexShader: `attribute float size;
        uniform float pointScale;
        varying vec3 vColor;
        varying float vFacing;
        void main(){
          vec4 p = modelViewMatrix * vec4(position,1.);
          vec3 n = normalize(normalMatrix * normalize(position));
          vFacing = max(0.,dot(n,normalize(-p.xyz)));
          float light = .42 + .58 * max(0.,dot(n,normalize(vec3(-.5,.8,1.))));
          vColor = color * light;
          gl_PointSize = clamp(size * pointScale / -p.z,1.,3.2);
          gl_Position = projectionMatrix * p;
        }`,
      fragmentShader: `varying vec3 vColor; varying float vFacing;
        void main(){
          float d = length(gl_PointCoord - .5) * 2.;
          if(d > 1.) discard;
          float alpha = (1. - smoothstep(.35,1.,d)) * smoothstep(0.,.18,vFacing);
          gl_FragColor = vec4(vColor,alpha);
        }`,
      transparent: true,
      depthWrite: false,
    })
  );
  group.add(landPoints);

  // 3. Volumetric Rim & Atmospheric Glow Layer (Additive back-side shell)
  const atmosphereRim = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.018, 64, 64),
    new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal; varying vec3 vView;
        void main(){ vec4 p=modelViewMatrix*vec4(position,1.);
          vNormal=normalize(normalMatrix*normal); vView=normalize(-p.xyz);
          gl_Position=projectionMatrix*p; }`,
      fragmentShader: `varying vec3 vNormal; varying vec3 vView;
        void main(){
          vec3 n=normalize(vNormal);
          float rim=pow(1.-max(0.,dot(n,normalize(vView))),4.5);
          float light=.22+.78*max(0.,dot(n,normalize(vec3(-.6,.8,.35))));
          gl_FragColor=vec4(.12,.62,1.,rim*light*.85);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  group.add(atmosphereRim);

  const glowSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getGlowTexture(),
      color: 0x0066cc,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  glowSprite.scale.set(RADIUS * 2.6, RADIUS * 2.6, 1);
  group.add(glowSprite);

  // 4. Strategic City Node Beacons
  const nodeSprites: { sprite: THREE.Sprite; baseScale: number; pulseSpeed: number; phase: number }[] = [];

  cities.forEach((c) => {
    const isAnchor = c.isStrategic && c.name === "São Paulo";
    const colorHex = isAnchor ? 0xff9a00 : c.isStrategic ? 0xffaa00 : 0x00baff;
    const pt = geoPoint(c.latitude, c.longitude, RADIUS * 1.028);

    // Inner core mesh dot
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(isAnchor ? 0.028 : 0.018, 16, 16),
      new THREE.MeshBasicMaterial({ color: isAnchor ? 0xffe1ae : 0xb8eeff })
    );
    core.position.copy(pt);
    group.add(core);

    // Controlled soft luminous halo
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getGlowTexture(),
        color: colorHex,
        transparent: true,
        opacity: isAnchor ? 0.92 : 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    halo.position.copy(pt);
    const baseScale = isAnchor ? 0.28 : 0.17;
    halo.scale.set(baseScale, baseScale, 1);
    group.add(halo);

    nodeSprites.push({
      sprite: halo,
      baseScale,
      pulseSpeed: isAnchor ? 2.2 : 1.6,
      phase: c.latitude * 0.1,
    });
  });

  // 5. Global Arcs & Traveling Energy Packets (Signature + Secondary)
  const packetMeshes: {
    mesh: THREE.Mesh;
    curve: THREE.CatmullRomCurve3;
    speed: number;
    progress: number;
  }[] = [];

  routesConfig.forEach((cfg) => {
    const fromCity = cities[cfg.from];
    const toCity = cities[cfg.to];
    const start = geoPoint(fromCity.latitude, fromCity.longitude, RADIUS * 1.026);
    const end = geoPoint(toCity.latitude, toCity.longitude, RADIUS * 1.026);
    
    // Elevate middle point for smooth curved arc
    // Spherical path keeps the entire arc above the opaque surface.
    const arc = Array.from({ length: 49 }, (_, i) => {
      const t = i / 48;
      return start.clone().lerp(end, t).normalize().multiplyScalar(
        RADIUS * (1.026 + Math.sin(Math.PI * t) * (cfg.altitude - 1) * .55)
      );
    });
    const curve = new THREE.CatmullRomCurve3(arc);
    const curvePoints = curve.getPoints(54);

    const isSig = cfg.isSignature;
    const colorHex = isSig ? 0xff9a00 : 0x00baff;

    // A. The Arc Line
    const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: isSig ? 0.82 : 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Line(lineGeo, lineMat));

    // B. Static Dotted Resonance along the route
    const dottedPoints = curvePoints.filter((_, idx) => idx % (isSig ? 2 : 3) === 0);
    const dottedGeo = new THREE.BufferGeometry().setFromPoints(dottedPoints);
    const dottedMat = new THREE.PointsMaterial({
      color: colorHex,
      map: getGlowTexture(),
      size: isSig ? 0.018 : 0.011,
      sizeAttenuation: true,
      transparent: true,
      opacity: isSig ? 0.88 : 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(dottedGeo, dottedMat));

    // C. Dynamic Traveling Packet (Beacon head)
    const packetGeo = new THREE.SphereGeometry(isSig ? 0.024 : 0.016, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: isSig ? 0xffb733 : 0x66d9ff,
    });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    group.add(packetMesh);

    // D. Soft Glow around traveling packet
    const packetGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getGlowTexture(),
        color: colorHex,
        transparent: true,
        opacity: isSig ? 0.85 : 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    packetGlow.scale.set(isSig ? 0.2 : 0.14, isSig ? 0.2 : 0.14, 1);
    packetMesh.add(packetGlow);

    packetMeshes.push({
      mesh: packetMesh,
      curve,
      speed: isSig ? 0.035 : 0.022 + Math.random() * 0.01,
      progress: Math.random(),
    });
  });

  // Update loop for subtle packet motion & node breathing
  const update = (time: number) => {
    // 1. Animate traveling energy packets along routes
    for (const pkt of packetMeshes) {
      const pt = pkt.curve.getPointAt((pkt.progress + time * pkt.speed) % 1);
      pkt.mesh.position.copy(pt);
    }

    // 2. Subtle organic breathing of node halos
    for (const n of nodeSprites) {
      const pulse = 1 + Math.sin(time * n.pulseSpeed + n.phase) * 0.14;
      n.sprite.scale.set(n.baseScale * pulse, n.baseScale * pulse, 1);
    }
  };

  return { group, update };
}
