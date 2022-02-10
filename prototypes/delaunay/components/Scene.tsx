import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDelaunayStore } from "../store";
import * as THREE from "three";
import { triangulate } from "@core/graphics/procedural";

const Scene: React.FC = () => {
    const points = useDelaunayStore((state) => state.points);
    const bufferRef = useRef<THREE.BufferGeometry>(null);
    const [buffer] = useState(() => {
        const maxPointCount = 300;
        const points = [];
        for (let i = 0; i < 3 * maxPointCount; i++) {
            points.push(0);
        }
        const vertices = new Float32Array(points);
        return new THREE.BufferAttribute(vertices, 3);
    });
    useEffect(() => {
        const triangles = triangulate(points);
        for (let i = 0; i < 900; i += 3) {
            bufferRef.current?.attributes.position.setXYZ(i, 0, 0, 1);
        }
        for (let i = 0; i < triangles.length; i++) {
            const t = triangles[i];
            bufferRef.current?.attributes.position.setX(i * 3, t[0].x);
            bufferRef.current?.attributes.position.setY(i * 3, t[0].y);
            bufferRef.current?.attributes.position.setZ(i * 3, 1);
            bufferRef.current?.attributes.position.setX(i * 3 + 1, t[1].x);
            bufferRef.current?.attributes.position.setY(i * 3 + 1, t[1].y);
            bufferRef.current?.attributes.position.setZ(i * 3 + 1, 1);
            bufferRef.current?.attributes.position.setX(i * 3 + 2, t[2].x);
            bufferRef.current?.attributes.position.setY(i * 3 + 2, t[2].y);
            bufferRef.current?.attributes.position.setZ(i * 3 + 2, 1);
        }

        bufferRef.current!.attributes.position.needsUpdate = true;
    }, [points]);
    return (
        <Suspense fallback={null}>
            <mesh>
                <bufferGeometry ref={bufferRef} attributes={{ position: buffer }} />
                <meshBasicMaterial side={THREE.DoubleSide} color={"hotpink"} wireframe />
            </mesh>
        </Suspense>
    );
};

export default Scene;
