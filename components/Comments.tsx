import { cn } from "@/lib/utils"
import { useIsThreadActive } from "@liveblocks/react-lexical"
import { CommentOverrides, Composer, ComposerOverrides, LocalizationOverrides, Thread, ThreadOverrides } from "@liveblocks/react-ui"
import { useThreads } from "@liveblocks/react/suspense"

const ThreadWrapper = ({ thread }: ThreadWrapperProps ) => {
  const isActive = useIsThreadActive(thread.id)

  const overrides: Partial<ThreadOverrides & LocalizationOverrides & CommentOverrides & ComposerOverrides> = {
    THREAD_RESOLVE: "Resolver",
    THREAD_UNRESOLVE: "Desfazer resolução",
    THREAD_NEW_INDICATOR: "Novo",
    THREAD_NEW_INDICATOR_DESCRIPTION: "Novo comentário",
    THREAD_COMPOSER_PLACEHOLDER: "Escreva um comentário...",
    THREAD_COMPOSER_SEND: "Enviar",
    COMMENT_EDITED: "Editado",
    COMMENT_DELETED: "Comentário deletado",
    COMMENT_MORE: "Mais",
    COMMENT_EDIT: "Editar",
    COMMENT_EDIT_COMPOSER_PLACEHOLDER: "Edite seu comentário",
    COMMENT_EDIT_COMPOSER_CANCEL: "Cancelar",
    COMMENT_EDIT_COMPOSER_SAVE: "Salvar",
    COMMENT_DELETE: "Deletar",
    COMMENT_ADD_REACTION: "Adicionar reação",
    COMMENT_REACTION_LIST: (list, emoji, count) => `${list} e mais ${count - 1}`,
    COMMENT_REACTION_DESCRIPTION: (emoji, count) => `${count} reações com ${emoji}`,
    locale: "pt-BR",
    dir: "ltr"
  };

  return (
    <Thread 
      thread={thread} 
      data-state={isActive ? 'active' : null}
      className={cn('comment-thread border',
        isActive && '!border-blue-500 shadow-md',
        thread.resolved && 'opacity-40'
      )}
      overrides={overrides}
    />
  )
}

const Comments = () => {
  const { threads } = useThreads()

  return (
    <div className="comments-container">
      <Composer 
        className="comment-composer"
        overrides={{ COMPOSER_PLACEHOLDER: "Digite seu comentário aqui..." }}
      />

      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  )
}

export default Comments