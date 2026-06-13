const whatsappLink = document.getElementById('whatsapp-link');

if (whatsappLink) {
    whatsappLink.addEventListener('click', function(event) {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0);

        if (!isMobile) {
            event.preventDefault();
            window.open(this.href, '_blank');
        }
    });
}