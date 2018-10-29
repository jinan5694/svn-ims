import bound from '@/router/modules/bound'
import masterData from '@/router/modules/masterData'
import system from '@/router/modules/system'
import part from '@/router/modules/part'

const routes = [
  ...bound,
  ...masterData,
  ...system,
  ...part
]

export default routes
