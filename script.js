  let editMode = false;

    function generateWorld() {
      const region = document.getElementById('region').value.trim();
      const terrain = document.getElementById('terrain').value;
      const description = document.getElementById('description').value.trim();

      if (!region || !description) {
        alert("Please fill out all fields.");
        return;
      }

      const entry = {
        region,
        terrain,
        description,
        timestamp: new Date().toISOString()
      };

      const saved = JSON.parse(localStorage.getItem('worldEntries') || '[]');
      saved.push(entry);
      localStorage.setItem('worldEntries', JSON.stringify(saved));

      displayOutput(entry);
      displaySavedEntries();

      document.getElementById('region').value = '';
      document.getElementById('description').value = '';
    }

    function displayOutput(entry) {
      document.getElementById('output').innerHTML = `
        <strong>Region:</strong> ${entry.region}<br>
        <strong>Terrain:</strong> ${entry.terrain}<br>
        <strong>Description:</strong><br>${entry.description}
      `;
    }

    function displaySavedEntries() {
      const saved = JSON.parse(localStorage.getItem('worldEntries') || '[]');
      const container = document.getElementById('saved');
      container.innerHTML = '<h2>Saved Worlds</h2>';

      saved.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
          <strong>${entry.region}</strong> (${entry.terrain})<br>
          <small>${new Date(entry.timestamp).toLocaleString()}</small><br>
          <p>${entry.description}</p>
        `;

        if (editMode) {
          const controls = document.createElement('div');
          controls.className = 'entry-controls';
          controls.innerHTML = `
            <button onclick="moveEntry(${index}, -1)">↑ Move Up</button>
            <button onclick="moveEntry(${index}, 1)">↓ Move Down</button>
            <button onclick="deleteEntry(${index})">✕ Delete</button>
          `;
          div.appendChild(controls);
        }

        container.appendChild(div);
      });
    }

    function deleteEntry(index) {
      const saved = JSON.parse(localStorage.getItem('worldEntries') || '[]');
      saved.splice(index, 1);
      localStorage.setItem('worldEntries', JSON.stringify(saved));
      displaySavedEntries();
    }

    function toggleEditMode() {
      editMode = !editMode;
      displaySavedEntries();
    }

    function moveEntry(index, direction) {
      const saved = JSON.parse(localStorage.getItem('worldEntries') || '[]');
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= saved.length) return;

      const temp = saved[index];
      saved[index] = saved[newIndex];
      saved[newIndex] = temp;

      localStorage.setItem('worldEntries', JSON.stringify(saved));
      displaySavedEntries();
    }

    window.onload = displaySavedEntries;