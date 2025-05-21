const _update = (item) => {
    const detailsWrapper = item.querySelector(".item-details-wrapper");
    const actionsWrapper = item.querySelector(".item-actions-wrapper");
    const colorVariants = item.querySelector("select-color-variants");

    detailsWrapper &&
        actionsWrapper &&
        detailsWrapper.appendChild(actionsWrapper);
};

class ProductBlockRecommendations extends HTMLElement {
    constructor() {
        super();
        this.observers = {
            mutation: new MutationObserver(this.callbackMutation.bind(this)),
        };
    }

    connectedCallback() {
        const recommendations = this.querySelector(
            "product-recommendations:has(.grid-item)"
        );
        const slider = recommendations?.querySelector?.("slider-component");
        const squamaItems = recommendations?.querySelectorAll?.("squama-item");

        if (recommendations) {
            this.updateGridItems(recommendations);
            squamaItems.forEach((squamaItem) => squamaItem.reinit?.());
            slider.disconnectedCallback();
            slider.connectedCallback();
        } else {
            this.observers.mutation.observe(
                this.querySelector("product-recommendations"),
                { childList: true, subtree: true }
            );
        }
    }

    updateGridItems(element) {
        const items = element.querySelectorAll(".grid-item");
        items.forEach(_update);
    }

    callbackMutation(mutationsList, observer) {
        for (const { type, addedNodes } of mutationsList) {
            if (type !== "childList") return;

            addedNodes.forEach(
                (node) => node.nodeType == 1 && this.updateGridItems(node)
            );
        }
    }

    callbackColorVariantsReveal(entries) {
        if (entries.some((entry) => entry.isIntersecting)) {
            entries
                .map(({ target }) => target)
                .forEach((target) => {
                    const squamaItem = target.closest("squama-item");

                    squamaItem?.reinit?.();
                });
        }
    }

    disconnectedCallback() {
        Object.values(this.observers).forEach(
            (observer) => observer.disconnect
        );
    }
}

export { ProductBlockRecommendations };
