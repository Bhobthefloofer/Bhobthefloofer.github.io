const draggables = document.querySelectorAll('.idea-card');
const columns = document.querySelectorAll('.kanban-column');
const addIdeaButtons = document.querySelectorAll('.add-idea');

// Create modal container
const modalContainer = document.createElement('div');
modalContainer.id = 'modalContainer';
modalContainer.style.position = 'fixed';
modalContainer.style.top = '0';
modalContainer.style.left = '0';
modalContainer.style.width = '100%';
modalContainer.style.height = '100%';
modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modalContainer.style.display = 'none';
modalContainer.style.justifyContent = 'center';
modalContainer.style.alignItems = 'center';
modalContainer.style.backdropFilter = 'blur(5px)';
modalContainer.style.zIndex = '1000';

document.body.appendChild(modalContainer);

modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    modalContainer.style.display = 'none';
  }
});

const modalContent = document.createElement('div');
modalContent.id = 'modalContent';
modalContent.style.backgroundColor = 'white';
modalContent.style.paddingTop = '30px';
modalContent.style.paddingBottom = '30px';
modalContent.style.position = 'relative'

const modalInnerContent = document.createElement('div');
modalInnerContent.className = 'modal-inner-content';
modalInnerContent.style.transformOrigin = 'center';
modalInnerContent.style.width = '700px';
modalInnerContent.style.height = 'auto';
modalInnerContent.style.margin = '0 auto';
modalInnerContent.style.display = 'block';
modalInnerContent.style.textAlign = 'left';
modalInnerContent.style.justifyContent = 'center';
modalInnerContent.style.alignItems = 'center';
modalContent.insertBefore(modalInnerContent, modalContent.firstChild);
modalContent.style.borderRadius = '8px';
modalContent.style.maxWidth = '1000px';
modalContent.style.maxHeight = '95%';
modalContent.style.overflowY = 'auto';

modalContainer.appendChild(modalContent);

const closeButton = document.createElement('span');
closeButton.innerHTML = '&times;';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.left = '10px';
closeButton.style.zIndex = '10';
closeButton.style.color = 'black';
closeButton.style.zIndex = '1001';
closeButton.style.color = 'black';
closeButton.style.zIndex = '1001';
closeButton.style.fontSize = '24px';
closeButton.style.cursor = 'pointer';
closeButton.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});
modalContent.appendChild(closeButton);

