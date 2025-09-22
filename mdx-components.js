const components = {
    article: ({ children }) => <div style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>{children}</div>,
}
 
export function useMDXComponents() {
  return components
}