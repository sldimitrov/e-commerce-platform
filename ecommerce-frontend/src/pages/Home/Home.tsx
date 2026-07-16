import {Alert, Button} from "@mui/material";
import {useState} from "react";

const Home = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <h1>Home</h1>
            <Button variant="contained" onClick={() => {
                setCounter((prev) => prev +1)
            }}>
                HELLO WORLD
            </Button>
            <Alert variant="standard" color="info">
              This is how many times you've clicked - {counter}!
            </Alert>
        </>
    )
}

export default Home;