// Function to initialize the multiselect country dropdown
function initializeCountryDropdown(container) {
  const campaignBar = container.querySelector('#campaignBar');
  if (!campaignBar) return;

  // Create the multiselect container
  const multiselectContainer = document.createElement('div');
  multiselectContainer.style.position = 'relative';
  multiselectContainer.style.width = '100%';

  // Create the main input box
  const mainInput = document.createElement('div');
  mainInput.style.borderRadius = '4px';
  mainInput.style.padding = '8px';
  mainInput.style.marginTop = '8px';
  mainInput.style.backgroundColor = '#fff';
  mainInput.style.minHeight = '38px';
  mainInput.style.cursor = 'pointer';
  mainInput.style.display = 'flex';
  mainInput.style.flexWrap = 'wrap';
  mainInput.style.gap = '4px';

  // Create the dropdown container
  const dropdownContainer = document.createElement('div');
  dropdownContainer.style.position = 'absolute';
  dropdownContainer.style.top = '100%';
  dropdownContainer.style.left = '0';
  dropdownContainer.style.width = '100%';
  dropdownContainer.style.maxHeight = '200px';
  dropdownContainer.style.overflowY = 'auto';
  dropdownContainer.style.backgroundColor = '#fff';
  dropdownContainer.style.border = '1px solid lightgray';

  dropdownContainer.style.borderRadius = '0 0 4px 4px';
  dropdownContainer.style.display = 'none';
  dropdownContainer.style.zIndex = '1000';

  // Add countries
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Singapore',
    'South Korea'
  ];

  const selectedCountries = new Set();

  // Function to create a selected country tag
  function createCountryTag(country) {
    const tag = document.createElement('span');
    tag.style.backgroundColor = 'lightgray';
    tag.style.border = '1px solid black';
    tag.style.borderRadius = '3px';
    tag.style.padding = '2px 6px';
    tag.style.marginRight = '4px';
    tag.style.display = 'inline-flex';
    tag.style.alignItems = 'center';
    tag.style.fontSize = '14px';

    const text = document.createElement('span');
    text.textContent = country;
    tag.appendChild(text);

    const removeBtn = document.createElement('span');
    removeBtn.textContent = '×';
    removeBtn.style.marginLeft = '4px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedCountries.delete(country);
      tag.remove();
      updateDropdownItems();
    });
    tag.appendChild(removeBtn);

    return tag;
  }

  // Function to update dropdown items
  function updateDropdownItems() {
    dropdownContainer.innerHTML = '';
    countries.forEach(country => {
      if (!selectedCountries.has(country)) {
        const item = document.createElement('div');
        item.textContent = country;
        item.style.padding = '8px';
        item.style.cursor = 'pointer';
        item.style.color = 'black';

        item.addEventListener('mouseover', () => {
          item.style.backgroundColor = '#e6f0ff';
        });

        item.addEventListener('mouseout', () => {
          item.style.backgroundColor = '#fff';
        });

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          selectedCountries.add(country);
          mainInput.appendChild(createCountryTag(country));
          updateDropdownItems();
        });

        dropdownContainer.appendChild(item);
      }
    });
  }

  // Toggle dropdown on main input click
  mainInput.addEventListener('click', () => {
    const isVisible = dropdownContainer.style.display === 'block';
    dropdownContainer.style.display = isVisible ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!multiselectContainer.contains(e.target)) {
      dropdownContainer.style.display = 'none';
    }
  });

  // Initial setup
  updateDropdownItems();

  // Add elements to the DOM
  multiselectContainer.appendChild(mainInput);
  multiselectContainer.appendChild(dropdownContainer);
  campaignBar.innerHTML = '';
  campaignBar.appendChild(multiselectContainer);
}

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('is-dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('is-dragging');
  });
});

columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(column, e.clientY);
    const draggable = document.querySelector('.is-dragging');
    const newIdeaButton = column.querySelector('.add-idea');
    if (afterElement == null) {
      column.insertBefore(draggable, newIdeaButton);
    } else {
      column.insertBefore(draggable, afterElement);
    }
  });
});

