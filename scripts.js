document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('.widget');
    let isEditMode = false; // Tracks if edit mode is active
    let pressTimer; // Tracks long-press timer

    // Add long-press and click functionality to each widget
    widgets.forEach(widget => {
        // Long-press event for touch devices
        widget.addEventListener('touchstart', (e) => handleLongPress(e, widget), { passive: true });
        widget.addEventListener('touchend', resetLongPress);

        // Long-press event for mouse
        widget.addEventListener('mousedown', (e) => handleLongPress(e, widget));
        widget.addEventListener('mouseup', resetLongPress);

        // Delete functionality
        const deleteIcon = widget.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', () => widget.remove());
    });

    // Handle long-press to enable edit mode
    function handleLongPress(e, widget) {
        e.preventDefault(); // Prevent text selection
        if (isEditMode) return; // Prevent multiple triggers

        // Set a timer for the long press
        pressTimer = setTimeout(() => {
            enableEditMode();
        }, 800); // Long-press duration (800ms)
    }

    // Reset the long-press timer
    function resetLongPress() {
        clearTimeout(pressTimer);
    }

    // Enable edit mode with vibrating widgets
    function enableEditMode() {
        isEditMode = true;
        widgets.forEach(widget => {
            widget.classList.add('vibrating'); // Add vibrating effect
            widget.querySelector('.delete-icon').classList.remove('hidden'); // Show delete icons
        });
    }

    // Disable edit mode when clicking outside widgets
    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.widget') && isEditMode) {
            disableEditMode();
        }
    });

    // Disable edit mode and remove effects
    function disableEditMode() {
        isEditMode = false;
        widgets.forEach(widget => {
            widget.classList.remove('vibrating'); // Remove vibrating effect
            widget.querySelector('.delete-icon').classList.add('hidden'); // Hide delete icons
        });
    }
});
