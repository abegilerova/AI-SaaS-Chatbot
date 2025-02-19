"use client";
import React ,{ useState } from "react";


const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (<div><h5>Sidebar</h5>
        <button onClick={() => setCollapsed(!collapsed)}>{collapsed?  "Uncollapse ": "Collapse" }</button>
        <h5>MENU</h5>
        <ul>
            <li><button>Dashboard</button></li>
            <li><button>Conversations</button></li>
            <li><button>Integrations</button></li>
            <li><button>Appointements</button></li>
            <li><button>Email Marketing</button></li>
            <li><button>Settings</button></li>
        </ul>
    </div>)
};

export default Sidebar;