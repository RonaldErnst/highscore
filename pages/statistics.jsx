import Navigation from "../components/navigation";
import { withPrivate } from "../components/Routing";

function Statistics() {

    return (

        <Navigation active="stats"></Navigation>
    );
}

export default withPrivate(Statistics);