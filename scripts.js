document.addEventListener('DOMContentLoaded', () => {
    const widgetContainer = document.querySelector('#widget-container');
    const widgets = document.querySelectorAll('.widget');
    let isEditMode = false;
    let pressTimer;

    widgets.forEach(widget => {
        // Long-press for enabling edit mode
        widget.addEventListener('mousedown', (e) => handleLongPress(e, widget));
        widget.addEventListener('mouseup', resetLongPress);
        widget.addEventListener('touchstart', (e) => handleLongPress(e, widget));
        widget.addEventListener('touchend', resetLongPress);

        // Dragging functionality
        widget.addEventListener('dragstart', () => widget.classList.add('dragging'));
        widget.addEventListener('dragend', () => widget.classList.remove('dragging'));

        // Delete functionality
        const deleteIcon = widget.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', () => widget.remove());
    });

    // Drag-and-drop functionality
    widgetContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(widgetContainer, e.clientY);
        if (afterElement == null) {
            widgetContainer.appendChild(dragging);
        } else {
            widgetContainer.insertBefore(dragging, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function handleLongPress(e, widget) {
        e.preventDefault();
        if (isEditMode) return;
        pressTimer = setTimeout(() => enableEditMode(), 800);
    }

    function resetLongPress() {
        clearTimeout(pressTimer);
    }

    function enableEditMode() {
        isEditMode = true;
        widgets.forEach(widget => {
            widget.classList.add('vibrating');
            widget.querySelector('.delete-icon').style.visibility = 'visible';
        });
    }

    function disableEditMode() {
        isEditMode = false;
        widgets.forEach(widget => {
            widget.classList.remove('vibrating');
            widget.querySelector('.delete-icon').style.visibility = 'hidden';
        });
    }

    // Exit edit mode when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.widget') && isEditMode) {
            disableEditMode();
        }
    });
});
