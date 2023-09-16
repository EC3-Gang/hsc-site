import KonamiCode from 'konami-code-js';
import Swal from 'sweetalert2';

new KonamiCode(async () => {
	document.body.innerHTML = `
		<iframe
		style="height: 100vh; width: 100vw; position: absolute; top: 0; left: 0;"
		src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
		title="Rick Astley - Never Gonna Give You Up (Official Music Video)" 
		frameborder="0" 
		allow="accelerometer; 
					autoplay; 
					clipboard-write; 
					encrypted-media; 
					gyroscope; 
					picture-in-picture; 
					web-share" 
					allowfullscreen
		></iframe>
	`;

	Swal.fire({
		icon: 'success',
		title: 'lol',
		text: 'get absolutely trolled',
	});
});