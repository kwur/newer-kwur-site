import FileViewer from "./FileViewer"
import Header from "./Header"

const Support = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0">
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-header text-7xl pb-10">Support KWUR!</h1>
            <div className="font-mono text-center text-lg w-10/12">
            Want to help keep KWUR on the air? Make a donation! We'll thank you from the bottom of our hearts.
            <table className="table-fixed w-fit mx-auto text-center">
                <thead>
                    <tr>
                        <th>
                        Mail a check to:
                        </th>
                        <th>
                        Call the station:
                        </th>
                        <th>
                        Donate online through the WUSTL website:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        KWUR 90.3 FM
                        Campus Box 1205
                        One Brookings Dr.
                        St. Louis, MO 63130
                        </td>
                        <td>
                        (314) 935 - 5952
                        </td>
                        <td>
                        <a className="hover:underline hover:text-red-700 text-red-500 "href="http://gifts.wustl.edu/giftform.aspx">Donation Website</a>
                        <div className="text-sm">
                            You do not need to choose a drop down option. Type KWUR 90.3 FM in the "I prefer to enter my own designation"
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="pt-20 font-mono text-center text-red-500 hover:underline hover:text-red-700 text-3xl w-10/12">
                or <a href="https://kwur.bandcamp.com/">check out KWUR bandcamp!!!</a>
            </div>
        </div>
    </div>
    <FileViewer />
    </div>)
}

export default Support