import { render } from "react-dom"
import { MainMenu, TrackContainer } from "./components"
import AudioProvider from "./audio_core/AudioContext"
import { store } from "./audio_core/Store"
import { Provider } from "react-redux"
import "./styles/baseline.css"

render(
    <Provider store={store}>
    <AudioProvider>
        <MainMenu />
        <TrackContainer />
    </AudioProvider>
    </Provider>,
    document.getElementById("root")
)