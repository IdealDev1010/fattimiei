class QuantityInput extends HTMLElement {
    constructor() {
        super();
        this.input = this.querySelector("input");
        this.changeEvent = new Event("change", { bubbles: true });

        this.handles = {
            onButtonClick: this.onButtonClick.bind(this),
        };
    }

    connectedCallback() {
        this.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", this.handles.onButtonClick);
        });
    }

    onButtonClick(event) {
        event.preventDefault();
        const previousValue = this.input.value;

        event.target.name === "plus"
            ? this.input.stepUp()
            : this.input.stepDown();
        if (previousValue !== this.input.value) {
            this.input.dispatchEvent(this.changeEvent);
        }
    }

    disconnectedCallback() {
        this.querySelectorAll("button").forEach((button) => {
            button.removeEventListener("click", this.handles.onButtonClick);
        });
    }
}

export { QuantityInput };
