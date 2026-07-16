import {
    AppBar,
    TextField,
    Toolbar,
    InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ForestIcon from "@mui/icons-material/Forest";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Person2Icon from "@mui/icons-material/Person2";

import { useState } from "react";

export default function Header() {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value);
    };

    return (
        <AppBar>
            <Toolbar>
                <ForestIcon />

                navigation

                <TextField
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        marginLeft: 2,
                        width: 300
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

                <FavoriteIcon />
                <ShoppingBagIcon />
                <Person2Icon />
            </Toolbar>
        </AppBar>
    );
}