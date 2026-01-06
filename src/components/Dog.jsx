import React from 'react'
import * as THREE from "three"
import { useThree } from '@react-three/fiber'
import { OrbitControls , useGLTF , useTexture} from '@react-three/drei'

const Dog = () => { 

    const model = useGLTF("/models/dog.drc.glb")

    useThree(({camera,scene,gl})=>{
        camera.position.z = 1.2
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
    })

    // const textures = useTexture({
    //     normalMap:"/dog_normals.jpg",
    //     sampleMatCap:"/matcap/mat-2.png"
    // },(texture)=>{
    //     texture.flipY = false
    //     texture.colorSpace = THREE.SRGBColorSpace
    // })

    const [
        normalMap,
        sampleMatCap
    ] = useTexture([ "/dog_normals.jpg","/matcap/mat-2.png" ])

    textures.normalMap.flipY = false
    textures.sampleMatCap.colorSpace = THREE.SRGBColorSpace

    model.scene.traverse((child)=>{
        if(child.name.includes("DOG")){
            child.material = new THREE.MeshMatcapMaterial({
                normalMap:textures.normalMap,
                matcap:textures.sampleMatCap
            })
        }
    })


  return (
    <>
        <primitive object={model.scene} position={[0.3,-1.04,0]} scale={[2,2,2]} rotation={[0 , Math.PI/4 , 0]} />
        <directionalLight position={[0,5,5]} intensity={10} color={0xFFFFFF} />
        <OrbitControls/>
    </>
  )
}

export default Dog
