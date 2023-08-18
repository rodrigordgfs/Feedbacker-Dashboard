import { readonly } from 'vue'
import UserModulo from './user'
import GlobalModule from '.global'

export default readonly({
  User: UserModulo,
  Global: GlobalModule
})
