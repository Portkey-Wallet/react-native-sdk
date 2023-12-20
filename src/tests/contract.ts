import { getCachedNetworkConfig } from 'model/chain';
import { callGetDefaultTransferLimitMethod, callGetHolderInfoMethod } from 'model/contract/handler';
import { getUnlockedWallet } from 'model/wallet';
import { TestCase } from 'service/JsModules/types';

export const ContractMethodTestCases: Array<TestCase> = [
  {
    describe: 'call methods without exceptions',
    run: async testContext => {
      const {
        caInfo: { caHash },
        originChainId,
      } = await getUnlockedWallet({ getMultiCaAddresses: true });
      const {
        caContractAddress,
        peerUrl,
        defaultToken: { symbol },
      } = await getCachedNetworkConfig(originChainId);
      const contractResults = [];
      contractResults.push(await callGetDefaultTransferLimitMethod(originChainId, symbol));
      contractResults.push(await callGetHolderInfoMethod(caHash, caContractAddress, peerUrl));
      contractResults.forEach(it => {
        testContext.assert(!it.error, 'it should not contain error');
        testContext.log(it, 'contract result');
      });
    },
    useDetailsReport: true,
  },
];
