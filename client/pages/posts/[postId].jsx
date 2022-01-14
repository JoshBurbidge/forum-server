import { useRouter } from "next/router";

export default function Post(props) {

  const router = useRouter();
  const { postId } = router.query;
  return (
    <p>Post: {postId}</p>
  )
}