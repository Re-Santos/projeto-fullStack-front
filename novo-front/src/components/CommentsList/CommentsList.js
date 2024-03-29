import { Posts, EnviadoPor, Texto, DivEngajamento, DivBottom, Carregando } from './styled'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { createCommentVote, changeCommentVote, deleteCommentVote } from '../../services/votes'
import { arrowUpColorComment, arrowDownColorComment } from '../../helpers/arrowHelper'
import mockComments from '../../data/commentsMock.json';

const CommentsList = (props) => {
     // Vai usar dados reais se disponíveis, caso contrário, usará dados de exemplo (Renata)
    const commentsToMap = props.listaComentario || mockComments;

    const updateVote = (voto, id, uservote) => {
        if(uservote === null) {
            createCommentVote(id, voto)
            props.sendVote()
        } 

        if(uservote === 1 && voto === 1) {
            deleteCommentVote(id)
            props.sendVote()
        }

        if(uservote === -1 && voto === -1) {
            deleteCommentVote(id)
            props.sendVote()
        }

        if(uservote === 1 && voto === -1) {
            changeCommentVote(id, -1)
            props.sendVote()
        }

        if(uservote === -1 && voto === 1) {
            changeCommentVote(id, 1)
            props.sendVote()
        }
        console.log(voto, id, uservote)
    }

    // const commentCards = props.listaComentario.map((comment) => {
    // Utilizei commentsToMap no código abaixo, enquanto não ajustei erro de posts na api(Renata)
    const commentCards = commentsToMap.map((comment) => {
        return(
            <Posts key={comment.id}>
                <EnviadoPor>Enviado por: {comment.username}</EnviadoPor>
                <Texto>{comment.body}</Texto>
                <DivBottom>
                    <DivEngajamento>
                    <ArrowUpwardIcon 
                        style={{ color: arrowUpColorComment(comment.userVote)}}
                        fontSize={'small'}
                        onClick={() => updateVote(1, comment.id, comment.userVote)}
                    />
                    <p>{comment.voteSum === null ? '0' : comment.voteSum}</p> 
                    <ArrowDownwardIcon 
                        style={{ color: arrowDownColorComment(comment.userVote)}}
                        fontSize={'small'}
                        onClick={() => updateVote(-1, comment.id, comment.userVote)}
                    />
                    </DivEngajamento>
                </DivBottom>
            </Posts>
        )
    })

    return(
        <>
            {
                commentCards.length > 0 ? 
                    commentCards : 
                    <Carregando>
                        <p>Que pena, ainda não tem comentários aqui</p>
                    </Carregando>
            }
        </>
    )
}

export default CommentsList