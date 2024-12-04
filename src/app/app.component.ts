import { Component } from "@angular/core";
import * as Tesseract from "tesseract.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ocr";

  extractedText: string = "";

  async performOCR(imageFile: File) {
    const result = await Tesseract.recognize(
      imageFile,
      'eng',
      { logger: m => console.log(m) }
    );
    this.extractedText = result.data.text;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      this.performOCR(imageFile);
    }
  }
}
