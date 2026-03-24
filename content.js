window.addEventListener('load', () => {
  const videoPlayer = document.querySelector('#shkplayer');
  const existingControlsContainer = document.querySelector('.shaka-controls-container');
  if (videoPlayer && existingControlsContainer) {
    createCustomControls(existingControlsContainer, videoPlayer);
  }
});

let jumpInterval = 5; // Default jump interval in seconds

function goForward(videoPlayer) {
  videoPlayer.currentTime += jumpInterval;
}

function goBackward(videoPlayer) {
  videoPlayer.currentTime -= jumpInterval;
}

window.addEventListener('keydown', (event) => {
  const videoPlayer = document.querySelector('#shkplayer');

  if (!videoPlayer) return;
  if (event.key === 'ArrowRight') {
    goForward(videoPlayer);
  } else if (event.key === 'ArrowLeft') {
    goBackward(videoPlayer);
  }
});

function createCustomControls(existingControlsContainer, videoPlayer) {
  // Add your custom controls (e.g., buttons) to the customControlsElement div
  const goForwardButton = document.createElement('button');
  goForwardButton.id = 'go-forward-button';
  goForwardButton.style.color = 'white';
  goForwardButton.style.fontWeight = '900';
  goForwardButton.style.fontSize = '18px';
  goForwardButton.style.textShadow = '0 0 5px black';
  goForwardButton.textContent = '+5s';
  goForwardButton.addEventListener('click', () => {
    goForward(videoPlayer);
  });

  const goBackwardButton = document.createElement('button');
  goBackwardButton.id = 'go-backward-button';
  goBackwardButton.style.color = 'white';
  goBackwardButton.style.fontWeight = '900';
  goBackwardButton.style.fontSize = '18px';
  goBackwardButton.style.textShadow = '0 0 5px black';
  goBackwardButton.textContent = '-5s';
  goBackwardButton.addEventListener('click', () => {
    goBackward(videoPlayer);
  });

  //   const jumpTimeSlider = document.createElement('input');
  //   jumpTimeSlider.type = 'range';
  //   jumpTimeSlider.min = 0;
  //   jumpTimeSlider.max = videoPlayer.duration;
  //   jumpTimeSlider.step = 0.1;
  //   jumpTimeSlider.value = videoPlayer.currentTime;
  //   jumpTimeSlider.addEventListener('input', () => {
  //     videoPlayer.currentTime = jumpTimeSlider.value;
  //   });

  const intervals = [5, 10, 15, 30, 60, 120, 300, 600];
  const jumpIntervalSelect = document.createElement('input');
  jumpIntervalSelect.type = 'range';
  jumpIntervalSelect.min = 0;
  jumpIntervalSelect.max = [intervals.length - 1];
  jumpIntervalSelect.value = 0;

  jumpIntervalSelect.id = 'jump-interval-select';
  jumpIntervalSelect.style.width = '150px';
  jumpIntervalSelect.style.color = 'white';
  jumpIntervalSelect.style.backgroundColor = 'transparent';
  jumpIntervalSelect.style.border = 'none';
  jumpIntervalSelect.style.borderRadius = '0';
  jumpIntervalSelect.style.outline = 'none';
  jumpIntervalSelect.style.boxShadow = 'none';
  jumpIntervalSelect.style.inset = '0';

  jumpIntervalSelect.addEventListener('change', (e) => {
    const selectedInterval = parseInt(intervals[e.target.value], 10);

    if (Number(selectedInterval) === Number(jumpInterval)) {
      return; // No change in interval, do nothing
    } else {
      jumpInterval = selectedInterval;
      goForwardButton.textContent = `+${jumpInterval < 60 ? jumpInterval + 's' : Math.floor(jumpInterval / 60) + 'm'}`;
      goBackwardButton.textContent = `-${jumpInterval < 60 ? jumpInterval + 's' : Math.floor(jumpInterval / 60) + 'm'}`;
    }

    jumpIntervalSelect.blur(); // Remove focus from the select element
  });

  // Select the bottom controls container and insert the custom controls container before the first child
  const bottomControls = existingControlsContainer.querySelector(
    '.shaka-controls-button-panel.shaka-no-propagation.shaka-show-controls-on-mouse-over',
  );
  const firstChild = bottomControls.firstChild;
  firstChild.after(goBackwardButton, jumpIntervalSelect, goForwardButton);
}
