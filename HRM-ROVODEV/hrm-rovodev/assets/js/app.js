/* ============================================
   CSRF TOKEN SETUP FOR AJAX
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Get CSRF token from meta tag or PHP variable
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || 
                      (typeof CSRF_TOKEN !== 'undefined' ? CSRF_TOKEN : null);
    
    // Setup AJAX headers with CSRF token
    if (csrfToken) {
        // For fetch API
        window.csrfToken = csrfToken;
        
        // For XMLHttpRequest
        XMLHttpRequest.prototype.setCSRFHeader = function() {
            if (csrfToken) {
                this.setRequestHeader('X-CSRF-Token', csrfToken);
            }
        };
    }
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Make AJAX request with CSRF token
 */
function ajaxRequest(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };
    
    if (window.csrfToken) {
        headers['X-CSRF-Token'] = window.csrfToken;
    }
    
    return fetch(url, {
        method: options.method || 'GET',
        headers: { ...headers, ...options.headers },
        body: options.body ? JSON.stringify(options.body) : undefined
    }).then(response => response.json());
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.flash-messages-container');
    if (!container) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">
                ${type === 'success' ? '✓' : 
                  type === 'error' ? '✕' : 
                  type === 'warning' ? '⚠' : 'ℹ'}
            </span>
            <span class="alert-message">${escapeHtml(message)}</span>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove();">×</button>
    `;
    
    container.appendChild(alert);
    
    if (duration > 0) {
        setTimeout(() => alert.remove(), duration);
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ============================================
   GLOBAL SEARCH FUNCTIONALITY
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performGlobalSearch(query);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});

/**
 * Perform global search via AJAX
 */
function performGlobalSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '<div class="search-result-item">Searching...</div>';
    searchResults.style.display = 'block';
    
    ajaxRequest('ajax/search.php', {
        method: 'POST',
        body: { q: query }
    })
    .then(response => {
        if (!response.success || !response.data || response.data.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            return;
        }
        
        let html = '';
        response.data.forEach(item => {
            const icon = item.type === 'staff' ? '👤' : '🏢';
            const href = item.type === 'staff' ? 
                        `staff/view/${item.id}` : 
                        `departments/${item.id}`;
            
            html += `
                <a href="${escapeHtml(href)}" class="search-result-item">
                    <span>${icon}</span>
                    <strong>${escapeHtml(item.name)}</strong>
                    ${item.detail ? `<span class="text-gray"> - ${escapeHtml(item.detail)}</span>` : ''}
                </a>
            `;
        });
        
        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    })
    .catch(error => {
        console.error('Search error:', error);
        searchResults.innerHTML = '<div class="search-result-item">Error performing search</div>';
    });
}

/* ============================================
   FORM VALIDATION & AUTO-CALCULATION
   ============================================ */

/**
 * Auto-calculate age from date of birth
 */
document.addEventListener('DOMContentLoaded', function() {
    const dobInput = document.getElementById('date_of_birth');
    const ageInput = document.getElementById('age');
    
    if (dobInput && ageInput) {
        dobInput.addEventListener('change', function() {
            const dob = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            
            ageInput.value = age > 0 ? age : '';
        });
    }
});

/**
 * Auto-calculate contract end date from signed date (add 3 years)
 */
document.addEventListener('DOMContentLoaded', function() {
    const contractSignedInput = document.getElementById('contract_signed_date');
    const contractEndInput = document.getElementById('contract_end_date');
    
    if (contractSignedInput && contractEndInput) {
        contractSignedInput.addEventListener('change', function() {
            const signedDate = new Date(this.value);
            if (isNaN(signedDate.getTime())) return;
            
            // Add 3 years
            signedDate.setFullYear(signedDate.getFullYear() + 3);
            
            // Format as YYYY-MM-DD for input[type="date"]
            const year = signedDate.getFullYear();
            const month = String(signedDate.getMonth() + 1).padStart(2, '0');
            const day = String(signedDate.getDate()).padStart(2, '0');
            
            contractEndInput.value = `${year}-${month}-${day}`;
        });
    }
});

/* ============================================
   FORM VALIDATION HELPERS
   ============================================ */

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number (basic)
 */
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 7 && re.test(phone);
}

/**
 * Mark field as invalid
 */
function markFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.add('form-error');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add new error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    field.parentElement.appendChild(errorMsg);
}

/**
 * Clear field error
 */
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.remove('form-error');
    
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}

/**
 * Validate form fields
 */
function validateForm(formId, rules = {}) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        const fieldId = field.id;
        const value = field.value.trim();
        const fieldRules = rules[fieldId];
        
        if (!fieldRules) return;
        
        // Check required
        if (fieldRules.required && !value) {
            markFieldError(fieldId, `${fieldRules.label || fieldId} is required`);
            isValid = false;
            return;
        }
        
        // Check email
        if (fieldRules.email && value && !validateEmail(value)) {
            markFieldError(fieldId, 'Invalid email format');
            isValid = false;
            return;
        }
        
        // Check min length
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
            markFieldError(fieldId, `Must be at least ${fieldRules.minLength} characters`);
            isValid = false;
            return;
        }
        
        // Check max length
        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            markFieldError(fieldId, `Must be no more than ${fieldRules.maxLength} characters`);
            isValid = false;
            return;
        }
        
        // If valid, clear error
        clearFieldError(fieldId);
    });
    
    return isValid;
}

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */

/**
 * Open modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Close modal when clicking outside
 */
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
});

/* ============================================
   CONFIRM DELETE FUNCTIONALITY
   ============================================ */

/**
 * Show confirm delete dialog
 */
function confirmDelete(deleteUrl, deleteCallback = null) {
    const modal = document.getElementById('confirmDeleteModal');
    if (!modal) return;
    
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    // Remove old event listener
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    // Add new event listener
    newConfirmBtn.addEventListener('click', function() {
        if (deleteCallback && typeof deleteCallback === 'function') {
            deleteCallback();
        } else if (deleteUrl) {
            // Default: redirect to delete URL
            window.location.href = deleteUrl;
        }
        closeModal('confirmDeleteModal');
    });
    
    openModal('confirmDeleteModal');
}

/* ============================================
   FLASH MESSAGE AUTO-DISMISS
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        // Auto-dismiss after 4 seconds (but not error messages)
        if (!alert.classList.contains('alert-error')) {
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 4000);
        }
    });
});

/* ============================================
   SIDEBAR TOGGLE FOR MOBILE
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
});

/* ============================================
   TABLE UTILITIES
   ============================================ */

/**
 * Toggle table row selection checkbox
 */
function toggleTableCheckbox(checkbox) {
    const table = checkbox.closest('table');
    if (!table) return;
    
    const checkboxes = table.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

/**
 * Get selected rows
 */
function getSelectedRows() {
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]:checked');
    const rows = [];
    
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        if (row && row.dataset.id) {
            rows.push(row.dataset.id);
        }
    });
    
    return rows;
}

/**
 * Perform bulk action
 */
function bulkAction(action) {
    const selectedRows = getSelectedRows();
    
    if (selectedRows.length === 0) {
        showNotification('Please select at least one item', 'warning');
        return;
    }
    
    if (confirm(`Are you sure you want to ${action} ${selectedRows.length} item(s)?`)) {
        ajaxRequest('ajax/bulk-action.php', {
            method: 'POST',
            body: {
                action: action,
                ids: selectedRows
            }
        })
        .then(response => {
            if (response.success) {
                showNotification(response.message, 'success');
                setTimeout(() => location.reload(), 1000);
            } else {
                showNotification(response.message || 'Action failed', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred', 'error');
        });
    }
}

/* ============================================
   IMAGE UPLOAD PREVIEW
   ============================================ */

/**
 * Preview image before upload
 */
function previewImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (!input || !preview) return;
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select a valid image file', 'warning');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size must not exceed 5MB', 'warning');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
}

/* ============================================
   FORM AUTO-SAVE TO LOCALSTORAGE
   ============================================ */

/**
 * Enable form auto-save
 */
function enableFormAutoSave(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const fields = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(fieldName => {
                const field = form.elements[fieldName];
                if (field) {
                    field.value = data[fieldName];
                }
            });
        } catch (e) {
            console.warn('Could not restore form data:', e);
        }
    }
    
    // Auto-save on change
    fields.forEach(field => {
        field.addEventListener('change', function() {
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            localStorage.setItem(storageKey, JSON.stringify(data));
        });
    });
    
    // Clear saved data on successful submit
    form.addEventListener('submit', function() {
        localStorage.removeItem(storageKey);
    });
}

/**
 * Clear form auto-save data
 */
function clearFormAutoSave(storageKey) {
    localStorage.removeItem(storageKey);
}

/* ============================================
   PAGINATION HELPERS
   ============================================ */

/**
 * Go to page
 */
function goToPage(pageNumber) {
    const url = new URL(window.location);
    url.searchParams.set('page', pageNumber);
    window.location.href = url.toString();
}

/**
 * Sort table by column
 */
function sortTable(columnIndex, tableId = null) {
    const selector = tableId ? `#${tableId}` : 'table';
    const table = document.querySelector(selector);
    if (!table) return;
    
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const isAsc = table.dataset.sortAsc === 'true' && table.dataset.lastSort == columnIndex;
    
    rows.sort((a, b) => {
        const aValue = a.querySelectorAll('td')[columnIndex].textContent.trim();
        const bValue = b.querySelectorAll('td')[columnIndex].textContent.trim();
        
        // Try numeric sort
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAsc ? bNum - aNum : aNum - bNum;
        }
        
        // String sort
        return isAsc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
    });
    
    rows.forEach(row => table.querySelector('tbody').appendChild(row));
    
    table.dataset.sortAsc = isAsc ? 'false' : 'true';
    table.dataset.lastSort = columnIndex;
}

/* ============================================
   CHART INITIALIZATION
   ============================================ */

/**
 * Initialize chart with data
 */
function initializeChart(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };
    
    try {
        return new Chart(canvas, {
            type: type,
            data: data,
            options: { ...defaultOptions, ...options }
        });
    } catch (e) {
        console.error('Chart initialization error:', e);
    }
}

/* ============================================
   UTILITY: DEBOUNCE
   ============================================ */

/**
 * Debounce function for optimizing frequent events
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* ============================================
   UTILITY: THROTTLE
   ============================================ */

/**
 * Throttle function for rate-limiting function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('HR Manager app initialized');
    
    // Set CSRF token from meta tag if available
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    if (csrfMeta && !window.csrfToken) {
        window.csrfToken = csrfMeta.getAttribute('content');
    }
});