addIdeaButtons.forEach(button => {
  button.addEventListener('click', () => {
    fetch('post-sub.html')
      .then(response => response.text())
      .then(data => {
        modalInnerContent.innerHTML = data;
        const textArea = modalContent.querySelector('textarea');
        if (textArea) {
          textArea.style.width = '95%';
          textArea.style.height = '400px';
        }
        modalContent.appendChild(closeButton);
        modalContainer.style.display = 'flex';

        // Initialize the dropdown after loading content
        initializeCountryDropdown(modalInnerContent);
      })
      .catch(err => console.error('Failed to load content:', err));
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.idea-card:not(.is-dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Initialize dropdowns on page load for non-modal content
// Initialize campaigns on page load
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if the list doesn't exist
  if (!localStorage.getItem("campaignList")) {
      initializeCampaignList();
  }
  
  // If we're on the post.html page, display campaigns
  if (window.location.pathname.includes("post.html")) {
      displayCampaign();
  }
});


// Store campaign

function initializeCampaignList() {
  // Only initialize if the list doesn't exist
  if (!localStorage.getItem("campaignList")) {
      const initialCampaigns = [
          {
              "title": "inspirations",
              "header": "Save inspirations you find online with one click",
              "date": "14/11/2024",
              "time": "15:30",
              "status": "draft",
              "content": "Use Buffer browser extension to save Ideas from the Web. Highlight text or select an image and right-click...",
              "file": "./clock.png",
              "country": ["United States", "United Kingdom"]
          },
          {
              "title": "plan",
              "header": "This is a place to plan your content",
              "date": "14/11/2024",
              "time": "15:30",
              "status": "published",
              "content": "Save your ideas before converting them into posts. Brainstorm, plan ahead, and refine!",
              "file": "./pen.png",
              "country": ["Japan", "China", "Korea"]
          }
      ];

      localStorage.setItem("campaignList", JSON.stringify(initialCampaigns));
  }
}


// Function to add a campaign to the list


function displayCampaign() {
  console.log("Displaying campaigns...");
  
  // Get the campaign list
  const campaignList = JSON.parse(localStorage.getItem("campaignList")) || [];
  console.log("Retrieved campaigns:", campaignList);

  // Clear existing campaign cards first
  document.querySelectorAll('.idea-card').forEach(card => {
      if (!card.classList.contains('default-card')) {
          card.remove();
      }
  });

  campaignList.forEach(campaign => {
      console.log("Processing campaign:", campaign);
      let campaignStatus = campaign.status;
      console.log(campaignStatus)
      let statusDiv = document.getElementById(campaignStatus);
      
      console.log("Status div found:", statusDiv, "for status:", campaignStatus);

      if (statusDiv) {
          // Create campaign item
          let campaignItem = document.createElement("div");
          campaignItem.setAttribute("class", "idea-card");
          campaignItem.setAttribute("draggable", "true");

          // Add drag listeners
          campaignItem.addEventListener('dragstart', () => {
              campaignItem.classList.add('is-dragging');
          });

          campaignItem.addEventListener('dragend', () => {
              campaignItem.classList.remove('is-dragging');
          });

          // Create campaign content
          let h6 = document.createElement("h6");
          h6.innerText = campaign.header || campaign.title;

          let button = document.createElement("button");
          button.setAttribute("class", "btn btn-dark campaign-button");
          button.innerText = "Campaign Name";

          let para = document.createElement("p");
          para.style.marginTop = "6px";
          para.innerText = campaign.content;

          // Assemble campaign item
          campaignItem.appendChild(h6);
          campaignItem.appendChild(button);
          campaignItem.appendChild(para);

          // Find the add-idea button
          const addIdeaButton = statusDiv.querySelector('.add-idea');
          
          // Insert the campaign item before the add-idea button
          if (addIdeaButton) {
              statusDiv.insertBefore(campaignItem, addIdeaButton);
          } else {
              statusDiv.appendChild(campaignItem);
          }
      }
  });
}

function addCampaign() {
  // Get form values
  const campaignTitle = document.getElementById("postTitle").value;
  const campaignDate = document.getElementById("postDate").value;
  const campaignTime = document.getElementById("postTime").value;
  const campaignStatus = document.getElementById("postStatus").value;
  const campaignContent = document.getElementById("postContent").value;
  const campaignFile = document.getElementById("fileUpload").value;

  // Debug logging
  console.log("Adding campaign with values:", {
      title: campaignTitle,
      date: campaignDate,
      time: campaignTime,
      status: campaignStatus,
      content: campaignContent,
      selectedCountries: window.selectedCountries
  });

  if (campaignTitle && campaignDate && campaignTime && campaignStatus && campaignContent) {
      const newCampaign = {
          title: campaignTitle,
          header: campaignTitle,
          date: campaignDate,
          time: campaignTime,
          status: campaignStatus.toLowerCase(), // Ensure status is lowercase to match IDs
          content: campaignContent,
          file: campaignFile || "./pen.png",
          country: window.selectedCountries || []
      };

      // Get existing campaigns
      let campaignList = JSON.parse(localStorage.getItem("campaignList")) || [];
      
      // Add new campaign
      campaignList.push(newCampaign);
      
      // Save to localStorage
      localStorage.setItem("campaignList", JSON.stringify(campaignList));
      
      console.log("Updated campaign list:", campaignList);
      console.log(localStorage)

      // Redirect
      window.location.href = "post.html";
      // displayCampaign()
  } else {
      alert("Please fill all required fields");
  }
}


initializeCampaignList();


