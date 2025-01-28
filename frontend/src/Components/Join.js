import FileViewer from "./FileViewer"
import Header from "./Header"

const Join = () => {
    return (<>
    <Header />
    <div className="flex justify-center pt-20 pb-20 lg:pt-0">
        <div className="flex flex-col items-center">
            <h1 className="font-header text-7xl pb-10">Join KWUR</h1>
            <div className="font-mono text-lg w-10/12">
            Want to become a DJ? Contact <a className="text-blue-500 hover:underline " href="mailto:training@kwur.com">training@kwur.com</a>! Training begins around the start of the fall and spring semesters. Prospective DJs are required to fill out the below application (in PDF format!) before going to any sessions. There are 2 meetings, 1 test, CD reviews, and sit-ins. There are short, infrequent sessions throughout the semester. The dates of the trainings are determined by the training directors. All training meetings will be held in the KWUR studio on the third floor of the DUC in the Harvey Media Center unless otherwise specified. For Spring 25, the training schedule is: <br />
            <ul className="pt-10 pl-10 list-disc">
                <li>
                    Training meeting 1: 1/30 at 5 pm OR 2/2 at 2 pm
                </li>
                <li>
                    Training meeting 2: 2/6 at 6 pm OR 2/9 at 2 pm
                </li>
                <li>
                    Completion of CD reviews and sit-ins by spring break
                </li>
                <li>
                    Bible Test 3/6 at 6 pm
                </li>
            </ul>
            <br />
            Get emailing!
            </div>
        </div>
    </div>
    <FileViewer className="pb-10" />
    </>)
}

export default Join