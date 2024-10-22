document.getElementById("resume-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fetch user input data from the form
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const work = (document.getElementById("work") as HTMLInputElement).value;

    // Array to store skills
    const skills: string[] = [];

    // Get the checked skills checkboxes
    const skillsCheckboxes = document.querySelectorAll<HTMLInputElement>(".skills-checkbox input:checked");
    skillsCheckboxes.forEach((checkbox) => {
        skills.push(checkbox.value);
    });

    // Get the selected gender
    const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value;

    // Get the profile image source
    const profileImgSrc = (document.getElementById("profile-img-src") as HTMLImageElement).src;

    // Dynamically generate resume content
    const resumeContent = `
        <div><h3 class="editable-section" contenteditable="true" id="resume-name">Name: ${name}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-email">Email: ${email}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-phone">Phone: ${phone}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-education">Education: ${education}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-work">Work Experience: ${work}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-skills">Skills: ${skills.join(', ')}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-gender">Gender: ${gender}</h3></div>
        <div><h3 class="editable-section" contenteditable="true" id="resume-profile-image">Profile Image: <img src="${profileImgSrc}" alt="Profile Image" style="width: 100px; border-radius: 50%"></h3></div>
    `;

    const resumeOutput = document.getElementById("resume-output");
    const resumeContentDiv = document.getElementById("resume-content");

    // Insert the generated resume content into the page
    if (resumeContentDiv) {
        resumeContentDiv.innerHTML = resumeContent;
    }

    if (resumeOutput) {
        resumeOutput.style.display = "block";
    }

    // Show the "Back to Form" button after resume is generated
    const backToFormButton = document.getElementById("back-to-form-btn");
    if (backToFormButton) {
        backToFormButton.style.display = "inline-block";
    }

    // Add event listeners to make fields editable and update resume content when clicked
    document.querySelectorAll('.editable-section').forEach((section) => {
        section.addEventListener('input', (e) => {
            const updatedContent = (e.target as HTMLElement).innerHTML;

            // Switch case to handle updates when a specific section is edited
            if (e.target) {
                const id = (e.target as HTMLElement).id;
                switch (id) {
                    case "resume-name":
                        const nameElement = document.getElementById("name") as HTMLInputElement;
                        if (nameElement) {
                            nameElement.value = updatedContent.replace(/^Name:\s*/, ''); // Update the form field
                        }
                        break;
                    case "resume-email":
                        const emailElement = document.getElementById("email") as HTMLInputElement;
                        if (emailElement) {
                            emailElement.value = updatedContent.replace(/^Email:\s*/, ''); // Update the form field
                        }
                        break;
                    case "resume-phone":
                        const phoneElement = document.getElementById("phone") as HTMLInputElement;
                        if (phoneElement) {
                            phoneElement.value = updatedContent.replace(/^Phone:\s*/, ''); // Update the form field
                        }
                        break;
                    case "resume-education":
                        const educationElement = document.getElementById("education") as HTMLInputElement;
                        if (educationElement) {
                            educationElement.value = updatedContent.replace(/^Education:\s*/, ''); // Update the form field
                        }
                        break;
                    case "resume-work":
                        const workElement = document.getElementById("work") as HTMLInputElement;
                        if (workElement) {
                            workElement.value = updatedContent.replace(/^Work Experience:\s*/, ''); // Update the form field
                        }
                        break;
                    case "resume-skills":
                        const skillsArray = updatedContent.replace(/^Skills:\s*/, '').split(', ');
                        document.querySelectorAll(".skills-checkbox input").forEach((checkbox) => {
                            checkbox.checked = skillsArray.includes(checkbox.value);
                        });
                        break;
                    case "resume-gender":
                        document.querySelectorAll('input[name="gender"]').forEach((radio) => {
                            (radio as HTMLInputElement).checked = (radio as HTMLInputElement).value === updatedContent.replace(/^Gender:\s*/, '');
                        });
                        break;
                }
            }
        });
    });
});

// Back to Form Button functionality
document.getElementById("back-to-form-btn")?.addEventListener("click", () => {
    const resumeOutput = document.getElementById("resume-output");
    const resumeContentDiv = document.getElementById("resume-content");

    if (resumeOutput) {
        resumeOutput.style.display = "none";
    }

    if (resumeContentDiv) {
        resumeContentDiv.innerHTML = "";
    }

    // Reset form fields
    document.getElementById("resume-form")?.reset();

    // Hide the "Back to Form" button
    const backToFormButton = document.getElementById("back-to-form-btn");
    if (backToFormButton) {
        backToFormButton.style.display = "none";
    }
});
