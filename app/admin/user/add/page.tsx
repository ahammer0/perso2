import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

export default function AddPage(){
  async function handleAddUser(formData:FormData){
    "use server"
    const rawFormData = {
      name:formData.get('name'),
      email:formData.get('email'),
      password:formData.get('password'),
      role:formData.get('role')
    }
    console.log('rawdata',rawFormData)
    
    const prisma = new PrismaClient()
    let redirectPath:String | null = null
    try{
      const user = {
        name:rawFormData.name.toString(),
        email:rawFormData.email.toString(),
        password : await bcrypt.hash(rawFormData.password.toString(),10),
        role:rawFormData.role
      }
      const newUser = await prisma.user.create({data:user})

      console.log('newuser',newUser)

      redirectPath = `/admin/user/${newUser.id}`

    }catch(e){
      console.error(e)
      redirectPath = "/admin/user/add"
    }finally{
      prisma.$disconnect
      revalidatePath('/admin/user')
      redirect(redirectPath)
    }


  }
  return (<>
    <form action={handleAddUser} className="flex flex-col text-black">
      <div className="flex flex-col">
        <label htmlFor="name">Nom de l' utilisateur</label>
        <input type="text" name="name"/>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input type="email" name="email"/>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password"/>
      </div>

      <select name="role">
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <input type="submit" value="Ajouter l'utilisateur" />

    </form>
  </>);
}
