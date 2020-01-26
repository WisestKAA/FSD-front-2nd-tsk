// let input = document.input;

// input.onfocus = function(event) {
//     let i = event.target;
//     i.classList.add('text-field_theme_hover-focused');
//     i.classList.remove('text-field_theme_default');
// }

// input.blur = function(event) {
//     let i = event.target;
//     i.classList.add('text-field_theme_default');
//     i.classList.remove('text-field_theme_hover-focused');
// }

// input.onmouseover = function(event) {
//     let i = event.target;
//     i.classList.add('text-field_theme_hover-focused');
//     i.classList.remove('text-field_theme_default');
// }

// input.onmouseout = function(event) {
//     let i = event.target;
//     i.classList.add('text-field_theme_default');
//     i.classList.remove('text-field_theme_hover-focused');
// }

// function text_field_focus (event) {
//     let i = event.target;
//     i.classList.add('text-field_theme_hover-focused');
//     i.classList.remove('text-field_theme_default');
// }

// function text_field_unfocused (event){
//     let i = event.target;
//     i.classList.add('text-field_theme_default');
//     i.classList.remove('text-field_theme_hover-focused');
// }

// function addEventList (_id)
// {   var x = document.getElementById(_id);
//     x.addEventListener("focus", text_field_focus, true);
//     x.addEventListener("blur", text_field_unfocused, true);
//     x.addEventListener("mouseover", text_field_focus, true);
//     x.addEventListener("mouseout", text_field_unfocused, true);
// }