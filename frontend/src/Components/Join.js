import FileViewer from "./FileViewer"
import Header from "./Header"

const Join = () => {
    return (<>
    <Header />
    <div className="flex justify-center pt-20 pb-20 lg:pt-0">
        <div className="flex flex-col items-center">
            <h1 className="font-header text-7xl pb-10">Join KWUR</h1>
            <div className="font-mono text-lg w-10/12">
            Want to become a DJ? Contact <a href="mailto:training@kwur.com">training@kwur.com</a>!
            Training begins around the start of the fall and spring semesters. It takes one full semester to train. Prospective DJs are required to fill out the below application (in PDF format!) before going to any sessions. There are 3 meetings, 1 test, practical training, and sit-ins. They are short, infrequent sessions spread throughout the semester. The dates of the trainings are determined by the training directors. Get emailing!
            </div>
        </div>
    </div>
    <FileViewer />
    </>)
}

export default Join