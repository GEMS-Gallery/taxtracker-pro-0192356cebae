import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addForm = document.getElementById('addTaxPayerForm');
  const searchForm = document.getElementById('searchTaxPayerForm');
  const taxPayerList = document.getElementById('taxPayerList');
  const searchResult = document.getElementById('searchResult');

  // Function to refresh the TaxPayer list
  async function refreshTaxPayerList() {
    const taxPayers = await backend.getAllTaxPayers();
    taxPayerList.innerHTML = '';
    taxPayers.forEach(tp => {
      const li = document.createElement('li');
      li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}, ${tp.address}`;
      taxPayerList.appendChild(li);
    });
  }

  // Add new TaxPayer
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    addForm.reset();
    refreshTaxPayerList();
  });

  // Search for TaxPayer
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTid = document.getElementById('searchTid').value;
    const result = await backend.searchTaxPayer(searchTid);

    if (result.length > 0) {
      const tp = result[0];
      searchResult.textContent = `Found: ${tp.tid}: ${tp.firstName} ${tp.lastName}, ${tp.address}`;
    } else {
      searchResult.textContent = 'TaxPayer not found';
    }
  });

  // Initial load of TaxPayer list
  refreshTaxPayerList();
});
