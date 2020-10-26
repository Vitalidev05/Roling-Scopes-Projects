$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:3,
		autoplay:false,
		speed:1000,
		swipe: false,
		responsive:[
			{
				breakpoint: 1080,
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow:1
				}
			}
		]
	});
});

$(document).ready(function(){
	$('.slider-b').slick({
		arrows:true,
		dots:false,
		slidesToShow:4,
		rows: 2,
		autoplay:false,
		speed:1000,
		swipe: false,
		responsive:[
			{
				breakpoint: 1240,
				settings: {
					slidesToShow:3
				}
			},
			{
				breakpoint: 930,
				settings: {
					slidesToShow:2,
					rows: 3,
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow:1,
					rows: 3,
				}
			},
		]
	});
});