// Section 1: Dropdown functionality
document.getElementById('testDropdown').addEventListener('change', function() {
    const result = document.getElementById('dropdownResult');
    result.style.display = 'block';
    
    switch(this.value) {
        case 'option1':
            result.textContent = 'You selected Option 1!';
            break;
        case 'option2':
            result.textContent = 'Option 2 was your choice!';
            break;
        case 'option3':
            result.textContent = 'You went with Option 3!';
            break;
        default:
            result.style.display = 'none';
    }
});

// Section 2: Alert buttons
document.getElementById('showAlertBtn').addEventListener('click', function() {
    alert('This is a test alert!');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = 'Alert was displayed and closed';
});

document.getElementById('showConfirmBtn').addEventListener('click', function() {
    const confirmed = confirm('Please confirm this action?');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = 'Confirm result: ' + (confirmed ? 'OK' : 'Cancel');
});

document.getElementById('showPromptBtn').addEventListener('click', function() {
    const userInput = prompt('Please enter some text:', 'Default text');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = userInput ? 'You entered: ' + userInput : 'Prompt was cancelled';
});

document.getElementById('showCustomAlertBtn').addEventListener('click', function() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 3000);
});

// Section 3: Checkboxes
document.getElementById('checkbox1').addEventListener('change', function() {
    document.getElementById('checkbox1Result').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('checkbox2').addEventListener('change', function() {
    document.getElementById('checkbox2Result').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('checkbox3').addEventListener('change', function() {
    const button = document.getElementById('conditionalBtn');
    button.disabled = !this.checked;
});

document.getElementById('conditionalBtn').addEventListener('click', function() {
    const result = document.getElementById('checkboxBtnResult');
    result.style.display = 'block';
    result.textContent = 'Conditional button was clicked successfully!';
});

// Section 4: Input validation
document.getElementById('validateBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const result = document.getElementById('validationResult');
    
    result.style.display = 'block';
    result.innerHTML = '';
    
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    const errors = [];
    
    if (!nameRegex.test(nameInput.value)) {
        errors.push('Name should contain only letters');
        isValid = false;
    }
    
    if (!emailRegex.test(emailInput.value)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    if (passwordInput.value.length < 6) {
        errors.push('Password should be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        result.style.color = 'green';
        result.textContent = 'All fields are valid!';
    } else {
        result.style.color = 'red';
        result.innerHTML = errors.map(error => `<div>${error}</div>`).join('');
    }
});

// Section 5: Dynamic content
document.getElementById('loadContentBtn').addEventListener('click', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('dynamicContent');
    
    loading.style.display = 'block';
    content.style.display = 'none';
    
    setTimeout(() => {
        loading.style.display = 'none';
        content.style.display = 'block';
        content.innerHTML = `
            <h3>Dynamically Loaded Content</h3>
            <p>This content was loaded after a delay to simulate an AJAX request.</p>
            <p>Current time: ${new Date().toLocaleTimeString()}</p>
        `;
    }, 2000);
});

let itemCount = 0;
document.getElementById('addItemBtn').addEventListener('click', function() {
    itemCount++;
    const list = document.getElementById('dynamicList');
    const newItem = document.createElement('li');
    newItem.textContent = `Dynamically added item #${itemCount}`;
    newItem.setAttribute('data-testid', `dynamic-item-${itemCount}`);
    list.appendChild(newItem);
});

// Section 6: Sortable table with responsive data attributes
document.addEventListener('DOMContentLoaded', function() {
    // Add data-label attributes to table cells for responsive design
    const table = document.getElementById('dataTable');
    if (table) {
        const headerCells = table.querySelectorAll('th');
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, i) => {
                if (headerCells[i]) {
                    cell.setAttribute('data-label', headerCells[i].textContent);
                }
            });
        });
        
        // Sorting functionality
        document.querySelectorAll('#dataTable th').forEach(th => {
            th.addEventListener('click', function() {
                const sortBy = this.getAttribute('data-sort');
                const tbody = document.querySelector('#dataTable tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                const sortedRows = rows.sort((a, b) => {
                    const aCol = a.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent;
                    const bCol = b.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent;
                    
                    if (sortBy === 'age') {
                        return parseInt(aCol) - parseInt(bCol);
                    } else {
                        return aCol.localeCompare(bCol);
                    }
                });
                
                tbody.innerHTML = '';
                sortedRows.forEach(row => tbody.appendChild(row));
            });
        });
    }
});

function getColumnIndex(columnName) {
    const columns = ['id', 'name', 'age', 'city'];
    return columns.indexOf(columnName) + 1;
}

// Section 7: Drag and Drop
document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.id);
    });
});

function setupDragAndDrop() {
    const dropTargets = [
        document.getElementById('dragContainer1'),
        document.getElementById('dragContainer2')
    ];
    
    if (!dropTargets[0] || !dropTargets[1]) return;
    
    dropTargets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '#e3f2fd';
        });
        
        target.addEventListener('dragleave', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '#f9f9f9';
            
            const itemId = e.dataTransfer.getData('text/plain');
            const item = document.getElementById(itemId);
            
            if (item) {
                this.appendChild(item);
                
                const result = document.getElementById('dragResult');
                if (result) {
                    result.style.display = 'block';
                    result.textContent = `Item ${itemId} was moved to ${this.id}`;
                }
            }
        });
    });
}

