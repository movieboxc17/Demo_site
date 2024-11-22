document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('.widget');
    const modal = document.getElementById('customization-modal');
    const closeModalButton = document.getElementById('close-modal');

    widgets.forEach(widget => {
        widget.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showCustomizationModal(e.clientX, e.clientY, widget);
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    function showCustomizationModal(x, y, widget) {
        modal.style.top = `${y}px`;
        modal.style.left = `${x}px`;
        modal.classList.remove('hidden');
        document.getElementById('color-change').onclick = () => changeBackgroundColor(widget);
        document.getElementById('resize-widget').onclick = () => resizeWidget(widget);
        document.getElementById('delete-widget').onclick = () => widget.remove();
    }

    function changeBackgroundColor(widget) {
        widget.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    function resizeWidget(widget) {
        widget.style.transform = 'scale(1.2)';
        setTimeout(() => {
            widget.style.transform = 'scale(1)';
        }, 500);
    }
});
