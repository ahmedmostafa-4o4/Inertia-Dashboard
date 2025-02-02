import "../css/app.css";
import "animate.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import Main from "./Pages/Main";

const appName = "Dashboard";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // Set Main as default layout for pages without specific layouts
        const layoutTitle = page.default.header || appName;
        page.default.layout =
            page.default.layout ||
            ((page) => (
                <Main
                    children={page}
                    auth={page.props.auth}
                    header={layoutTitle}
                />
            ));

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "rgba(15, 157, 252)",
    },
});
