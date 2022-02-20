import { useContext } from "react"
import { UserContext } from "../components/UserContext"

export async function getServerSideProps() {
  return {
    props: {
      protected: true
    }
  }
}

export default function Dashboard(props) {
  const user = useContext(UserContext);

  return (<>
    <p>Dashboard</p>
    <p>user: {user.username}</p>

  </>)
}