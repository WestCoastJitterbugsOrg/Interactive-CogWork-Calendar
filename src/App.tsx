import Error from "./Error";
// import { Footer } from "./Footer";
import { Header } from "./Header";
import initContext from "./services/cogwork";
import { EventSeriesModal } from "./shared";
import StateWrapper from "./store/StateWrapper";
import EventSelection from "./event-selection/EventSelection";
import Calendar from "./calendar";

export default function App() {
  try {
    const { categories, events } = initContext();
    return (
      <>
        <Header />
        <StateWrapper categories={categories} events={events}>
          <div className="flex flex-row flex-wrap items-stretch bg-white min-h-[calc(100vh-32px)]">
            <div className="flex flex-col flex-grow w-96 max-h-[calc(100vh-32px)]">
              <EventSelection />
            </div>
            <div
              className="flex-grow flex-shrink-0 min-h-[calc(100vh-32px)] min-w-[calc(100%-384px)]"
              data-testid="calendar-wrapper"
            >
              <Calendar />
            </div>
            <EventSeriesModal />
          </div>
        </StateWrapper>
        {/* <Footer /> */}
      </>
    );
  } catch (err) {
    return <Error message={err}></Error>;
  }
}
