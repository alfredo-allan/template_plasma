declare module '*.glb' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}
declare module '*.css'
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.scss'
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
// Extende JSX para meshline
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}
