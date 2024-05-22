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
        webmaster: "Nerd in Charge (Webmaster)"
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
        <table>
            <thead className="font-subtitle text-3xl text-red-500">
                <tr className="bg-gray-200">
                    <th className="px-5">Role</th>
                    <th className="px-5">Name</th>
                    <th className="px-5">Email</th>
                </tr>
            </thead>
            <tbody className="font-mono mx-[40em]">
                {exec && exec.map(person => {
                    return <tr className="odd:bg-white">
                        <td className="p-5">
                            {dbNameToDisplayName[person.role]}
                        </td>
                        <td className="p-5">
                            {person.firstName + " " + person.lastName}
                        </td>
                        <td className="p-5">
                            {person.email}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    </>)
}
export default ExecBoard