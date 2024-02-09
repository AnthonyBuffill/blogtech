const postFormHandler = async (event) => {
  
  event.preventDefault();

  
  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value.trim();

  if (title && body) {
   
    const response = await fetch('/api/blogposts/create-blogpost', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location='/'
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', postFormHandler);