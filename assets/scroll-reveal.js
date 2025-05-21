const onReveal = (elements) => {
    let delay = 0.075;
    const options = {
        root: null,
        rootMargin: "100px",
        threshold: 0.15,
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            // activate reveal class
            entry.target.classList.add("reveal-ready");
            observer.unobserve(entry.target);
        });
    }, options);

    elements?.forEach((element, i) => {
        if (!element) return;
        const childs = element.querySelectorAll(".reveal-item");
        if (!childs.length) return;
        /*
         * observe element childs
         * set element's childs delay
         */
        childs.forEach((child, i) => {
            observer.observe(child);
            child.style.animationDelay = i * delay + "s";
        });
    });
};

const initialize = async () => {
    const elements = document.querySelectorAll(".reveal-slide-in");
    elements.length && (await onReveal(elements));
};

initialize();

export { initialize, onReveal };
