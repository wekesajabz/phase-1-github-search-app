document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value;
        searchGitHubUsers(query);
    });

    function searchGitHubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error("Error fetching users:", error));
    }

    function displayUsers(users) {
        userList.innerHTML = ''; // Clear previous results
        reposList.innerHTML = ''; // Clear repositories list
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;
            userItem.addEventListener('click', () => fetchUserRepos(user.login));
            userList.appendChild(userItem);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUserRepos(data);
        })
        .catch(error => console.error("Error fetching user repositories:", error));
    }

    function displayUserRepos(repos) {
        reposList.innerHTML = ''; // Clear previous repos
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposList.appendChild(repoItem);
        });
    }
});
