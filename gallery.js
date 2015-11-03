THUMBS = 3;
TOTAL = 5;

function parse_thumb_number(cur)
{
	return parseInt(cur.substring(7, cur.indexOf('_')));
}

function with_thumb_number(cur)
{
	return "contest" + cur + "_thumb.jpg";
}

function parse_big_number(cur)
{
	return parseInt(cur.substring(7, cur.indexOf('.')));
}

function with_big_number(cur)
{
	return "contest" + cur + ".jpg";
}

function set_thumbs(cur)
{
	for (var i = 1; i <= THUMBS; i++)
	{
		$("#small_image" + i).attr("src", "");
		$("#small_image" + i).attr("src", with_thumb_number(cur + i - 1));
	}
}

function cur_in_limits(cur)
{
	return 1 <= cur && cur <= TOTAL;
}

function shift_thumbs(delta)
{
	var cur = $("#small_image1").attr("src");
	cur = parse_thumb_number(cur);
	cur += delta;
	if (!cur_in_limits(cur) || !cur_in_limits(cur + THUMBS - 1))
		return;
	set_thumbs(cur);
}

function set_big_image(cur)
{
	$(".splashed.big_image").attr("src", "loading.gif");
	var img = $("<img />");
	img.load(function()
	{
		$(".splashed.big_image").attr("src", $(this).attr("src"));
	});
	img.attr("src", with_big_number(cur));
}

function shift_big(delta)
{
	var cur = parse_big_number($(".splashed.big_image").attr("src"));
	cur += delta;
	if (!cur_in_limits(cur))
		return;
	shift_thumbs(delta);
	set_big_image(cur);
}

$(document).ready(function()
{
	$("input.thumb_control.left").click(function()
	{
		shift_thumbs(-1);
	});

	$("input.thumb_control.right").click(function()
	{
		shift_thumbs(1);
	});

	$("img.small_image").click(function()
	{
		$("div.splash").show();
		var cur = parse_thumb_number($(this).attr("src"));
		set_big_image(cur);
		$(".splashed").show();
	});

	$(".splashed.close").click(function()
	{
		$("div.splash").hide();
		$(".splashed.big_image").hide();
		$(".splashed").hide();
	});

	$(".splashed.left").click(function()
	{
		shift_big(-1);
	});

	$(".splashed.right").click(function()
	{
		shift_big(1);
	});
});