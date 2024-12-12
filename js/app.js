const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderTable();
}

function renderTable() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.lastTechnician || '-'}</td>
            <td>${item.lastUpdate || '-'}</td>
            <td>
                <button onclick="subtractItem(${index})">-</button>
                <button onclick="addStock(${index})">+</button>
                <button onclick="deleteItem(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addItem() {
    const name = document.getElementById('itemName').value.trim();
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    if (name && quantity > 0) {
        inventory.push({ name, quantity, lastTechnician: null, lastUpdate: null });
        saveInventory();
    } else {
        alert('Preencha os campos corretamente.');
    }
}

function subtractItem(index) {
    const technician = document.getElementById('technicians').value;
    if (!technician) {
        alert('Selecione um técnico.');
        return;
    }
    if (inventory[index].quantity > 0) {
        inventory[index].quantity--;
        inventory[index].lastTechnician = technician;
        inventory[index].lastUpdate = new Date().toLocaleString();
        alert(`Item retirado por ${technician}`);
        saveInventory();
    } else {
        alert('Quantidade insuficiente no estoque.');
    }
}

function addStock(index) {
    inventory[index].quantity++;
    inventory[index].lastUpdate = new Date().toLocaleString();
    saveInventory();
}

function deleteItem(index) {
    inventory.splice(index, 1);
    saveInventory();
}

window.onload = renderTable;