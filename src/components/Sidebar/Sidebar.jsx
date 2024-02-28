import "./sidebar.scss";
import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true,
    };

    this.sidebarRef = React.createRef();
  }

  componentDidMount() {
    const sidebarElem = this.sidebarRef.current;

    this.elems = [
      {
        ref: sidebarElem.querySelector(".logo__title"),
        className: "logo__title--closed",
      },
      ...[...sidebarElem.querySelectorAll(".routes__item")].reduce(
        (res, elem) => [
          ...res,
          {
            ref: elem,
            className: "routes__item--closed",
          },
        ],
        []
      ),
      {
        ref: sidebarElem,
        className: "opened",
      },
      {
        ref: sidebarElem.querySelector(".logo__btn"),
        className: "logo__btn--right",
      },
    ];
  }

  componentDidUpdate() {
    // async function* generateTransition(elems) {
    //   for (let { ref, className } of elems) {
    //     ref.classList.toggle(className);

    //     await new Promise((res) => {
    //       ref.addEventListener("transitionend", () => res());
    //     });
    //   }
    // }

    const transitionAsyncLoop = async () => {
      //   const genTransition = generateTransition(this.elems);
      //   for await (let value of genTransition) {
      //   }
      const { isOpened } = this.state;
      const elemArr = !isOpened ? this.elems : [...this.elems].reverse();

      for (let { ref, className } of elemArr) {
        ref.classList.toggle(className);

        await new Promise((res) => {
          ref.addEventListener("transitionend", () => res());
        });
      }
    };

    transitionAsyncLoop();
  }

  toggleSidebar = () => {
    this.setState((state) => ({ isOpened: !state.isOpened }));
  };

  goToRoute = (path) => {
    console.log(`going to "${path}"`);
  };

  render() {
    // const { isOpened } = this.state;
    // const containerClassnames = classnames("sidebar", { opened: isOpened });
    // const closedClassname = (className) => {
    //   return classnames(className, { [`${className}--closed`]: !isOpened });
    // };
    // const btnClassnames = classnames("logo__btn", {
    //   "logo__btn--right": !isOpened,
    // });

    return (
      <div ref={this.sidebarRef} className="sidebar opened">
        <div className="logo">
          <img className="logo__img" src={logo} alt="TensorFlow logo" />
          <span className="logo__title">TensorFlow</span>
          <button className="logo__btn" onClick={this.toggleSidebar}>
            <FontAwesomeIcon icon="angle-left" />
          </button>
        </div>

        <div className="routes">
          {routes.map((route) => (
            <div
              className="routes__item"
              key={route.title}
              onClick={() => this.goToRoute(route.path)}
            >
              <FontAwesomeIcon
                className="routes__item-icon"
                icon={route.icon}
              />
              <span className="routes__item-title">{route.title}</span>
            </div>
          ))}
        </div>

        <div className="routes routes--bottom">
          {bottomRoutes.map((route) => (
            <div
              className="routes__item"
              key={route.title}
              onClick={() => this.goToRoute(route.path)}
            >
              <FontAwesomeIcon
                className="routes__item-icon"
                icon={route.icon}
              />
              <span className="routes__item-title">{route.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
