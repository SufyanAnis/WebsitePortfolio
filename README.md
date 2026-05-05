# Synexis Technologies Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring enterprise-grade design and interactive components.

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
├── components/
│   ├── Navigation.js    # Fixed navigation with scroll effects
│   ├── Hero.js          # Hero section with gradient text
│   ├── Services.js      # 11 service cards grid
│   ├── Solutions.js     # Feature solutions with images
│   ├── Portfolio.js     # Case studies section
│   ├── Contact.js       # Contact form
│   └── Footer.js        # Footer with links
├── globals.css          # Global styles and CSS variables
├── layout.js            # Root layout with metadata
└── page.js              # Main page component
```

## ✨ Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Scroll reveal effects and gradient animations
- **Interactive Navigation**: Smooth scroll navigation with scroll detection
- **Service Cards**: 11 different service offerings with icons and badges
- **Case Studies**: Showcase of successful projects with metrics
- **Contact Form**: Ready-to-use contact form component
- **Modern Stack**: Next.js 14, React 18, CSS3 with CSS variables
- **Performance**: Optimized images and lazy loading ready

## 🎨 Styling

The site uses CSS variables for consistent theming:
- `--bg`: Dark background (#0B0F1A)
- `--primary`: Primary color (#4F46E5)
- `--accent`: Accent color (#22D3EE)
- `--text`: Text color (#E5E7EB)
- `--text-muted`: Muted text (#9CA3AF)
- `--card-bg`: Card background (#111827)

## 📝 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔧 Configuration

### Next.js Config
The project uses default Next.js 14 configuration. Modify `next.config.js` for custom configurations.

### Google Fonts
The project uses Inter font from Google Fonts. Configure in `app/layout.js`.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Customization

### Edit Colors
Modify CSS variables in `app/globals.css`:
```css
:root {
  --primary: #YOUR_COLOR;
  --accent: #YOUR_COLOR;
  /* ... */
}
```

### Add New Sections
Create a new component in `app/components/` and import it in `app/page.js`.

### Update Content
All content is defined in data arrays within each component. Edit the arrays to update text, titles, and descriptions.

## 📧 Contact Integration

The contact form currently shows an alert on submission. To integrate with a backend:

1. Update the `handleSubmit` function in `app/components/Contact.js`
2. Add your API endpoint
3. Handle form submission and response

Example:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData
  })
  // Handle response
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
# Deploy the .next folder and public folder
```

## 📄 License

This project is open source and available for use.

## 🤝 Support

For issues or questions, please reach out to info@synexis.tech
