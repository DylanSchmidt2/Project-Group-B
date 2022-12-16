const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const description = document.querySelector('#description').value.trim();
  console.log(title)
    if (title && ingredients && description) {
      const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({ title, ingredients, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create recipe');
      }
    }
  };

  // Attach the newFormHandler function to the form's submit event
const form = document.querySelector('#create-recipe-form');
form.addEventListener('submit', newFormHandler);


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/index');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };

//const saveButtonHandler = async (event) => {}
