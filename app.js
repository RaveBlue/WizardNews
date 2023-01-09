const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan("dev"));

app.use(express.static("public"));

// STYLING THE INITIAL ROUTE

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  res.send(html);
});

// ADD A SINGLE POST ROUTE AND CUSTOM ERROR HANDLER

app.get("/posts/:id", (req, res, next) => {
  const id = req.params.id;

  const post = postBank.find(id);

  const htmlId = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <span class="news-position"></span>
              ${post.title}
              <small>(by ${post.name})</small>
              <p>${post.content}</p>
            </p>
          </div>
      </div>
      </body>
      </html>`;

  if (!post.id) {
    res.status(404);

    const htmlErr = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <h1>Accio Page! 🧙‍♀️ ... Page Not Found</h1>
        <iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="480" height="480" frameBorder="0"</iframe>
      </div>
    </body>
    </html>`;
    res.send(htmlErr);

  } else {

    res.send(htmlId);
  }
});
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
