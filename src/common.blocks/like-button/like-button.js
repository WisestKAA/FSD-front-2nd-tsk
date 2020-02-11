class LikeButton{
    constructor (elem){
        this.likeButton = elem;
        this.likeButton.addEventListener('click', this.handleLikeButtonClick.bind(this));
        this.icon = elem.querySelector('.material-icons');
        this.num = elem.querySelector('.like-button__number');
    }

    handleLikeButtonClick(){
        if(this.likeButton.classList.contains('like-button_active')){
            this.likeButton.classList.remove('like-button_active');
            var num = parseInt(this.num.textContent, 10);
            this.num.textContent = num - 1;
            this.icon.textContent = 'favorite_border';
        }else{
            this.likeButton.classList.add('like-button_active');
            var num = parseInt(this.num.textContent, 10);
            this.num.textContent = num + 1;
            this.icon.textContent = 'favorite';
        }
    }
}

$(document).ready(() => {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach((val =>{
        new LikeButton(val);                
    }));
});