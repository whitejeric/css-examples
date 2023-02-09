const track = document.getElementById('track');

window.onmousedown = (e) => {
	track.dataset.mouseDownAt = e.clientX;
};
window.onmouseup = (e) => {
	track.dataset.mouseDownAt = '0';
	track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
	if (track.dataset.mouseDownAt === '0') return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
	const maxDelta = window.innerWidth / 2;
	const percentage = (mouseDelta / maxDelta) * -100;
	const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
	const boundedPercentage = Math.max(Math.min(nextPercentage, 0), -100);
	track.dataset.percentage = boundedPercentage;
	track.animate(
		{
			transform: `translate(${boundedPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: 'forwards' }
	);
	// backtick quotes are essential here for string interpolation
	for (const image of track.getElementsByClassName('image')) {
		image.animate(
			{
				objectPosition: `${boundedPercentage + 100}% center`,
			},
			{ duration: 1200, fill: 'forwards' }
		);
	}
};
