input.onfocus = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_hover-focused');
}

input.blur = function(event) {
    i.classList.add('text-field_theme_default');
}

input.onmouseover = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_hover-focused');
}

input.onmouseout = function(event) {
    i.classList.add('text-field_theme_default');
}