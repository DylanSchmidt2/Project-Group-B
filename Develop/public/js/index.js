const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (title && ingredients && description) {
      const response = await fetch(`/api/recipeRoutes`, {
        method: 'POST',
        body: JSON.stringify({ title, ingredients, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/index');
      } else {
        alert('Failed to create recipe');
      }
    }
  };

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
