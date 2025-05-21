const { trapFocus } = await import(
    window?._importmap?.imports?.["helper"] || "helper"
);
const { MenuDrawer } = await import(
    window?._importmap?.imports?.["menu-drawer"] || "menu-drawer"
);

class HeaderDrawer extends MenuDrawer {
    constructor() {
        super();
    }

    openMenuDrawer(summaryElement) {
        this.header = this.header || this.closest(".shopify-section");
        this.borderOffset =
            this.borderOffset ||
            this.closest(".header-wrapper").classList.contains(
                "header-wrapper--border-bottom"
            )
                ? 1
                : 0;
        document.documentElement.style.setProperty(
            "--header-bottom-position",
            `${parseInt(
                this.header.getBoundingClientRect().bottom - this.borderOffset
            )}px`
        );

        setTimeout(() => {
            this.mainDetailsToggle.classList.add("menu-opening");
            this.mainDetailsToggle.open = true;
            trapFocus(this.mainDetailsToggle, summaryElement);
        });

        summaryElement.setAttribute("aria-expanded", true);
        document.body.classList.add("overflow-hidden-mobile");
    }
}

export { HeaderDrawer };
