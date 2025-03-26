const projects = [
  {
    id: "child-abuse",
    title: "A Data-Driven Approach to Understanding Child Abuse in Sri Lanka",
    description: "This project transforms government reports on child abuse in Sri Lanka into interactive data visualizations, aiming to raise awareness and facilitate informed discussions among stakeholders to address the issue effectively.",
    image: "img/Child_abuse/project_01.png",
    link: "portfolio/srilanka_child_abuse.html",
    technologies: ["Data Visualization", "Python", "Tableau"],
    year: "2023"
  },
  {
    id: "aws-s3",
    title: "Host Your Static Website on AWS S3 with Terraform",
    description: "This guide walks you through hosting your static website on AWS S3 using Terraform. Follow these steps to set up your environment and deploy your website.",
    image: "img/project_02.webp",
    link: "https://github.com/SankaW/Host_static_web_on_S3_terrafrom",
    technologies: ["AWS", "Terraform", "DevOps"],
    year: "2023"
  },
  {
    id: "auto-theft",
    title: "Toronto Auto Theft Dashboard",
    description: "An interactive Tableau dashboard visualizing auto theft data across Toronto, with insights into theft locations, premises types, and trends by division. Filter by year, month, and location type for a comprehensive look at auto theft incidents. Powered by open data from the Toronto Police Service.",
    image: "img/Auto_theft/Auto_theft.webp",
    link: "portfolio/TPS _Auto_theft.html",
    technologies: ["Tableau", "Data Analysis", "Visualization"],
    year: "2023"
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'col-md-6 col-lg-4 mb-4';
  
  const innerCard = document.createElement('div');
  innerCard.className = 'project-card';
  
  // Create project link
  const projectLink = document.createElement('a');
  projectLink.href = project.link;
  projectLink.style.textDecoration = 'none';
  
  // Add project image
  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.title;
  image.className = 'project-image';
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'project-content';
  
  // Add title
  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;
  
  // Add description
  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  
  // Create tags container
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'portfolio-tags';
  
  // Add tags
  project.technologies.forEach(tech => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'portfolio-tag';
    tagSpan.setAttribute('data-type', tech);
    tagSpan.textContent = tech;
    tagsContainer.appendChild(tagSpan);
  });
  
  // Add year
  const year = document.createElement('span');
  year.className = 'project-year';
  year.textContent = project.year;
  
  // Assemble the card
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(tagsContainer);
  content.appendChild(year);
  
  projectLink.appendChild(image);
  projectLink.appendChild(content);
  
  innerCard.appendChild(projectLink);
  card.appendChild(innerCard);
  
  return card;
}

function initializePortfolio() {
  const container = document.querySelector('#portfolio .container .row');
  if (container) {
    projects.forEach(project => {
      const card = createProjectCard(project);
      container.appendChild(card);
    });
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio); 