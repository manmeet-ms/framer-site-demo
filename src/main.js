gsap.registerPlugin(ScrollTrigger);

let cards = gsap.utils.toArray('.card');
let animation = gsap.timeline();

function initCards() {
    animation.clear();

    // Set initial positions and styles
    cards.forEach((card, index) => {
        gsap.set(card, {
            position: 'absolute',
            top: 0,
            left: 0,
            filter: 'blur(0px)',
            y: index === 0 ? 0 : 200, // First card is at the top, others start from below
            opacity: index === 0 ? 1 : 0, // First card is always visible, others start invisible
            rotation: 0, // Ensure no initial rotation
        });
    });

    // Animate subsequent cards
    cards.forEach((card, index) => {
        if (index > 0) {
            // Animate the current card sliding in from the bottom
            animation.to(
                card,
                {
                    opacity: 1, // Fade in the next card
                    y: 0, // Slide to original position
                    duration: 1,
                    ease: 'Power2.out',
                },
                index,
            ); // Use index to sequence animations

            // Rotate and blur the previous card
            const rotation = index % 2 === 0 ? 7 : -7; // Rotate 7 or -7 degrees
            animation.to(
                cards[index - 1],
                {
                    filter: 'blur(5px)', // Apply blur to the previous card
                    rotation: rotation, // Apply rotation
                    duration: 1,
                    ease: 'Power2.out',
                },
                index,
            ); // Apply blur and rotate to the previous card
        }
    });
}

initCards();

const totalHeight = cards.length * window.innerHeight; // Total height based on number of cards
const offset = 50; // Define the offset
ScrollTrigger.create({
    trigger: '.container',
    start: `top top+=${offset}`,
    end: `+=${totalHeight}`,
    scrub: true,
    animation,
    pin: true,
    markers: false, // Set to false in production
});