// Setup drag and drop when DOM is ready
document.addEventListener('DOMContentLoaded', setupDragAndDrop);

// Section 8: Progress Bar
let progressInterval;
function setupProgressBar() {
    const startBtn = document.getElementById('startProgressBtn');
    const resetBtn = document.getElementById('resetProgressBtn');
    
    if (!startBtn || !resetBtn) return;
    
    startBtn.addEventListener('click', function() {
        const progressBar = document.getElementById('progressBarFill');
        const status = document.getElementById('progressStatus');
        
        if (!progressBar || !status) return;
        
        let width = 0;
        progressBar.style.width = '0%';
        status.style.display = 'block';
        status.textContent = 'Progress: 0%';
        
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(progressInterval);
                status.textContent = 'Progress complete!';
            } else {
                width++;
                progressBar.style.width = width + '%';
                status.textContent = `Progress: ${width}%`;
            }
        }, 50);
    });
    
    resetBtn.addEventListener('click', function() {
        const progressBar = document.getElementById('progressBarFill');
        const status = document.getElementById('progressStatus');
        
        if (!progressBar || !status) return;
        
        clearInterval(progressInterval);
        progressBar.style.width = '0%';
        status.style.display = 'block';
        status.textContent = 'Progress reset to 0%';
    });
}

// Setup progress bar when DOM is ready
document.addEventListener('DOMContentLoaded', setupProgressBar);

// Section 9: Image Testing with fixed toggle functionality
function setupImageToggle() {
    const changeBtn = document.getElementById('changeImageBtn');
    if (!changeBtn) return;
    
    changeBtn.addEventListener('click', function() {
        let img1 = document.getElementById('testImage1');
        if (!img1) {
            console.log("img 1 not found by id testImage1");
            return;
        }
        //const img2 = document.getElementById('testImage2');

        if (img1.getAttribute("display") == "cat") {
            img1.setAttribute("src", "pictures/bunny.jpg");
            img1.setAttribute("display", "bunny");
        }
        else {
            img1.setAttribute("src", "pictures/cat.jpg");
            img1.setAttribute("display", "cat");
        }
        // if (!img1 || !img2) return;
        
        // // Toggle visibility
        // if (img1.classList.contains('hidden')) {
        //     img1.classList.remove('hidden');
        //     img2.classList.add('hidden');
        // } else {
        //     img1.classList.add('hidden');
        //     img2.classList.remove('hidden');
        // }
    });
}

// Setup image toggle when DOM is ready
document.addEventListener('DOMContentLoaded', setupImageToggle);

// Section 10: Hover Effects
function setupHoverEffects() {
    const hoverArea = document.getElementById('hoverArea');
    const hoverText = document.getElementById('hoverText');
    
    if (!hoverArea || !hoverText) return;
    
    hoverArea.addEventListener('mouseenter', function() {
        hoverText.style.display = 'block';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        hoverText.style.display = 'none';
    });
}

// Setup hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', setupHoverEffects);

// Section 11: Radio Buttons
function setupRadioButtons() {
    document.querySelectorAll('input[name="radioGroup"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const result = document.getElementById('radioResult');
            if (!result) return;
            
            result.style.display = 'block';
            result.textContent = `You selected: ${this.value}`;
        });
    });
}

// Setup radio buttons when DOM is ready
document.addEventListener('DOMContentLoaded', setupRadioButtons);

// Section 12: iFrame
function setupIframe() {
    const updateBtn = document.getElementById('updateIframeBtn');
    if (!updateBtn) return;
    
    updateBtn.addEventListener('click', function() {
        const iframe = document.getElementById('testIframe');
        if (!iframe) return;
        
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            iframeDoc.open();
            iframeDoc.write('<html><head><style>body{font-family:Arial;text-align:center;padding:10px}button{padding:5px 10px}</style></head><body><div>This is iframe content</div><button id="iframeBtn">Click Me</button><div id="iframeResult"></div><script>document.getElementById("iframeBtn").addEventListener("click",function(){document.getElementById("iframeResult").textContent="Button in iframe clicked!"});<\/script></body></html>');
            iframeDoc.close();
            
            // Adjust iframe height after content is loaded
            setTimeout(function() {
                iframe.style.height = '200px';
                if (iframe.classList) {
                    iframe.classList.add('has-content');
                }
            }, 100);
        } catch (e) {
            console.log('Could not update iframe content:', e);
        }
    });
}

// Setup iframe when DOM is ready
document.addEventListener('DOMContentLoaded', setupIframe);

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupDragAndDrop();
    setupProgressBar();
    setupImageToggle();
    setupHoverEffects();
    setupRadioButtons();
    setupIframe();
});