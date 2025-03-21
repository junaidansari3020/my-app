import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-invoice',
  imports: [MatButtonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent {
  generateImage() {
    const captureSection = document.getElementById('capture-section');
  
    html2canvas(captureSection!, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      // Create a download link
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'job_print.png';
  
      // Trigger the download
      link.click();
    });
  }
  
  // generatePdf() {
  //   const captureSection = document.getElementById('capture-section');

  //   html2canvas(captureSection!, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(imgData, 'JPEG', 0, 0, 211, 298);
  //     pdf.save('job_print.pdf');
  //   });
  // }

  generatePdf() {
    const captureSection = document.getElementById('capture-section');

    html2canvas(captureSection!, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgHeight = (pdfWidth / canvasWidth) * canvasHeight;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('job_print.pdf');
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  }
  
}

