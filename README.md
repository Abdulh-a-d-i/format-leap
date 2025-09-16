# File Converter

A clean, modern file conversion web application inspired by iLovePDF. Convert between PDF, DOCX, PPTX, XLSX, CSV, JPG, and PDF/A formats with ease.

## Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Multiple Format Support**: Convert between PDF, DOCX, PPTX, XLSX, CSV, JPG, and PDF/A
- **Real-time Validation**: File type validation with clear error messages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Secure Processing**: No files stored on servers
- **Clean UI**: Modern, accessible design inspired by iLovePDF

## Supported Conversions

### From PDF
- PDF → DOCX
- PDF → PPTX  
- PDF → XLSX
- PDF → CSV
- PDF → JPG (returns ZIP for multi-page PDFs)
- PDF → PDF/A

### To PDF
- DOCX → PDF
- PPTX → PDF
- XLSX → PDF
- CSV → PDF
- JPG → PDF

## Setup

### Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Configure your backend URL in `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:8000/convert
   ```

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:8080`

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your static hosting service (Netlify, Vercel, etc.)

## Backend Integration

The frontend communicates with a FastAPI backend via POST requests to `/convert`:

### Request Format
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**:
  - `file`: The uploaded file
  - `target`: Target format (e.g., "docx", "pdf", "xlsx", "jpg", "pdfa")

### Response Format
- **Success (200)**: Returns the converted file as a download
- **Error (422/500)**: Returns JSON with error details

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui with custom design system
- **Build Tool**: Vite
- **Icons**: Lucide React

## Design System

The application uses a comprehensive design system with:
- **Primary Color**: Blue (#3b82f6) inspired by iLovePDF
- **Semantic Tokens**: All colors defined in CSS custom properties
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Hover effects and state transitions
- **Accessibility**: ARIA labels, keyboard navigation, proper contrast

## File Handling

- **Maximum File Size**: Handled by backend (no frontend limit)
- **Supported Types**: .pdf, .docx, .pptx, .xlsx, .csv, .jpg, .jpeg
- **Validation**: Client-side file type validation before upload
- **Security**: Files are validated and processed securely

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.