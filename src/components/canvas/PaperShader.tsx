import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * PaperShader — soft, slow, organic noise gradient that lives in the
 * background. Off-white tones, faint warm orange wash. Built to feel
 * like watching paper breathe under raking light.
 *
 * Performance: single full-screen quad, 60fps on integrated GPUs.
 * Disabled on prefers-reduced-motion at the parent level.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uPaper;
  uniform vec3 uShadow;
  uniform vec3 uAccent;

  // 2D simplex-ish noise (cheap)
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.045;

    float n1 = snoise(p * 1.4 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 2.7 - vec2(t * 0.7, t * 0.5));
    float n3 = snoise(p * 0.6 + vec2(-t * 0.3, t * 0.4));

    float field = n1 * 0.55 + n2 * 0.25 + n3 * 0.4;
    field = smoothstep(-0.6, 0.9, field);

    // Slow vignette + accent wash near top-right
    float warm = smoothstep(0.0, 1.0, 1.0 - distance(uv, vec2(0.78, 0.22)));
    warm = pow(warm, 2.4) * 0.18;

    vec3 col = mix(uShadow, uPaper, field);
    col = mix(col, uAccent, warm);

    // Subtle film grain
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col -= (grain - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const { width, height } = state.size;
    matRef.current.uniforms.uResolution.value.set(width, height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uPaper: { value: new THREE.Color("#FAFAF7") },
          uShadow: { value: new THREE.Color("#EFEDE6") },
          uAccent: { value: new THREE.Color("#E5572A") },
        }}
      />
    </mesh>
  );
}

export default function PaperShader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 -z-10 ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
      </Canvas>
      {/* Fade out toward bottom so content reads cleanly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
}
