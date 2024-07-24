import Image from "next/image"
import { useState } from "react"
import UserTypeSelector from "./UserTypeSelector"
import { Button } from "./ui/button"
import { removeCollaborator, updateDocumentAccess } from "@/lib/actions/room.actions"

const Collaborator = ({
  user, 
  email, 
  roomId, 
  creatorId, 
  collaborator 
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer')
  const [ loading, setLoading ] = useState(false)

  const shareDocumentHandler= async (type: string) => {
    setLoading(true)

    await updateDocumentAccess({
      email,
      roomId,
      updatedBy: user,
      userType: type as UserType,
    })

    setLoading(false)
  }
  const removeCollaboratorHandler= async (email: string) => {
    setLoading(true)

    await removeCollaborator({ email,roomId })

    setLoading(false)
  }

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />

        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && 'atualizando...'}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Admin</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector 
            userType={userType as UserType}
            setUserType={setUserType || 'viewer'}
            onClickHandler={shareDocumentHandler}
          />

          <Button 
            type="button" 
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="bg-transparent p-0 text-rose-500 font-semibold hover:bg-transparent hover:text-rose-500/60"
          >
            Remover
          </Button>
        </div>
      )}
    </li>
  )
}

export default Collaborator