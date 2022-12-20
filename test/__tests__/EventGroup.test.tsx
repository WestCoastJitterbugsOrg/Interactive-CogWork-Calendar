import { EventGroup } from "@app/event-selection/EventGroup";
import { EventItem } from "@app/event-selection/EventItem";
import { StateWrapper } from "@app/store/StateWrapper";
import "@testing-library/jest-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { mockStore } from "../__mocks__/stateContext";

it("Unchecking a group causes all events to be unchecked", async () => {
  const result = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventGroup category="Lindy Hop" />
    </StateWrapper>
  );

  const el = await result.findByTestId("group-checkbox");

  await act(() => {
    fireEvent.click(el);
  });

  const allEventCheckboxes = (await result.findAllByTestId(
    "event-checkbox"
  )) as HTMLInputElement[];
  expect(allEventCheckboxes.every((x) => x.checked)).toBeFalsy();
});

it("Unchecking an event causes it to be unchecked", async () => {
  const result = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventItem event={Object.values(mockStore.events)[0]} />
    </StateWrapper>
  );

  const el = await result.findByTestId("event-item");

  await act(() => {
    fireEvent.click(el);
  });

  const eventCheckbox = (await result.findByTestId(
    "event-checkbox"
  )) as HTMLInputElement;
  expect(eventCheckbox.checked).toBeFalsy();
});

it("Click info button opens modal", async () => {
  const result = render(
    <StateWrapper categories={mockStore.categories} events={mockStore.events}>
      <EventItem event={Object.values(mockStore.events)[0]} />
    </StateWrapper>
  );

  const infoButton = await result.findByTestId("info-button");

  await act(() => {
    infoButton.click();
  });

  const modalContent = result.findByTestId("event-series-modal-content");

  expect(modalContent).toBeTruthy();
});
