// eslint-disable-next-line strict

console.log('front.js');

const btnEl = document.querySelector('button');

const dummyPost = {
  author: 'Front end',
  body: 'Front end works',
  category: 'comedy',
};

async function createPost(newPostObj) {
  const resp = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newPostObj),
  });
  console.log('resp ===', resp);
}

btnEl.addEventListener('click', () => {
  createPost(dummyPost);
});
