# 📸 Photo Booth

A modern, interactive photo booth web application built with Next.js and TypeScript. Create beautiful photo strips with custom designs, effects, and text overlays directly from your device camera.

## ✨ Features

### 📐 **Multiple Layout Options**
- **3 Vertical Strips** - Classic vertical arrangement of 3 photos
- **4 Square Layout** - 2×2 grid layout for balanced composition
- **6 Half Vertical** - 3×2 grid layout with 6 photos

### 🎨 **Design Customization**
Choose from 6 beautiful pre-designed themes:
- **Classic Black** - Timeless black with white borders
- **Vibrant Pink** - Bold and energetic pink theme
- **Ocean Blue** - Calm and professional blue
- **Forest Green** - Natural and fresh green
- **Sunset Orange** - Warm and inviting orange
- **Modern White** - Clean and minimalist white

### 📝 **Custom Text**
Add personalized messages to your photo strips (up to 100 characters) to make them truly unique

### 📷 **Camera Integration**
- Access your device's built-in camera seamlessly
- Real-time video preview
- Capture photos one by one with countdown timer
- Retake individual photos if not satisfied
- Progress tracking (e.g., 2/4 photos captured)

### 🎭 **Photo Effects**
- **Black & White Filter** - Classic grayscale effect for timeless photos
- **HD Color** - Vibrant full-color mode
- Toggle effects before download

### ⬇️ **Download & Share**
Export your complete photo strip as a high-quality JPEG file

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A modern web browser with camera support (Chrome, Edge, Firefox, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photobooth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Creating Your Photo Strip

1. **Select Layout** - Choose your preferred photo strip arrangement
2. **Pick Design** - Select a color theme that suits your style
3. **Add Text** - (Optional) Write a custom message
4. **Capture Photos** - Use your camera to take photos
   - Allow camera access when prompted
   - Wait for the 3-2-1 countdown
   - Retake photos as needed
5. **Apply Effects** - Choose between Black & White or HD Color
6. **Download** - Save your photo strip as an image

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **State Management**: React Hooks (useState, useRef, useEffect)
- **Camera API**: [MediaDevices getUserMedia API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- **Image Processing**: HTML5 Canvas API

## 📁 Project Structure

```
photobooth/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page with state management
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── LayoutSelector.tsx  # Layout selection UI
│   │   ├── DesignSelector.tsx  # Design theme selection
│   │   ├── TextInput.tsx       # Custom text input
│   │   ├── CameraCapture.tsx   # Camera capture with countdown
│   │   └── PhotoEditor.tsx     # Photo effects and download
│   ├── types/
│   │   └── photobooth.ts       # TypeScript interfaces
│   └── constants/
│       └── designs.ts          # Design configurations
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.ts
```

## 🎯 Component Overview

### LayoutSelector
Displays 3 options for photo strip layouts with visual previews and descriptions.

### DesignSelector
Shows 6 design themes with color previews. Users can see how their photos will look with each design.

### TextInput
Simple textarea input for adding custom messages (0-100 characters). Text is optional.

### CameraCapture
- Initializes device camera with proper error handling
- Displays live video preview
- Implements 3-second countdown before capture
- Shows captured photos in a scrollable sidebar
- Allows retaking individual photos
- Progress bar shows capture status

### PhotoEditor
- Displays complete photo strip with design applied
- Toggle between Black & White and HD Color effects
- Live preview updates
- Download button exports high-quality JPEG
- "Create Another" button to start over

## 🎥 Camera Features

### Permission Handling
- Requests camera access on first use
- Provides clear error messages if permission denied
- "Try Again" button to retry if camera access fails

### Initialization
- Waits for video data to load before showing preview
- Timeout fallback to prevent infinite loading
- Detailed error messages for troubleshooting

### Photo Capture
- Dynamic countdown timer (3-2-1)
- Captures at full video resolution
- Generates high-quality JPEG (0.95 quality)
- Automatic transition to editor when all photos captured

## 🎨 Design System

### Colors & Themes
Each design includes:
- Background color
- Border color
- Text color
- Optional pattern overlay

### Responsive Design
- Mobile-first approach
- Optimized layouts for tablets and desktops
- Touch-friendly buttons and controls

### Animations
- Smooth transitions and hover effects
- Progress bar animations
- Countdown number animations
- Gradient overlays and glassmorphism effects

## ⚙️ Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Recommended |
| Edge    | ✅ Full | Full support |
| Firefox | ✅ Full | Full support |
| Safari  | ✅ Full | iOS 14.5+ |
| Opera   | ✅ Full | Full support |

## 🔒 Privacy & Security

- **No Server Storage**: All photos are processed client-side
- **No Data Collection**: Photos are never sent to any server
- **Local Processing**: Images exist only in browser memory
- **Instant Deletion**: Photos are cleared when navigating away

## 🐛 Troubleshooting

### Camera Not Loading
- Check browser permissions (Settings → Privacy → Camera)
- Ensure camera isn't in use by another application
- Try a different browser
- Refresh the page and allow permissions

### Photos Look Blurry
- Ensure good lighting
- Hold device steady for 3-second countdown
- Clean camera lens
- Try different angles

### Can't Download
- Check browser download permissions
- Ensure sufficient disk space
- Try a different browser
- Check browser console for errors (F12)

## 🚀 Future Enhancements

- [ ] Filters (Sepia, Vintage, Thermal, etc.)
- [ ] Stickers and borders
- [ ] Different countdown speeds
- [ ] Photo frame styles
- [ ] Text formatting (font size, style, position)
- [ ] Background blur effect
- [ ] Social media sharing
- [ ] Cloud storage integration
- [ ] QR code generation
- [ ] Animation/GIF support

## 📱 Mobile Considerations

- Full-screen video on mobile devices
- Portrait and landscape orientation support
- Touch-optimized buttons and controls
- Automatic camera orientation detection

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ using Next.js and modern web technologies.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Made with 💙 for capturing memories**

Start creating beautiful photo strips today! 📸✨
