let revealAnimation;
const loadRevealAnimation = async () => {
    const importRevealAnimation = await import(
        window?._importmap?.imports?.["reveal-animation"] || "reveal-animation"
    );

    revealAnimation = importRevealAnimation.onReveal;
};

async function updateRevealAnimation(e) {
    if (!revealAnimation) await loadRevealAnimation();
    else {
        let element = e.target.closest(".reveal-slide-in")
            ? e.target.closest(".reveal-slide-in")
            : e.target.querySelector(".reveal-slide-in");

        const revealSection = new Set([element]) || new Set([element]);
        revealAnimation(revealSection);
    }
}

document.addEventListener("shopify:block:select", (event) =>
    updateRevealAnimation(event)
);
document.addEventListener("shopify:section:select", (event) =>
    updateRevealAnimation(event)
);
document.addEventListener("shopify:section:load", (event) =>
    updateRevealAnimation(event)
);
