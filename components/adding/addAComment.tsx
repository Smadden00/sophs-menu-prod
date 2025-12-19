import styles from './addAComment.module.css'
import SendComment from '../../components/requests/sendComment'
import { useSession } from "next-auth/react"

export default function AddAComment({usersComment, setUsersComment, id, recipeData, setRecipeData}) {

    const { data: session } = useSession()

    if (session){
        return (
            <div className={styles.addCommentContainer}> 
                <input
                    type="text"
                    placeholder="Add a comment"
                    className={styles.addComment}
                    id="Comment input"
                    value={usersComment}
                    onChange={(e) => setUsersComment(e.target.value)}
                />
                <button 
                    onClick={() => SendComment(id, usersComment, setUsersComment, recipeData, setRecipeData)}
                >
                    Add Comment
                </button>
            </div>
        )
    } else {
        return null
    }
}