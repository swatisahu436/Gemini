import Sidebar from "./Sidebar";
import Chatroom from "./Chatroom";
import {useState} from "react";
const Dashboard = () => {
const [currentChatId, setCurrentChatId] = useState(null);

    return (

        <div className="grid grid-cols-5 h-screen text-center ">
            <div className="col-span-1  sticky top-0 h-screen overflow-y-auto">
                <Sidebar onSelectChat={(id)=> setCurrentChatId(id)} />            </div>
            <div className="col-span-4 flex flex-col overflow-y-auto">
                <div>
                    <Chatroom chatId={currentChatId} />
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};
export default Dashboard;