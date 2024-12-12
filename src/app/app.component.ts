import { Component } from "@angular/core";
import * as Tesseract from "tesseract.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ocr";
  progressLabel: string = '';
  progressNr: number = 0;

  extractedText: string = "";
  constructor() {}

  async performOCR(imageFile: string) {
    const result = await Tesseract.recognize(imageFile, "eng", { logger: (m) => {console.log('m',m)
      this.progressLabel = m.status;
      this.progressNr = Math.round(m.progress *100);
    } });
    this.extractedText = result.data.text; //.replace(/[^\w]/gi, '');
    console.log("Finalizado: ", result);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // const imageFile = event.target.files[0];
      // this.performOCR(imageFile);

      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      let base64Image: any;

      reader.onload = (event: any) => {
        base64Image = event.target.result;
        console.log("base64Image", base64Image);
        this.performOCR(base64Image);
      };
    }
  }
}
