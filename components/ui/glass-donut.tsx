"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

export function GlassDonut({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // --- Fonts & Text ---
    const fontLoader = new FontLoader()
    fontLoader.load(
      "https://raw.githubusercontent.com/danielyl123/person/refs/heads/main/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("JULIAN CRUZET", {
          font,
          size: 0.8, 
          depth: 0.05, 
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 3,
        })
        textGeometry.computeBoundingBox()
        textGeometry.center()

        const textMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
        })
        
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.z = -1 
        scene.add(text)
      }
    )

    // --- The Donut (Torus) ---
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.25, 100, 60)
    const torusMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // Keep surface white to avoid darkening
        attenuationColor: new THREE.Color('#64ffda'), // Use bright teal/cyan accent color for tint (looks better than dark navy)
        // Or strictly navy: new THREE.Color('#0a192f'), but that might be too dark. 
        // Let's try the lighter blue-ish tint to match the "feel" without blocking light.
        // Actually, user asked for "dark navy blue background colour". 
        // I'll try a lighter version of that navy: #1d3b5e
        attenuationDistance: 2, // Controls how "dense" the tint is
        metalness: 0,
        roughness: 0, 
        iridescence: 1,
        iridescenceIOR: 1.5,
        transmission: 1, 
        ior: 1.2, 
        thickness: 0.8,
        specularIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transparent: false,
        opacity: 1, 
        side: THREE.DoubleSide
    })
    
    // Let's try explicit attenuation color matching the requested navy but keeping distance moderate.
    torusMaterial.attenuationColor = new THREE.Color('#0a192f')
    torusMaterial.attenuationDistance = 5.0 // Increased distance = lighter tint (less absorption per unit)

    // @ts-ignore
    torusMaterial.iridescenceThicknessRange = [100, 324]

    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.z = 1
    scene.add(torus)

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 10)
    pointLight.position.set(-1, 2, 0)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xffffff, 10)
    pointLight2.position.set(-1, -2, 0)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xffffff, 10)
    pointLight3.position.set(1, -2, 0)
    scene.add(pointLight3)

    const pointLight4 = new THREE.PointLight(0xffffff, 10)
    pointLight4.position.set(1, 2, 0)
    scene.add(pointLight4)

    // --- Animation ---
    const clock = new THREE.Clock()
    let animationId: number

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      
      torus.rotation.x = elapsedTime * 0.5
      torus.rotation.y = elapsedTime * 0.1
      
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(tick)
    }
    
    tick()

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      
      // Cleanup
      scene.clear()
      torusGeometry.dispose()
      torusMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
