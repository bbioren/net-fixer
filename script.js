// Function to handle navigation to different pages
function navigateToPage(pageId) {
    // Save the current scroll position
    localStorage.setItem('scrollPosition', window.scrollY);
    // Navigate to the respective page
    window.location.href = pageId + '.html';
}

document.getElementById('title').addEventListener('click', function () {
    navigateToPage('index');
});


// Event listener for navigation buttons
document.querySelectorAll('.nav_button').forEach(button => {
    button.addEventListener('click', function () {
        const pageId = this.id.replace('_button', '');
        if (pageId == 'learn') {
            navigateToPage(pageId + "_page"); // Navigate to learn_page.html
        } else {
            navigateToPage(pageId); // For other buttons (e.g., report, fix)
        }
    });
});


// Report Form Submission (just a simple form submission handler)
document.getElementById('reportForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Form Submitted', data);

    // Here you can handle the data submission (e.g., send to server or store locally)

    // Example: clear the form after submission
    this.reset();
    alert('Your report has been submitted!');
});

// Scroll to a specific element on report.html page
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 50, // 50px above the element
            behavior: 'smooth'
        });
    }
}

// Auto-scroll functionality on page load for report page
if (document.body.contains(document.getElementById('map'))) {
    window.addEventListener('load', function () {
        // Scroll to the report form after the page loads
        scrollToElement('form-section');
    });
}

// Handle the request form submission
document.getElementById("request-form").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent page refresh

    // Get user input values
    const fieldName = document.getElementById("field-name").value;
    const address = document.getElementById("address").value;
    const material = document.getElementById("material").value;

    // Add request to Firestore
    try {
        await addDoc(collection(db, "requests"), {
            fieldName: fieldName,
            address: address,
            material: material,
            status: "Requested",  // Initially set status to 'Requested'
            timestamp: new Date()
        });
        alert("Request submitted successfully!");
        document.getElementById("request-form").reset();
    } catch (error) {
        alert("Error submitting request: " + error.message);
    }
});
