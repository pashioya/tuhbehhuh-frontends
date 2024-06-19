// @ts-check
import { render } from "@testing-library/react";
import App from "./App";
import { test } from "vitest";

test("app renders", () => {
    render(<App />);
});
