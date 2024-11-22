document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('.widget');
    let isEditMode = false;

    widgets.forEach(widget => {
        widget.addEventListener('touchstart', (e) => handleLongPress(e, widget), { passive: true });
        widget.addEventListener('mousedown', (e) => handleLongPress(e, widget));
        widget.addEventListener('mouseup', resetLongPress);
        widget.addEventListener('touchend', resetLongPress);
        widget.querySelector('.delete-icon').addEventListener('click', () => widget.remove());
    });

    let pressTimer;
    function handleLongPress(e, widget) {
        if (isEditMode) return;
        pressTimer = setTimeout(() => {
            enableEditMode();
        }, 800); // Long press duration
    }

    function resetLongPress() {
        clearTimeout(pressTimer);
    }

    function enableEditMode() {
        isEditMode = true;
        widgets.forEach(widget => {
            widget.classList.add('vibrating');
            widget.querySelector('.delete-icon').classList.remove('hidden');
        });
    }

    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.widget') && isEditMode) {
            disableEditMode();
        }
    });

    function disableEditMode() {
        isEditMode = false;
        widgets.forEach(widget => {
            widget.classList.remove('vibrating');
            widget.querySelector('.delete-icon').classList.add('hidden');
        });
    }
});
