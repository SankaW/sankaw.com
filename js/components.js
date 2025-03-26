// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Function to initialize components
async function initializeComponents() {
    // Load header
    await loadComponent('header-component', '../components/header.html');
    
    // Load footer
    await loadComponent('footer-component', '../components/footer.html');
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComponents); 