/*  Name: shaka ombongi
Date: 2025-03-21
CSC 372-01
these are the functions for the getting repo */
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchUsername = document.getElementById('searchUsername');
    const repoGallery = document.getElementById('repoGallery');
  
    // Trigger search on button click or Enter key
    searchButton.addEventListener('click', handleSearch);
    searchUsername.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  
    async function handleSearch() {
      const username = searchUsername.value.trim();
      if (username) {
        repoGallery.innerHTML = `<p>Loading...</p>`;
        await fetchRepositories(username);
      }
    }
  
    async function fetchRepositories(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos = await response.json();
        displayRepositories(repos);
      } catch (error) {
        console.error('Error fetching repository data:', error);
        repoGallery.innerHTML = `<p>Error fetching repository data. Please try again.</p>`;
      }
    }
  
    function displayRepositories(repos) {
      repoGallery.innerHTML = ''; // Clear previous results
      if (repos.length === 0) {
        repoGallery.innerHTML = '<p>No repositories found.</p>';
        return;
      }
  
      repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repository';
        repoElement.innerHTML = `
          <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
          <p>Description: ${repo.description ? repo.description : 'No description provided.'}</p>
          <p>Created at: ${new Date(repo.created_at).toLocaleDateString()}</p>
          <p>Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
          <p>Watchers: ${repo.watchers_count}</p>
          <p class="commit-count">Commits: <span>Loading...</span></p>
          <button class="fetch-languages">Show Languages</button>
          <ul class="languages"></ul>
        `;
        repoGallery.appendChild(repoElement);
  
        // Fetch and display commit count
        fetchCommitCount(repo).then(count => {
          const commitCountElement = repoElement.querySelector('.commit-count span');
          commitCountElement.textContent = count;
        }).catch(err => {
          console.error('Error fetching commit count:', err);
          const commitCountElement = repoElement.querySelector('.commit-count span');
          commitCountElement.textContent = 'N/A';
        });
  
        // Attach event listener for languages button
        const languagesButton = repoElement.querySelector('.fetch-languages');
        languagesButton.addEventListener('click', () => {
          fetchLanguages(repo.languages_url, languagesButton);
        });
      });
    }
  
    async function fetchLanguages(languagesUrl, buttonElement) {
      try {
        const response = await fetch(languagesUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const languages = await response.json();
        const languagesList = buttonElement.nextElementSibling;
        languagesList.innerHTML = ''; // Clear previous results
        Object.keys(languages).forEach(language => {
          const languageItem = document.createElement('li');
          languageItem.textContent = language;
          languagesList.appendChild(languageItem);
        });
        buttonElement.disabled = true; // Prevent further clicks
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    }
  
    async function fetchCommitCount(repo) {
      try {
        // Prepare commits URL by removing template placeholder
        const commitsUrl = repo.commits_url.replace('{/sha}', '') + '?per_page=1';
        const response = await fetch(commitsUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Check if the response has pagination info
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          // Parse the 'last' page number from the Link header
          const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            return parseInt(lastPageMatch[1], 10);
          }
        }
        // If no Link header, return the count from the fetched commits
        const data = await response.json();
        return data.length;
      } catch (error) {
        console.error('Error fetching commit count:', error);
        return 'N/A';
      }
    }
  });
  