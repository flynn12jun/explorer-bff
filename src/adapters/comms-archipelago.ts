import { AboutResponse_CommsInfo } from '../protocol/bff/http-endpoints'
import { AppComponents } from '../types'
import { ICommsModeComponent } from './comms-fixed-adapter'

export async function commsArchipelago(
  components: Pick<AppComponents, 'serviceDiscovery'>
): Promise<ICommsModeComponent> {
  const { serviceDiscovery } = components

  return {
    async getStatus() {
      const comms: AboutResponse_CommsInfo = {
        healthy: false,
        protocol: 'v3'
      }
      const clusterStatus = await serviceDiscovery.getClusterStatus()
      if (clusterStatus.archipelago) {
        comms.healthy = true
        comms.commitHash = clusterStatus.archipelago.commitHash
      }
      return comms
    }
  }
}
