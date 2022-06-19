import "@testing-library/jest-dom";
import { unmountComponentAtNode } from "react-dom";
import App from "../../src/App";
import { defaultEventData } from "../__mocks__/cwEvents";
import { createRenderer, Global } from "../test-utils";
import { storeConsentCookie } from "@app/services/cookies";


const renderer = createRenderer();

beforeEach(() => {
  (global as Global).wcjcal_ajax_obj = defaultEventData;
  document.cookie = "";

  renderer.container = document.createElement("div");
  renderer.container.id = "wcjcal";
  document.body.appendChild(renderer.container);
});

afterEach(() => {
  if (renderer.container != null) {
    unmountComponentAtNode(renderer.container);
    renderer.container.remove();
  }
  renderer.container = null;
  delete (global as Global).wcjcal_ajax_obj;
});

it("Cookie header is shown by default", () => {
  const renderResult = renderer.render(<App />);
  const cookieHeader = renderResult.queryByTestId("cookie-header");
  expect(cookieHeader).toBeTruthy();
});

it("Cookie header is hidden if there are cookies", () => {
  storeConsentCookie();
  const renderResult = renderer.render(<App />);
  const cookieHeader = renderResult.queryByTestId("cookie-header");
  expect(cookieHeader).toBeFalsy();
});

it("undefined data results in error", async () => {
  (global as Global).wcjcal_ajax_obj = {
    data: {
      events: {},
    },
  } as typeof defaultEventData;
  const renderResult = renderer.render(<App />);
  expect(renderResult.baseElement).toHaveTextContent(
    "Error while loading data"
  );
});
