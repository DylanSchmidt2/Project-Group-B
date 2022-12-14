const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log('event', event)
    const name = document.querySelector('.name-signup').value.trim();
    const email = document.querySelector('.email-signup').value.trim();
    const password = document.querySelector('.password-signup').value.trim();
  console.log('credentials', name, email, password)
   // if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      }
      );
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  //};
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);