
input.onfocus = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_hover-focused');
    i.classList.remove('text-field_theme_default');
}

input.blur = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_default');
    i.classList.remove('text-field_theme_hover-focused');
}

input.onmouseover = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_hover-focused');
    i.classList.remove('text-field_theme_default');
}

input.onmouseout = function(event) {
    let i = event.target;
    i.classList.add('text-field_theme_default');
    i.classList.remove('text-field_theme_hover-focused');
}