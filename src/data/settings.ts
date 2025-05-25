// Settings data model for the admin panel

export interface SiteSettings {
  header: {
    title: string;
    description: string;
  };
  footer: {
    text: string;
    menus: FooterMenu[];
  };
}

export interface FooterMenu {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
}

// Default settings
export const defaultSettings: SiteSettings = {
  header: {
    title: "Responsive Image Gallery",
    description: "A modern, responsive image gallery with lightbox, filtering, and touch support."
  },
  footer: {
    text: "Built with Next.js and Tailwind CSS",
    menus: [
      {
        id: "1",
        title: "Navigation",
        items: [
          {
            id: "1",
            label: "Home",
            url: "/"
          },
          {
            id: "2",
            label: "Gallery",
            url: "/#gallery"
          }
        ]
      },
      {
        id: "2",
        title: "Resources",
        items: [
          {
            id: "1",
            label: "About",
            url: "/about"
          },
          {
            id: "2",
            label: "Contact",
            url: "/contact"
          }
        ]
      }
    ]
  }
};

// In a real application, this would be stored in a database
let siteSettings: SiteSettings = { ...defaultSettings };

// Functions to get and update settings
export function getSettings(): SiteSettings {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to get settings from localStorage
      const storedSettings = localStorage.getItem('siteSettings');
      if (storedSettings) {
        try {
          // Parse stored settings
          const parsedSettings = JSON.parse(storedSettings);
          // Validate the structure of parsed settings
          if (parsedSettings && 
              typeof parsedSettings === 'object' && 
              parsedSettings.header && 
              parsedSettings.footer) {
            // Update our in-memory settings
            siteSettings = parsedSettings;
          } else {
            console.warn('Invalid settings structure, using defaults');
            // Reset to default settings if structure is invalid
            siteSettings = { ...defaultSettings };
            // Save the default settings
            saveSettings(siteSettings);
          }
        } catch (e) {
          console.error('Failed to parse stored settings:', e);
          // Reset to default settings on parse error
          siteSettings = { ...defaultSettings };
          // Save the default settings
          saveSettings(siteSettings);
        }
      } else {
        // If no settings found in localStorage, use defaults and save them
        console.log('No settings found in localStorage, using defaults');
        siteSettings = { ...defaultSettings };
        saveSettings(siteSettings);
      }
    }
  } catch (error) {
    console.error('Error in getSettings:', error);
  }
  
  return siteSettings;
}

// Helper function to save settings to localStorage
export function saveSettings(settings: SiteSettings): void {
  try {
    if (typeof window !== 'undefined') {
      // Make sure we're saving a complete settings object
      const completeSettings = {
        ...defaultSettings,
        ...settings,
        header: {
          ...defaultSettings.header,
          ...(settings.header || {})
        },
        footer: {
          ...defaultSettings.footer,
          ...(settings.footer || {})
        }
      };
      
      localStorage.setItem('siteSettings', JSON.stringify(completeSettings));
      // Update our in-memory settings
      siteSettings = completeSettings;
      console.log('Settings saved successfully:', completeSettings);
    }
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

export function updateSettings(newSettings: SiteSettings): SiteSettings {
  siteSettings = { ...newSettings };
  saveSettings(siteSettings);
  return siteSettings;
}

export function updateHeaderSettings(title: string, description: string): SiteSettings {
  // Create a new settings object with updated header
  const updatedSettings = {
    ...siteSettings,
    header: {
      ...siteSettings.header,
      title,
      description
    }
  };
  
  // Save the updated settings
  saveSettings(updatedSettings);
  
  // Return the updated settings
  return updatedSettings;
}

export function updateFooterSettings(text: string, menus: FooterMenu[]): SiteSettings {
  siteSettings.footer = { text, menus };
  saveSettings(siteSettings);
  return siteSettings;
}
