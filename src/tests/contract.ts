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
  },
  {
    describe: 'sort contracts well',
    run: textContext => {
      const sortByFirstLetter = (list: Array<{ name: string }>) => {
        return list.sort((a, b) => {
          const aName = a.name[0].toLowerCase();
          const bName = b.name[0].toLowerCase();
          return aName.localeCompare(bName);
        });
      };
      const sortList: Array<{ name: string }> = [
        {
          name: 'Zwb31s1o2',
        },
        {
          name: 'gooleliu1',
        },
        {
          name: 'meil',
        },
      ];
      const sortedList = sortByFirstLetter(sortList);
      textContext.assert(sortedList[0].name === 'gooleliu1', 'first item should be gooleliu1');
      textContext.log(sortedList, 'sortedList');
    },
    useDetailsReport: true,
  },
];
