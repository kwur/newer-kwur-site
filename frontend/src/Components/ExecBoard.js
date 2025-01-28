import { useEffect, useState } from "react"
import { getExec } from "../utils/userUtils"
import Loading from "./Loading"

const ExecBoard = () => {
    const [exec, setExec] = useState()
    const [loading, setLoading] = useState(true)
    const dbNameToDisplayName = {
        GM: "General Manager",
        "personnel": "Personnel",
        "treasurer": "Treasurer",
        "training": "Training",
        "promotions": "Promotions",
        communityrelations: "Community Relations",
        artdirector: "Art Director",
        events: "Events",
        productioncoordinator: "Production Coordinator",
        musicdirectorintraining: "Music Director in Training",
        stationmanager: "Station Manager", 
        webmaster: "Webmaster"
    }
    const dbNameToEmail = {
        GM: "gm@kwur.com",
        "personnel": "personnel@kwur.com",
        "treasurer": "treasurer@kwur.com",
        "training": "training@kwur.com",
        "promotions": "promotions@kwur.com",
        communityrelations: "communityrelations@kwur.com",
        artdirector: "",
        events: "events@kwur.com",
        productioncoordinator: "prodcoord@kwur.com",
        musicdirectorintraining: "",
        stationmanager: "station@kwur.com", 
        webmaster: "webmaster@kwur.com"
    }
    useEffect(() => {
        getExec().then(members => {
            setExec(members)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [])
    return (<>
    {
        loading ? 
        <Loading />
        :
        <>
            <div className="grid grid-cols-3 w-full lg:w-1/2 text-center">
                <div className="text-center font-subtitle text-2xl font-bold bg-gray-200 text-red-500">
                    Role
                </div>
                <div className="text-center font-subtitle text-2xl font-bold bg-gray-200 text-red-500">
                    Name
                </div>
                <div className="text-center font-subtitle text-2xl font-bold bg-gray-200 text-red-500">
                    Email
                </div>
            </div>

            <div className="w-screen grid grid-rows-2 px-2 w-full lg:w-1/2 text-md lg:text-lg">
                    
                {exec && exec.map(person => {
                        return <div className="grid grid-cols-3 odd:bg-white even:bg-gray-300">
                            <div className="font-mono px-1 w-full break-words text-wrap text-center">
                                {dbNameToDisplayName[person.role]}
                            </div>
                            <div className="font-mono px-1 w-full break-words text-wrap text-center">
                                {person.firstName + " " + person.lastName}
                            </div>
                            <div className="font-mono px-1 w-full break-words text-wrap  text-center">
                                {dbNameToEmail[person.role]}
                            </div>
                        </div>
                    })
                }
        </div>
        </>
        // <table >
        //     <thead className="w-screen px-[30em] font-subtitle text-3xl text-red-500">
        //         <tr className=" mx-[30em]  bg-gray-200">
        //             <th className="px-5">Role</th>
        //             <th className="px-5">Name</th>
        //             <th className="px-5">Email</th>
        //         </tr>
        //     </thead>
        //     <tbody className="font-mono mx-[40em]">
                
        //             </tr>
        //         })}
        //     </tbody>
        // </table>
    }
    </>)
}
export default ExecBoard