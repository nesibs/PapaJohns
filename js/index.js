$(() => {
    const image = ['slider1.png', 'slider2.png', 'slider3.png', 'slider4.jpg', 'slider5.png']
    const path = 'img/'
    const slider = $('#slider')
    let x = 0
    let timer = setTimeout(change, 0, 0)

    slider
        .css({ 
            position: 'relative',
            overflow: 'hidden' ,
            height: '62vh'
        })
        .append('<div id="slide"></div>')
        .append('<div id="thumbs"></div>')
        .click(function(e) {
            change((e.offsetX < $(this).width() / 2) ? -1 : 1)
        })

    const slide = $('#slide')
    const thumbs = $('#thumbs')

    image.forEach(img => thumbs.append(`<img src="${path}${img}" />`))
    
    slide.css({
        position: 'absolute',
        width: '100%', 
        height: '100%'
    })
    slide.find('img')
        .css({
            width: slider.width() + 'px',
            height: slider.height() + 'px',
            objectFit: 'cover',
        })

    thumbs.css({
        position: 'absolute',
        diplay: 'flex',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)'
    })

    thumbs.find('img')
        .css({
            width: '20px',
            height: '20px',
            border: '2px solid #fff',
            borderRadius: '50%',
            margin: '5px',
        })
        .click(function(e){
            e.stopPropagation()
            x = $(this).index()
            change(0)
        })
    
    function change(dir = 1) {
        clearTimeout(timer)
        
        x += dir
        if(x < 0) x = image.length - 1
        if(x >= image.length) x = 0

        slide
            .css({ 
                left: 100 * (dir || 1) + '%', 
                background: `url(${path}${image[x]}) center/cover`
            })
            .animate({ left: 0}, function() {
                slider.css({background: `url(${path}${image[x]}) center/cover`})
            })
        
        timer = setTimeout(change, 3000)
    }
})