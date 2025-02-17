import { useParams } from 'react-router-dom'

function PdfViewer() {
  const { filePath } = useParams()
  const pdfUrl = `http://localhost:5000/${decodeURIComponent(filePath)}`

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>PDF Viewer</h2>
      <iframe
        src={pdfUrl}
        width='100%'
        height='600px'
        style={{ border: 'none' }}
      ></iframe>
    </div>
  )
}

export default PdfViewer
