// Inicializar el visor
  const viewer = new PDFViewer(
    '../assets/pdfs/Estructura-Entre-Comillasxd.pdf',
    'pdf-canvas',
    'page-num',
    'page-count'
  );

  // Conectar botones
  window.prevPage = () => viewer.prevPage();
  window.nextPage = () => viewer.nextPage();
  window.zoomIn = () => viewer.zoomIn();
  window.zoomOut = () => viewer.zoomOut();
  window.resetZoom = () => viewer.resetZoom();