import { render } from "react-dom"
import { MainMenu, TrackContainer } from "./components"
import TrackProvider from "./audio_core/idb_store"
import { store } from "./audio_core/redux_store"
import { Provider } from "react-redux"
import "./styles/baseline.css"

render(
    <Provider store={store}>
    <TrackProvider>
        <MainMenu />
        <TrackContainer />
    </TrackProvider>
    </Provider>,
    document.getElementById("root")
)