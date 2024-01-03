import { getCachedNetworkConfig } from 'model/chain';
import { getUnlockedWallet } from 'model/wallet';
import { AElfWeb3SDK } from 'network/dto/wallet';
import { getContractBasic } from 'packages/contracts/utils';
import { ContractBasic } from 'packages/contracts/utils/ContractBasic';

export class CAContractFactory {
  // if true, Contract instance can only be used on View method
  static async create(viewContract: boolean): Promise<ContractBasic> {
    let privateKey = '';
    if (viewContract) {
      privateKey = '6167c717e781099c8ee77cbf0c3f6e7c8315fc581eb7daa891c872c026359c84';
    } else {
      const { privateKey: pk } = (await getUnlockedWallet()) || {};
      privateKey = pk;
    }
    const { caContractAddress, peerUrl } = (await getCachedNetworkConfig()) || {};
    return await getContractBasic({
      contractAddress: caContractAddress,
      rpcUrl: peerUrl,
      account: AElfWeb3SDK.getWalletByPrivateKey(privateKey),
    });
  }
}

export class ViewMethodContractManager {

}

export class SendMethodContractManager {

}


interface ContractManager {
  setContractBasic(ContractBasic: ContractBasic) {
    
  }
}
async function test(){
  const a = await CAContractFactory.create(true);
}
// const caContractInstance = new CAContractFactory();
// export default caContractInstance;
