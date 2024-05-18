
const ChangeUserPopup = (props) => {
    const [newRole, setNewRole] = useState()

    return (<div className={`${props.show === false ? "hidden" : ""}`}>
        Changing {props.user.firstName}'s profile: 
            
    </div>
    )
}
export default ChangeUserPopup