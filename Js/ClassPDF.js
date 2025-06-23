class PDFViewer {
    constructor(url, canvasId, pageNumId, pageCountId) {
      this.url = url;
      this.canvas = document.getElementById(canvasId);
      this.canvasContext = this.canvas.getContext('2d');
      this.pageNumElem = document.getElementById(pageNumId);
      this.pageCountElem = document.getElementById(pageCountId);
      this.pdfDoc = null;
      this.pageNum = 1;
      this.scale = 1.0;

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      this.loadDocument();
    }

    async loadDocument() {
      this.pdfDoc = await pdfjsLib.getDocument(this.url).promise;
      this.pageCountElem.textContent = this.pdfDoc.numPages;
      this.renderPage(this.pageNum);
    }

    async renderPage(num) {
      const page = await this.pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: this.scale });
      this.canvas.width = viewport.width;
      this.canvas.height = viewport.height;
      await page.render({ canvasContext: this.canvasContext, viewport }).promise;
      this.pageNumElem.textContent = num;
    }

    nextPage() {
      if (this.pageNum < this.pdfDoc.numPages) {
        this.pageNum++;
        this.renderPage(this.pageNum);
      }
    }

    prevPage() {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.renderPage(this.pageNum);
      }
    }

    zoomIn() {
      this.scale += 0.1;
      this.renderPage(this.pageNum);
    }

    zoomOut() {
      if (this.scale > 0.1) {
        this.scale -= 0.1;
        this.renderPage(this.pageNum);
      }
    }

    resetZoom() {
      this.scale = 1.0;
      this.renderPage(this.pageNum);
    }
  }
