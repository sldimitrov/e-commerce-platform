import {Button} from "@mui/material";
import {Link} from "react-router";

export default function Header() {
    return (
        <>
            <span>
                BurgasFrame Shop
            </span>

            <li>
                <Button>
                    <Link to={'/'}>
                        Home
                    </Link>
                </Button>
            </li>
        </>
    )
}