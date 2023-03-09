/**
 * @property {HTMLElement}  Element Dom de la lightbox 
 * @property {HTMLElement[]} cards Dom des cards photo
 * @property {HTMLElement} lightboxcard Dom du card actuellement affiché 
 */


class Lightbox {
 
    static init(){
        const photos = Array.from(document.querySelectorAll('.media_photographer_photo , .video'))
        const cards = photos.map(photo => photo.parentNode.parentNode)
        console.log(cards)
        photos.forEach(photo => photo.addEventListener("click", e =>{
            e.preventDefault()
                const image = e.currentTarget.parentNode.parentNode
                console.log(image)
                const lightboxcard = image.cloneNode(true)                
                new Lightbox(lightboxcard, cards)
            }))
        }

 /**
 * @param {HTMLElement} lightboxcard DomElement de l'image
 * @param {HTMLElement[]} cards DomElement de l'image
 */
    constructor(lightboxcard, cards){
        this.lightboxcard = lightboxcard
        const element = this.buildDOM(lightboxcard)
        console.log(this.lightboxcard)
        // faire une vérification si c'est une vidéo ou pas, remettre le texte en dessous 
        this.lightboxcard.firstElementChild.firstElementChild.setAttribute("controls","controls")
        this.lightboxcard.lastElementChild.lastElementChild.style.display= "none"
        this.cards = cards
        const lightboxmodal  = document.getElementById("lightbox_modal")
        lightboxmodal.style.display ="block"
        lightboxmodal.innerHTML=""
        lightboxmodal.appendChild(element)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.addEventListener('keyup', this.onKeyUp)
    }

 /**
 * @param {MouseEvent/KeyboardEvent } e
 */
    close (){
        const lightboxmodal  = document.getElementById("lightbox_modal")
        lightboxmodal.style.display ="none"
        document.removeEventListener('keyup', this.onKeyUp) // netoyer le listener de la page 
    }
/**
 * @param {KeyboardEvent } e
 */
    onKeyUp (e){
        if (e.key === "Escape"){
            this.close(e)
        }
    }

 /**
 * @param {HTMLElement} cardinage DomElement de l'image
 * @return {HTMLElement} Dom 
 */
    buildDOM (lightboxcard){
        const dom = document.createElement('div')
        dom.classList.add('lightbox__container')
        console.log(lightboxcard)
        dom.innerHTML =
        `  
        <i class="fa-solid fa-chevron-left lightbox__prev"></i>
        <div class ="lightbox__card"></div>
        <i class="fa-solid fa-chevron-right lightbox__next"></i>
        <img src="assets/icons/close.svg" class="close__lightbox" alt="Fermer" style="background-color:red;"/>
        `
        dom.querySelector(".lightbox__card").appendChild(lightboxcard)
        dom.querySelector(".close__lightbox").addEventListener("click", this.close.bind(this))
        dom.querySelector(".lightbox__prev").addEventListener("click", this.prev.bind(this))
        dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this))

    return dom   
    }

 /**
 *   @param {MouseEvent/KeyboardEvent } e
 */
    next(e ){
        e.preventDefault()
        const p = this.lightboxcard.firstElementChild.firstElementChild.src 
        console.log(p)
        console.log(this.cards)
        for (var i = 0; i < this.cards.length; i++) {
          //  console.log(this.cards[i].firstElementChild.firstElementChild.src)
            if (p === this.cards[i].firstElementChild.firstElementChild.src){
                const nextcards = this.cards[i+1]
                const lightboxcard = nextcards.cloneNode(true)
                new Lightbox (lightboxcard, this.cards)
            }
        }
    }    

/**
 * @param {MouseEvent/KeyboardEvent } e
*/
    prev(e){
        e.preventDefault()
        const p = this.lightboxcard.firstElementChild.firstElementChild.src 
        console.log(p)
        console.log(this.cards)
        for (var i = 0; i < this.cards.length; i++) {
          //  console.log(this.cards[i].firstElementChild.firstElementChild.src)
            if (p === this.cards[i].firstElementChild.firstElementChild.src){
                const nextcards = this.cards[i-1]
                const lightboxcard = nextcards.cloneNode(true)
                new Lightbox (lightboxcard, this.cards)
            }
        }
    }
}


