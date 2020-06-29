/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RrNavBar {
    }
    interface RrNavLink {
        /**
          * The relative URL where this should link to.
         */
        "url": string;
    }
}
declare global {
    interface HTMLRrNavBarElement extends Components.RrNavBar, HTMLStencilElement {
    }
    var HTMLRrNavBarElement: {
        prototype: HTMLRrNavBarElement;
        new (): HTMLRrNavBarElement;
    };
    interface HTMLRrNavLinkElement extends Components.RrNavLink, HTMLStencilElement {
    }
    var HTMLRrNavLinkElement: {
        prototype: HTMLRrNavLinkElement;
        new (): HTMLRrNavLinkElement;
    };
    interface HTMLElementTagNameMap {
        "rr-nav-bar": HTMLRrNavBarElement;
        "rr-nav-link": HTMLRrNavLinkElement;
    }
}
declare namespace LocalJSX {
    interface RrNavBar {
    }
    interface RrNavLink {
        /**
          * The relative URL where this should link to.
         */
        "url": string;
    }
    interface IntrinsicElements {
        "rr-nav-bar": RrNavBar;
        "rr-nav-link": RrNavLink;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rr-nav-bar": LocalJSX.RrNavBar & JSXBase.HTMLAttributes<HTMLRrNavBarElement>;
            "rr-nav-link": LocalJSX.RrNavLink & JSXBase.HTMLAttributes<HTMLRrNavLinkElement>;
        }
    }
}
