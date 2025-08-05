# gaphall

## Local configuration and setup

# Virtual Art Gallery - Local Development Setup

A sophisticated 3D virtual art gallery built with Babylon.js that supports gyroscope navigation, collision detection, and artwork uploads.

## Why HTTPS is Required

This gallery uses device gyroscope sensors for mobile navigation, which modern browsers only allow over HTTPS connections. The setup includes SSL certificates for local development.

## Prerequisites

### 1. Install Node.js
```bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/ or use Homebrew:
brew install node

# Verify installation
node --version
npm --version
```

### 2. Install mkcert (for SSL certificates)
```bash
# Install mkcert for creating local SSL certificates
brew install mkcert

# Install local CA
mkcert -install
```

## Project Setup

### 1. Clone and Navigate
```bash
# Navigate to your project directory
cd path/to/your/gallery-project
```

### 2. Generate SSL Certificates
```bash
# Create SSL certificates for localhost and your local network
# Replace 192.168.x.x with your actual local IP address
mkcert localhost 127.0.0.1 192.168.1.100

# This creates:
# localhost+2.pem (certificate)
# localhost+2-key.pem (private key)
```

**Find your local IP address:**
```bash
# Get your local network IP
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 3. Install Dependencies
```bash
# Install required Node.js packages
npm init -y
npm install express
```

### 4. Setup Default Artworks (Optional)
```bash
# Create folder structure for default artworks
mkdir -p gallery/defaults

# Place your artwork images in gallery/defaults/
# Supported formats: .jpg, .jpeg, .png, .webp, .gif
```

**Create the artwork manifest:**
Create `gallery/defaults/manifest.json`:
```json
{
  "artworks": [
    {
      "filename": "your-artwork-1.jpg",
      "name": "Artwork Title",
      "author": "Artist Name",
      "description": "Brief description of the artwork"
    }
  ]
}
```

## Running the Development Server

### 1. Start the HTTPS Server
```bash
# Start the server
node https-server.js
```

You should see:
```
HTTPS Server running on https://localhost:8080
Access from iPhone: https://192.168.x.x:8080
```

### 2. Access the Gallery

**On your Mac:**
- Open browser: `https://localhost:8080`
- Accept the security warning (click "Advanced" → "Proceed")

**On Mobile (for gyroscope testing):**
- Connect phone to same WiFi network
- Open browser: `https://192.168.x.x:8080` (use your actual IP)
- Accept security warning
- Grant gyroscope permissions when prompted

## Features to Test

### Desktop Features
- **Mouse Navigation**: Click and drag to look around
- **Keyboard Controls**: WASD keys to walk around
- **Mouse Wheel**: Zoom in/out
- **Upload Art**: Click "Upload Art" button
- **Collision Detection**: Try walking into walls (you can't!)

### Mobile Features
- **Touch Navigation**: Single finger drag to look around
- **Pinch Zoom**: Two fingers to zoom
- **Gyroscope**: Enable gyroscope for motion controls
- **Touch-Gyro Sync**: Both work together seamlessly

## Troubleshooting

### SSL Certificate Issues
```bash
# If certificates don't work, regenerate with your exact IP:
mkcert localhost 127.0.0.1 YOUR_ACTUAL_IP_HERE
```

### Mobile Gyroscope Not Working
1. Ensure you're using HTTPS (not HTTP)
2. Grant permission when browser asks
3. Try the "Enable gyro controls" button
4. Use "Calibrate" button to reset orientation

### No Default Artworks Showing
1. Check `gallery/defaults/manifest.json` exists
2. Verify artwork files are in `gallery/defaults/` folder
3. Check browser console (F12) for loading errors
4. Ensure image filenames in manifest match actual files

### Can't Access from Phone
1. Ensure phone and computer are on same WiFi
2. Check firewall isn't blocking port 8080
3. Verify IP address: `ifconfig | grep "inet "`
4. Try turning off VPN if using one

## File Structure
```
your-project/
├── index.html              # Main gallery application
├── https-server.js          # HTTPS development server
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── localhost+2.pem         # SSL certificate
├── localhost+2-key.pem     # SSL private key
└── gallery/
    └── defaults/
        ├── manifest.json    # Artwork configuration
        └── *.jpg            # Your artwork images
```

## Next Steps

1. **Add Your Artworks**: Place images in `gallery/defaults/` and update `manifest.json`
2. **Test Mobile Experience**: Try gyroscope navigation on your phone
3. **Upload Custom Art**: Use the upload feature to add your own artworks
4. **Explore Features**: Try collision detection, lighting modes, multi-room navigation

## Development Notes

- **IndexedDB**: User uploads are saved locally in browser storage
- **PWA Ready**: Can be installed as an app on mobile devices
- **Offline Support**: Service worker caches assets for offline viewing
- **Responsive**: Automatically adapts to mobile and desktop

The gallery includes collision detection, proportional artwork sizing, and advanced gyroscope controls that sync with touch navigation for the best mobile experience.
