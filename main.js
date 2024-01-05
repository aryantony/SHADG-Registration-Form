const form=document.getElementById('formData');
const loadingOverlay=document.getElementById('loadingOverlay');
const thankYouMessage=document.getElementById('thankYouMessage');
const heading=document.getElementById("shadG");
function isValidEmail(email) {
    // Regular expression for validating email format
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhoneNumber(phoneNumber) {
    // Regular expression for validating phone number format (exactly 10 digits)
    const phoneRegex=/^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}
form.addEventListener('submit',async (e) => {
    e.preventDefault();
    let isValid=true;

    const firstName=document.getElementById('firstName');
    const lastName=document.getElementById('lastName');
    const gender=document.getElementById('gender');
    const email=document.getElementById('email');
    const phoneNumber=document.getElementById('phoneNumber');
    const orgName=document.getElementById('orgName');

    const firstNameError=document.getElementById('firstNameError');
    const lastNameError=document.getElementById('lastNameError');
    const genderError=document.getElementById('genderError');
    const emailError=document.getElementById('emailError');
    const phoneNumberError=document.getElementById('phoneNumberError');
    const orgNameError=document.getElementById('orgNameError');

    // Validate First Name
    if(firstName.value.trim()==='') {
        firstNameError.textContent='First name is required.';
        isValid=false;
    } else {
        firstNameError.textContent='';
    }

    // Validate Last Name
    if(lastName.value.trim()==='') {
        lastNameError.textContent='Last name is required.';
        isValid=false;
    } else {
        lastNameError.textContent='';
    }

    // Validate Gender
    if(gender.value==='') {
        genderError.textContent='Please select a gender.';
        isValid=false;
    } else {
        genderError.textContent='';
    }

    // Validate Email
    if(email.value.trim()==='') {
        emailError.textContent='Email is required.';
        isValid=false;
    } else if(!isValidEmail(email.value.trim())) {
        emailError.textContent='Please enter a valid email address.';
        isValid=false;
    } else {
        emailError.textContent='';
    }

    // Validate Phone Number
    if(phoneNumber.value.trim()==='') {
        phoneNumberError.textContent='Phone number is required.';
        isValid=false;
    } else if(!isValidPhoneNumber(phoneNumber.value.trim())) {
        phoneNumberError.textContent='Please enter a valid 10-digit phone number.';
        isValid=false;
    } else {
        phoneNumberError.textContent='';
    }


    // Validate Institute Name
    if(orgName.value.trim()==='') {
        orgNameError.textContent='Institute name is required.';
        isValid=false;
    } else {
        orgNameError.textContent='';
    }

    // Prevent form submission if validation fails
    if(!isValid) {
        e.preventDefault();
        return;
    }


    const formData=new FormData(form);
    const url=form.getAttribute('action');

    try {
        loadingOverlay.style.display='flex';
        const response=await fetch(url,{
            method: 'POST',
            body: formData
        });

        const data=await response.json();
        if(data.result==='success') {
            form.classList.add('hidden');
            loadingOverlay.style.display='none';
            heading.style.display='none'
            thankYouMessage.classList.remove('hidden');
            // Reload the page after 3 seconds
            setTimeout(() => {
                location.reload();
            },3000);
        } else {
            // Handle errors if submission was not successful
            console.error('Form submission failed:',data);
            loadingOverlay.style.display='none';
        }
    } catch(error) {
        console.error('An error occurred during form submission:',error);
        loadingOverlay.style.display='none';
    }
});