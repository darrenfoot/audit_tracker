const clients = [
  {
    name: 'Acme Manufacturing Ltd',
    statuses: {
      fieldwork: 'inProgress',
      managerReview: 'notStarted',
      partnerReview: 'notStarted'
    }
  },
  {
    name: 'Brighton Hospitality Group',
    statuses: {
      fieldwork: 'waiting',
      managerReview: 'notStarted',
      partnerReview: 'notStarted'
    }
  },
  {
    name: 'Cambridge BioTech PLC',
    statuses: {
      fieldwork: 'complete',
      managerReview: 'inProgress',
      partnerReview: 'notStarted'
    }
  },
  {
    name: 'Devonshire Retail Co.',
    statuses: {
      fieldwork: 'complete',
      managerReview: 'complete',
      partnerReview: 'inProgress'
    }
  },
  {
    name: 'Evergreen Services LLP',
    statuses: {
      fieldwork: 'notStarted',
      managerReview: 'notStarted',
      partnerReview: 'notStarted'
    }
  }
];

const stages = [
  { id: 'fieldwork', label: 'Fieldwork' },
  { id: 'managerReview', label: 'Manager Review' },
  { id: 'partnerReview', label: 'Partner Review' }
];

function createClientList(container) {
  clients.forEach((client) => {
    const card = document.createElement('div');
    card.className = 'client-name';
    card.textContent = client.name;
    card.setAttribute('role', 'rowheader');
    container.appendChild(card);
  });
}

function createStatusCells() {
  const template = document.getElementById('status-cell-template');

  stages.forEach((stage) => {
    const column = document.querySelector(`[data-stage="${stage.id}"] .board-column__body`);

    clients.forEach((client) => {
      const statusCell = template.content.firstElementChild.cloneNode(true);
      const select = statusCell.querySelector('.status-select');
      const statusValue = client.statuses[stage.id] ?? 'notStarted';

      select.value = statusValue;
      updateStatusAppearance(statusCell, statusValue);

      select.addEventListener('change', (event) => {
        const value = event.target.value;
        updateStatusAppearance(statusCell, value);
        client.statuses[stage.id] = value;
      });

      column.appendChild(statusCell);
    });
  });
}

function updateStatusAppearance(cell, value) {
  const validStatuses = ['notStarted', 'inProgress', 'complete', 'waiting'];
  if (!validStatuses.includes(value)) {
    value = 'notStarted';
  }

  if (value === 'notStarted') {
    cell.removeAttribute('data-status');
  } else {
    cell.dataset.status = value;
  }
}

function initBoard() {
  const clientListContainer = document.getElementById('client-list');
  createClientList(clientListContainer);
  createStatusCells();
}

window.addEventListener('DOMContentLoaded', initBoard);
