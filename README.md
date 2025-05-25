# Next.js Image Gallery

A modern, responsive image gallery application built with Next.js, React, and Tailwind CSS. This application provides a beautiful frontend gallery for visitors and a comprehensive admin panel for content management.

## 🌟 Features

### 🖼️ Public Gallery

- **Responsive Image Gallery**: Displays images in a grid layout that adapts to different screen sizes
- **Image Lightbox**: Click on any image to view it in a full-screen lightbox with navigation controls
- **Tag Filtering**: Filter images by tags/categories to find specific content
- **Pagination**: Navigate through multiple pages of images
- **About Page**: Customizable about page with information about the gallery
- **Contact Page**: Contact information and form for visitors to reach out

### 👩‍💼 Admin Panel

- **Dashboard**: Overview of gallery statistics and quick access to common tasks
- **Image Management**:
  - Upload new images with metadata (title, description, tags)
  - Edit existing image details
  - Delete images from the gallery
  - Organize images by categories/tags
- **Page Management**:
  - Customize About page content
  - Configure Contact page information
- **Settings**:
  - Configure site-wide settings
  - Customize header and footer content
- **Footer Management**:
  - Edit footer text
  - Configure footer navigation menus
- **Responsive Design**: Admin interface works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aziz3d/nextjs-image-gallery.git
cd nextjs-image-gallery
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the gallery.

5. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

## 🏗️ Project Structure

```
/public
  /images         # Gallery images
/src
  /app
    /about        # About page
    /admin        # Admin panel pages
      /dashboard  # Admin dashboard
      /images     # Image management
      /pages      # Page content management
      /settings   # Site settings
      /footer     # Footer management
    /contact      # Contact page
  /components     # Reusable React components
    /gallery      # Gallery-specific components
  /data           # Data management and utilities
```

## 💾 Data Storage

This application uses client-side storage (localStorage) to persist data, making it easy to deploy without a backend server. In a production environment, you might want to replace this with a proper database solution.

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the look and feel by modifying:

- `tailwind.config.js` - For theme customization
- `src/app/globals.css` - For global styles
- `src/app/admin/admin.css` - For admin-specific styles

### Content

All content is editable through the admin panel:

1. **About Page**: Edit content through Admin → Pages → About
2. **Contact Page**: Configure contact information through Admin → Pages → Contact
3. **Footer**: Customize footer text and menus through Admin → Footer

## 🔧 Technologies Used

- **Next.js 15**: React framework for production
- **React 18**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Local Storage API**: For client-side data persistence

## 📱 Responsive Design

The application is fully responsive and works on devices of all sizes:

- Mobile phones (portrait and landscape)
- Tablets
- Desktops and large screens

## 🔒 Security Considerations

This is a demo application with client-side authentication. For production use, consider implementing:

- Server-side authentication
- API routes with proper validation
- Database integration instead of localStorage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [React Icons](https://react-icons.github.io/react-icons/) - For the icon set
