import { PDFParse } from 'pdf-parse';
import path from 'path';

const parser = new PDFParse({ url: './assets/resume.pdf' });

// const parser = new PDFParse({})
const result = await parser.getText();
// to extract text from page 3 only:
// const result = await parser.getText({ partial: [3] });
await parser.destroy();
console.log(result.text);


export default result;