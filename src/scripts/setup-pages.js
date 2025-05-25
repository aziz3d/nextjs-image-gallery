// Script to set up the About and Contact pages in the footer menu

// Function to get settings from localStorage
function getSettings() {
  try {
    const storedSettings = localStorage.getItem('siteSettings');
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (e) {
    console.error('Error getting settings:', e);
  }
  return null;
}

// Function to save settings to localStorage
function saveSettings(settings) {
  try {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Error saving settings:', e);
    return false;
  }
}

// Function to add About and Contact pages to footer menu
function setupPagesInFooter() {
  const settings = getSettings();
  if (!settings) {
    console.error('Could not get settings');
    return false;
  }

  // Check if we already have a Pages menu
  let pagesMenuIndex = settings.footer.menus.findIndex(menu => menu.title === 'Pages');
  
  if (pagesMenuIndex === -1) {
    // Create a new Pages menu
    const newMenu = {
      id: 'pages-menu-' + Date.now(),
      title: 'Pages',
      items: []
    };
    settings.footer.menus.push(newMenu);
    pagesMenuIndex = settings.footer.menus.length - 1;
  }
  
  // Add About and Contact items if they don't exist
  const pagesMenu = settings.footer.menus[pagesMenuIndex];
  
  // Check for About page
  if (!pagesMenu.items.some(item => item.label === 'About')) {
    pagesMenu.items.push({
      id: 'about-link-' + Date.now(),
      label: 'About',
      url: '/about'
    });
  }
  
  // Check for Contact page
  if (!pagesMenu.items.some(item => item.label === 'Contact')) {
    pagesMenu.items.push({
      id: 'contact-link-' + Date.now(),
      label: 'Contact',
      url: '/contact'
    });
  }
  
  // Save the updated settings
  const success = saveSettings(settings);
  
  if (success) {
    console.log('Successfully added About and Contact pages to footer menu');
    return true;
  } else {
    console.error('Failed to save settings');
    return false;
  }
}

// Initialize About page content
function setupAboutPage() {
  const aboutContent = {
    title: 'About Us',
    content: `<h2>Welcome to Our Image Gallery</h2>
<p>We are passionate about photography and showcasing beautiful images from around the world.</p>
<p>Our gallery features a curated collection of high-quality images that capture the beauty and diversity of our world.</p>
<h3>Our Mission</h3>
<p>To provide a platform for photographers to showcase their work and for visitors to enjoy stunning visual experiences.</p>
<h3>Our Team</h3>
<p>Our team consists of photography enthusiasts and web developers dedicated to creating the best possible gallery experience.</p>`
  };
  
  localStorage.setItem('aboutPageContent', JSON.stringify(aboutContent));
  console.log('About page content initialized');
}

// Initialize Contact page content
function setupContactPage() {
  const contactContent = {
    title: 'Contact Us',
    content: '<p>We\'d love to hear from you! Please use the form below to get in touch with our team.</p>',
    email: 'contact@imagegallery.com',
    phone: '+1 (555) 123-4567',
    address: '123 Gallery Street, Art City, AC 12345'
  };
  
  localStorage.setItem('contactPageContent', JSON.stringify(contactContent));
  console.log('Contact page content initialized');
}

// Run the setup functions
setupPagesInFooter();
setupAboutPage();
setupContactPage();

console.log('Setup complete!');
