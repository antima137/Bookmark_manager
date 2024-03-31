document.addEventListener("DOMContentLoaded", () => {
    const bookmarkForm = document.getElementById("bookmark-form");
    const bookmarksContainer = document.querySelector(".bookmarks");
  
    let bookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];
  
    function saveBookmarks() {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  
    function addBookmark({ url, title, folder }) {
      const bookmark = {
        id: new Date().getTime(),
        url,
        title,
        folder,
      };
  
      bookmarks.push(bookmark);
      saveBookmarks();
  
      displayBookmarks();
    }
  
    function displayBookmarks() {
      bookmarksContainer.innerHTML = "";
  
      bookmarks.forEach((bookmark) => {
        const bookmarkElement = document.createElement("div");
        bookmarkElement.classList.add("bookmark");
  
        const urlElement = document.createElement("span");
        urlElement.classList.add("url");
        urlElement.textContent = bookmark.url;
  
        const titleElement = document.createElement("span");
        titleElement.classList.add("title");
        titleElement.textContent = bookmark.title;
  
        const folderElement = document.createElement("span");
        folderElement.classList.add("folder");
        folderElement.textContent = bookmark.folder || "None";
  
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          bookmarks = bookmarks.filter((b) => b.id !== bookmark.id);
          saveBookmarks();
          displayBookmarks();
        });
  
        bookmarkElement.appendChild(urlElement);
        bookmarkElement.appendChild(titleElement);
        bookmarkElement.appendChild(folderElement);
        bookmarkElement.appendChild(deleteButton);
  
        bookmarksContainer.appendChild(bookmarkElement);
      });
    }
  
    bookmarkForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const url = document.getElementById("url").value;
      const title = document.getElementById("title").value;
      const folder = document.getElementById("folder").value;
  
      if (!url || !title) {
        return;
      }
  
      addBookmark({ url, title, folder });
      bookmarkForm.reset();
    });
  
    displayBookmarks();
  });