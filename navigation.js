document.addEventListener("DOMContentLoaded", () => {
    const navigation = document.querySelector("#navigation");

    if (!navigation) return;

    const dropdowns = [...navigation.children]
        .map((item, index) => ({
            item,
            trigger: item.querySelector(":scope > a"),
            submenu: item.querySelector(":scope > .submenu"),
            index,
        }))
        .filter(({ trigger, submenu }) => trigger && submenu);

    const closeAll = (except = null) => {
        dropdowns.forEach(({ item, trigger }) => {
            if (item === except) return;

            item.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        });
    };

    dropdowns.forEach(({ item, trigger, submenu, index }) => {
        submenu.id = `submenu-${index + 1}`;
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("aria-controls", submenu.id);
        trigger.setAttribute("aria-expanded", "false");

        const toggle = () => {
            const willOpen = !item.classList.contains("is-open");
            closeAll(item);
            item.classList.toggle("is-open", willOpen);
            trigger.setAttribute("aria-expanded", String(willOpen));
        };

        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            toggle();
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!navigation.contains(event.target)) closeAll();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
    });
});
