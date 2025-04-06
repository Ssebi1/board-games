const container = document.querySelector('.waves')
const waveAnimation = new Wave('.waves',{
    // number of waves
    number: 2,
    // smoothness
    smooth: 50,
    // animation speed
    velocity: .25,
    // height in pixels or percent
    height: .2,
    // color
    colors: ['#041930'],
    // border options
    border: {
        show: false,
        width: 0,
        color: ['']
    },
    // opacity 
    opacity: .9,
    // 'top' | 'bottom' | 'left' | 'right'
    position: 'bottom'
})

// start
waveAnimation.animate();

// pause
// waveAnimation.pause();

// reset
// reset()